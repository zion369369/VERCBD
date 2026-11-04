import indexed from "./data/site-knowledge.json";
import { branchDirectory, ensureBranchDirectory, branchSearchScore, normalizePlace, phoneHref } from "./branchDirectory";
import { ensureCareers, isPublishedVacancy, VERC_BDJOBS_URL } from "./careers";
import { ensurePhotoLibrary } from "./photoLibrary";
import type { BranchOffice } from "@/context/ContentContext";

export interface PublicDocument { id: string; title: string; url: string; text: string }
export interface AnswerSource { title: string; url: string }
export interface RuleAnswer { answer: string; sources: AnswerSource[]; documents: PublicDocument[]; kind: "rule" | "knowledge" | "unknown"; suggestions: string[] }
export interface ChatTurn { role: "user" | "assistant"; content: string }
export const cleanText = (value: unknown): string => typeof value === "string" ? value.replace(/<script[\s\S]*?<\/script>/gi," ").replace(/<style[\s\S]*?<\/style>/gi," ").replace(/<[^>]*>/g," ").replace(/&nbsp;|&#160;/g," ").replace(/&amp;/g,"&").replace(/\s+/g," ").trim() : "";
const textValues = (value: any): string[] => typeof value === "string" ? [cleanText(value)] : Array.isArray(value) ? value.flatMap(textValues) : value && typeof value === "object" ? Object.entries(value).filter(([key]) => !/^(id|imageUrl|color|badgeColor|order|logoUrl|sourcePhone|eligibility|eligibilityCriteria|requiredDocuments|requirements|status)$/.test(key)).flatMap(([key,item])=>textValues(item).map(text=>`${key.replace(/([A-Z])/g," $1").replace(/^./,letter=>letter.toUpperCase())}: ${text}`)) : [];
const selectedFields = (record: any, fields: string[]) => Object.fromEntries(fields.filter(key => record?.[key] !== undefined).map(key=>[key,record[key]]));
export function publicContent(saved: Record<string, any> | null) {
  const content = { ...indexed.defaults, ...(saved || {}) } as Record<string, any>;
  content.branches = Array.isArray(saved?.branches) ? ensureBranchDirectory(saved!).branches : branchDirectory;
  return ensureCareers(ensurePhotoLibrary(content));
}

export function buildPublicDocuments(content: Record<string, any>): PublicDocument[] {
  const docs: PublicDocument[] = indexed.pages.map(page => ({ ...page }));
  const add = (id: string, title: string, url: string, value: unknown) => { const text = textValues(value).filter(Boolean).join("\n"); if (text) docs.push({ id,title,url,text }); };
  add("contact", "Head Office contact", "/contact", selectedFields(content.siteSettings,["address","phone","hotline","email","supportEmail"]));
  add("purpose", "VERC vision, mission and values", "/about", selectedFields(content.aboutContent,["vision","mission","visionText","missionText","coreValues"]));
  const members = content.aboutContent?.boardMembers || [];
  add("board", "Board of Directors", "/about/board", members.length ? members.map((member: any)=>selectedFields(member,["name","role","bio"])) : "Board member details have not yet been published. Please contact VERC for the current approved list.");
  const collections: [string,string,string,string[]][] = [
    ["programs","Social programs","/programs",["title","category","description","features","reach"]],
    ["microfinanceProducts","Microfinance products","/microfinance/products",["title","category","description","features","loanLimit","tenure"]],
    ["teamMembers","Staff and leadership","/about/staff",["name","role","department","bio"]],
    ["partners","Partners","/partners",["name","category","description"]],
    ["legalCertifications","Legal registrations","/about/legal",["title","authority","regNo","desc","status"]],
    ["annualReports","Annual reports","/about/annual-report",["year","title","desc"]],
    ["awards","Awards","/about/awards",["year","title","organization","category","desc"]],
    ["organogramNodes","Organizational structure","/about/organogram",["title","subtitle","category","department"]],
    ["gallery","Photo gallery","/resources/gallery",["title","category","description"]],
    ["campaigns","Donation campaigns","/donate",["title","thematicArea","status","deadline","location","targetAmount","raisedAmount"]],
  ];
  for (const [key,label,url,fields] of collections) for (const [index,item] of Array.from((Array.isArray(content[key]) ? content[key] : []).entries()) as [number, any][]) {
    if (key === "programs" && item.status && item.status !== "Active") continue;
    add(`${key}:${item.id || index}`, item.title || item.name || label, key === "programs" && ["education","wash","livelihood","capacity"].includes(item.slug) ? `/programs/${item.slug}` : url, selectedFields(item,fields));
  }
  for (const item of content.news || []) if (item.status === "Published") add(`news:${item.id}`, item.title, "/", selectedFields(item,["title","summary","content","date","category"]));
  for (const item of content.stories || []) add(`story:${item.id}`, item.title, item.slug ? `/impact/${encodeURIComponent(item.slug)}` : "/impact", selectedFields(item,["title","beneficiaryName","location","story","date"]));
  for (const item of content.jobOpenings || []) if (isPublishedVacancy(item)) add(`career:${item.id}`, item.title, "/careers", selectedFields(item,["title","department","location","type","deadline","salary","experience","description","responsibilities"]));
  return docs;
}

const aliases: [RegExp,string,string][] = [
  [/\b(education|school|literacy|nfe|shikkha)\b|শিক্ষা|বিদ্যালয়|স্কুল/i,"education", "/programs/education"],
  [/\b(wash|water|sanitation|clts|hygiene|pani)\b|পানি|স্যানিটেশন|স্বাস্থ্যবিধি/i,"water sanitation clts wash", "/programs/wash"],
  [/\b(health|hospital|maternal|clinic)\b|স্বাস্থ্য|হাসপাতাল|মাতৃ/i,"health hospital", "/programs/wash"],
  [/\b(microfinance|loan|credit|rin|jagoron|agrosor|buniad|sufolon|enrich)\b|ঋণ|ক্ষুদ্রঋণ|মাইক্রোফাইন্যান্স|জাগরণ|অগ্রসর/i,"microfinance loan", "/microfinance/products"],
  [/\b(livelihood|livelihoods|agriculture|empowerment)\b|জীবিকা|কৃষি|ক্ষমতায়ন/i,"livelihood empowerment", "/programs/livelihood"],
  [/\b(capacity|training|workshop)\b|প্রশিক্ষণ|দক্ষতা/i,"capacity training", "/programs/capacity"],
  [/\b(executive|staff|leadership|team)\b|নির্বাহী|কর্মী|সিনিয়র/i,"staff leadership", "/about/staff"],
  [/\b(board|directors|governance)\b|পরিচালনা|পরিচালক/i,"board directors", "/about/board"],
  [/\b(partner|partners|collaboration)\b|সহযোগী|অংশীদার/i,"partners", "/partners"],
  [/\b(annual|report|reports)\b|বার্ষিক|প্রতিবেদন/i,"annual reports", "/about/annual-report"],
  [/\b(photo|photos|gallery|pictures)\b|ছবি|গ্যালারি/i,"photo gallery", "/resources/gallery"],
  [/\b(donate|donation|donations|contribute)\b|অনুদান|দান/i,"donation campaigns", "/donate"],
  [/\b(history|founded|established|journey|1977|old|mission|vision|values)\b|ইতিহাস|প্রতিষ্ঠা|মিশন|ভিশন|মূল্যবোধ/i,"history mission vision values", "/about"],
  [/\b(programs|program|thematic|activities|work)\b|কার্যক্রম|কর্মসূচি/i,"social programs", "/programs"],
];
const stop = new Set("a an the is are am was were be been how what where when why who do does did can could would should will i me my you your they their it its this that tell about please verc village resource center centre of in to on at for and or with also more detail details give show find get branch branches office offices contact phone number address email location code near nearest er ki koto ache kothay bolo janan amake ar কোথায় কোথায় কী কি কত আমার আপনার সম্পর্কে বলুন জানতে চাই এবং ফোন ঠিকানা শাখা কার্যালয় নাম".split(" "));
const terms = (value: string) => normalizePlace(value).split(" ").filter(word => word.length > 1 && !stop.has(word));
const bn = (en: string, bengali: string, language: string) => language === "bn" ? bengali : en;

export function answerFromWebsite(message: string, history: ChatTurn[], language: "en" | "bn", content: Record<string, any>): RuleAnswer {
  const documents = buildPublicDocuments(content);
  const suggestions = language === "bn" ? ["ভার্কের কার্যক্রম", "নিকটস্থ অফিস", "চাকরির সুযোগ", "যোগাযোগের ঠিকানা"] : ["VERC programs", "Find an office", "Current vacancies", "Head Office contact"];
  const reply = (answer: string, kind: RuleAnswer["kind"] = "rule", sources: AnswerSource[] = [], docs: PublicDocument[] = []): RuleAnswer => ({ answer,kind,sources,documents:docs,suggestions });
  const query = message.toLowerCase().trim();
  const settings = content.siteSettings || {};
  const contactText = [settings.address, settings.phone, settings.email].filter(Boolean).join("\n");
  if (/^(hi|hello|hey|assalamu alaikum|salam|হাই|হ্যালো|আসসালামু আলাইকুম)[!.\s]*$/i.test(query)) return reply(bn("Hello! I can help you explore VERC’s programs, find an office, check recruitment information, or locate reports. What would you like to know?", "হ্যালো! ভার্কের কার্যক্রম, অফিসের ঠিকানা, চাকরির বিজ্ঞপ্তি এবং প্রতিবেদন খুঁজে পেতে সাহায্য করতে পারি। কী জানতে চান?", language));
  if (/^(thanks|thank you|thx|ধন্যবাদ|অনেক ধন্যবাদ)[!.\s]*$/i.test(query)) return reply(bn("You’re welcome. Let me know what else you’d like to explore about VERC.", "স্বাগতম। ভার্ক সম্পর্কে আর কী জানতে চান, বলুন।", language));
  if (/who (are you|made you|created you)|are you (ai|human)|your name|powered by|আপনি কে|তুমি কে|আপনার নাম|কে তৈরি/i.test(query)) return reply(bn("I’m the VERC website assistant, powered by Hellotek. I use VERC’s published website information to help with programs, offices, recruitment and resources, with AI-assisted wording when available.", "আমি ভার্কের ওয়েবসাইট সহকারী, Powered by Hellotek। প্রকাশিত তথ্যের ভিত্তিতে কার্যক্রম, অফিস, নিয়োগ এবং অন্যান্য তথ্য খুঁজে পেতে সাহায্য করি।", language));
  if (/^(?:tell me )?(?:who is verc|what is verc|about verc|what does verc do|ভার্ক কী|ভার্ক কি|ভার্ক সম্পর্কে)[?!.]*$/i.test(query)) return reply(bn("VERC stands for Village Education Resource Center. It began in 1977 and works with communities in Bangladesh through education, health and WASH, livelihoods, microfinance and capacity building. Which area would you like to explore?", "VERC-এর পূর্ণরূপ Village Education Resource Center। ১৯৭৭ সালে যাত্রা শুরু করা সংস্থাটি বাংলাদেশে শিক্ষা, স্বাস্থ্য ও ওয়াশ, জীবিকা, ক্ষুদ্রঋণ এবং দক্ষতা উন্নয়নে কাজ করে। কোন বিষয়টি জানতে চান?",language),"rule",[{title:"About VERC",url:"/about"},{title:"Social programs",url:"/programs"}]);
  if (/api.?key|password|credential|system prompt|\.env|private (message|inquir|application)|donor.*(email|phone)|পাসওয়ার্ড|গোপন|আবেদনকারীর/i.test(query)) return reply(bn("I can help with VERC’s public website information. Private records, credentials and applicant information are not part of my knowledge base.", "ভার্কের প্রকাশিত তথ্য দিয়ে সাহায্য করতে পারি। ব্যক্তিগত নথি, পাসওয়ার্ড বা আবেদনকারীর তথ্য আমার তথ্যভান্ডারের অংশ নয়।", language));
  if (/eligib|qualif|criteria|required documents|যোগ্যতা|শর্ত|কাগজপত্র/i.test(query) && (/loan|credit|microfinance|ঋণ|ক্ষুদ্রঋণ|লোন/i.test(query) || history.slice(-3).some(turn=>/microfinance|loan|ঋণ/i.test(turn.content)))) return reply(bn("Microfinance eligibility and application requirements are temporarily not published. Please contact your local VERC office for approved guidance.", "ক্ষুদ্রঋণের যোগ্যতা ও আবেদনের শর্ত আপাতত প্রকাশ করা হচ্ছে না। অনুমোদিত তথ্যের জন্য নিকটস্থ ভার্ক অফিসে যোগাযোগ করুন।", language),"rule",[{title:"Find a VERC office",url:"/contact#find-office"}]);
  if (/\b(job|jobs|career|careers|vacancy|vacancies|recruit|recruitment|chakri|chakuri)\b|চাকরি|চাকরী|নিয়োগ|নিয়োগ/i.test(query)) {
    const vacancies = (content.jobOpenings || []).filter((job: any)=>isPublishedVacancy(job));
    return reply(bn("For VERC recruitment, use the company’s BDJobs page. It has the latest vacancy notices, deadlines and application instructions." + (vacancies.length ? `\n\nThe website currently lists: ${vacancies.map((job: any)=>`${job.title} (deadline ${job.deadline})`).join("; ")}.` : "\n\nThere are no active linked vacancy notices published on this website right now. BDJobs remains the place to check for updates."), "ভার্কের নিয়োগ বিজ্ঞপ্তি, সময়সীমা এবং আবেদনপদ্ধতি জানতে BDJobs-এর কোম্পানি পেজ দেখুন। সর্বশেষ তথ্য সেখানেই পাওয়া যাবে।",language),"rule",[{title:"VERC on BDJobs",url:VERC_BDJOBS_URL},{title:"Careers",url:"/careers"}]);
  }
  const previousUser = [...history].reverse().find(turn=>turn.role === "user")?.content || "";
  const branchIntent = /branch|office|phone|address|contact|email|number|headquarters|savar|nearest|distance|directions|শাখা|অফিস|ফোন|ঠিকানা|যোগাযোগ|ইমেইল/i.test(query);
  if (branchIntent) {
    const branches: BranchOffice[] = content.branches || [];
    if (/how many|number of|count|কত|সংখ্যা/i.test(query) && /branch|office|district|শাখা|অফিস|জেলা/i.test(query)) return reply(bn(`The current directory has ${branches.filter(branch=>branch.branchType!=="Head Office").length} branch offices and ${branches.filter(branch=>branch.branchType==="Head Office").length} head office across ${new Set(branches.map(branch=>branch.district)).size} districts. You can search by office name, district, upazila or branch code.`, `বর্তমান তালিকায় ${branches.filter(branch=>branch.branchType!=="Head Office").length}টি শাখা অফিস এবং ${branches.filter(branch=>branch.branchType==="Head Office").length}টি প্রধান কার্যালয় রয়েছে। অফিস, জেলা, উপজেলা বা শাখা কোড দিয়ে খুঁজতে পারেন।`,language),"rule",[{title:"Office directory",url:"/contact#find-office"}]);
    if (/nearest|near me|distance|directions|live location|find (?:an? )?office|office finder|branch directory|all branches|কাছের|নিকট|দূরত্ব|দিকনির্দেশ/i.test(query)) return reply(bn("The office finder can compare nearby offices by road. Choose your destination and press ‘Use my location’. Your selected office stays selected; the closest checked branch is shown separately. If GPS looks wrong, choose a starting point on the map.", "অফিস ফাইন্ডারে গন্তব্য বেছে ‘Use my location’ চাপুন। সড়কপথের দূরত্ব দেখা যাবে এবং বেছে নেওয়া অফিস পরিবর্তন হবে না। জিপিএসের অবস্থান ভুল হলে মানচিত্রে শুরুর স্থান বেছে নিতে পারেন।",language),"rule",[{title:"Find offices and road routes",url:"/contact#find-office"}]);
    const lookup = terms(query).filter(word=>!["head","headquarters","tel","telephone","mobile","there","education"].includes(word)).join(" ");
    let matches = lookup ? branches.map(branch=>({branch,score:branchSearchScore(branch,lookup)})).filter(item=>item.score>0).sort((a,b)=>b.score-a.score).map(item=>item.branch) : [];
    if (!matches.length && /phone|number|address|email/i.test(query) && previousUser) { const previousLookup=terms(previousUser).join(" "); if(previousLookup) matches=branches.filter(branch=>branchSearchScore(branch,previousLookup)>0); }
    const head = /head office|headquarters|প্রধান|সদর/i.test(query) || !lookup && !matches.length;
    if(head) return reply(bn(`Here are VERC’s Head Office contact details:\n\n${contactText}\n\nYou can use the office finder to plan a visit.`, `ভার্কের প্রধান কার্যালয়ের যোগাযোগের তথ্য:\n\n${contactText}\n\nঅফিস ফাইন্ডার থেকে যাওয়ার পথ দেখতে পারেন।`,language),"rule",[{title:"Contact VERC",url:"/contact"}]);
    if(matches.length) {
      const chosen=matches.slice(0,4);
      return reply(bn(chosen.length===1 ? "Here’s the office listed in VERC’s directory:" : "I found these matching offices:",chosen.length===1 ? "ভার্কের তালিকায় এই অফিসটি পাওয়া গেছে:" : "এই অফিসগুলো পাওয়া গেছে:",language)+"\n\n"+chosen.map(branch=>`${branch.name}${branch.code?` · #${branch.code}`:""}\n${branch.address}\n${phoneHref(branch.phone)?branch.phone:branch.branchType==="Head Office"?settings.phone:""}${branch.email?`\n${branch.email}`:""}`).join("\n\n"),"rule",chosen.map(branch=>({title:branch.name,url:`/contact?branch=${encodeURIComponent(branch.id)}#find-office`})));
    }
  }
  if (/how old|what year|when.*(founded|established)|প্রতিষ্ঠা.*কবে|কত বছর/i.test(query)) { const year=Number(new Intl.DateTimeFormat("en",{timeZone:"Asia/Dhaka",year:"numeric"}).format(new Date())); return reply(bn(`VERC began in 1977 as a project of Save the Children Fund USA and became an independent local organization in 1989. That is about ${year-1977} years since its founding, as of ${year}.`,`ভার্ক ১৯৭৭ সালে Save the Children Fund USA-এর প্রকল্প হিসেবে শুরু হয় এবং ১৯৮৯ সালে স্বতন্ত্র সংস্থা হয়। ${year} সাল অনুযায়ী প্রতিষ্ঠার পর প্রায় ${year-1977} বছর হয়েছে।`,language),"rule",[{title:"About VERC",url:"/about"}]); }
  const topic = aliases.find(([pattern])=>pattern.test(query));
  if (topic?.[2] === "/programs") {
    const programs = (content.programs || []).filter((program: any)=>!program.status || program.status === "Active");
    if (programs.length) {
      const text = `The website currently lists ${programs.length} programs. Preserve this complete list and describe them as published programs.\n` + programs.map((program: any)=>`${program.title}: ${cleanText(program.description)}`).join("\n");
      const document = { id:"program-overview",title:"VERC social programs",url:"/programs",text };
      return reply(bn("VERC’s published programs include:\n\n", "ভার্কের প্রকাশিত কার্যক্রমগুলো হলো:\n\n", language)+programs.map((program:any)=>`- ${program.title}: ${cleanText(program.description)}`).join("\n"),"knowledge",[{title:"Social programs",url:"/programs"}],[document]);
    }
  }
  const contextual = terms(query).length < 4 && previousUser ? `${query} ${previousUser}` : query;
  const queryTerms = Array.from(new Set(terms(`${contextual} ${topic?.[1] || ""}`)));
  const scoped = topic ? documents.filter(doc=>doc.url===topic[2] || topic[2]==="/microfinance/products" && doc.url==="/microfinance" || topic[2].startsWith("/programs/") && doc.url===topic[2].replace("/programs/","/solutions/")) : documents;
  const frequency = new Map(queryTerms.map(term=>[term,scoped.filter(doc=>normalizePlace(`${doc.title} ${doc.text}`).includes(term)).length]));
  const ranked = scoped.map(doc=>{
    const title=normalizePlace(doc.title),body=normalizePlace(doc.text);
    const matches=queryTerms.filter(term=>title.includes(term)||body.includes(term));
    let score=matches.reduce((total,term)=>total+(title.includes(term)?6:1)*(1+Math.log((scoped.length+1)/((frequency.get(term)||0)+1))),0);
    if(topic && doc.url===topic[2]) score+=10;
    if(doc.id==="purpose" && /mission|vision|values|মিশন|ভিশন|মূল্যবোধ/i.test(query)) score+=20;
    return {doc,score,matches:matches.length};
  }).filter(item=>item.score>0 && (topic || item.matches>=Math.min(2,queryTerms.length)) && queryTerms.length>0).sort((a,b)=>b.score-a.score).slice(0,5);
  if(!ranked.length) return reply(bn("I couldn’t find a reliable answer to that in VERC’s published website information. Try asking about a program, an office, recruitment, reports or partnerships—or contact the VERC team for help.", "ভার্কের প্রকাশিত তথ্যে এই প্রশ্নের নির্ভরযোগ্য উত্তর পাইনি। কোনো কার্যক্রম, অফিস, নিয়োগ, প্রতিবেদন বা অংশীদার সম্পর্কে প্রশ্ন করতে পারেন। প্রয়োজনে ভার্কের সঙ্গে যোগাযোগ করুন।",language),"unknown",[{title:"Contact the VERC team",url:"/contact"}]);
  const selected = ranked.slice(0,4).map(({doc})=>{
    const fragments=doc.text.split(/\n|(?<=[.!?])\s+/).filter(line=>line.length>25);
    const relevant=fragments.map((text,index)=>({text,index,score:queryTerms.filter(term=>normalizePlace(text).includes(term)).length})).sort((a,b)=>b.score-a.score||a.index-b.index).slice(0,6).sort((a,b)=>a.index-b.index).map(item=>item.text).join("\n");
    return {...doc,text:(relevant||doc.text).slice(0,1700)};
  });
  const sourceOrder = [...selected].sort((a,b)=>Number(a.url.startsWith("/solutions/"))-Number(b.url.startsWith("/solutions/")));
  const sources = sourceOrder.filter((doc,index)=>!sourceOrder.slice(0,index).some(previous=>previous.url===doc.url || normalizePlace(previous.title)===normalizePlace(doc.title))).map(doc=>({title:doc.title,url:doc.url}));
  const draft=selected[0].text.split("\n").slice(0,4).join("\n\n");
  return reply(bn(`Here’s what VERC’s website says about ${selected[0].title}:\n\n${draft}`,`ভার্কের ওয়েবসাইটে ${selected[0].title} সম্পর্কে এই তথ্য রয়েছে:\n\n${draft}`,language),"knowledge",sources,selected);
}
