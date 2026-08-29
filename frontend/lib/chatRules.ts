export interface Rule {
  id: string;
  category: string;
  keywordsEn: string[];
  keywordsBn: string[];
  answerEn: string;
  answerBn: string;
  followUpEn?: string;
  followUpBn?: string;
}

export const FAQ_TOPICS = [
  { id: "journey", icon: "📜", en: "Journey & History", bn: "ইতিহাস ও যাত্রা" },
  { id: "vision", icon: "👁️", en: "Vision & Mission", bn: "ভিশন ও মিশন" },
  { id: "goals", icon: "🎯", en: "Goals & Focus", bn: "আমাদের লক্ষ্য" },
  { id: "values", icon: "🌟", en: "Values & Skills", bn: "মূল্যবোধ ও দক্ষতা" },
  { id: "thematic", icon: "📋", en: "Thematic Areas", bn: "প্রধান ক্ষেত্রসমূহ" },
  { id: "clts", icon: "💧", en: "CLTS Sanitation", bn: "স্যানিটেশন (CLTS)" },
  { id: "nfe", icon: "📚", en: "Non-Formal Education", bn: "অনানুষ্ঠানিক শিক্ষা" },
  { id: "microfinance", icon: "💼", en: "Microfinance & Impact", bn: "মাইক্রোফাইন্যান্স" },
  { id: "health", icon: "🏥", en: "Health Services", bn: "স্বাস্থ্য সেবা" },
  { id: "contact", icon: "📍", en: "Headquarters & Contact", bn: "ঠিকানা ও ফোন" }
];

export const VERC_RULES: Rule[] = [
  {
    id: "journey",
    category: "History",
    keywordsEn: ["journey", "history", "background", "origin", "start", "started", "founded", "1977", "1989", "scf", "scf-usa", "who is verc", "about verc", "about us", "establishment"],
    keywordsBn: ["ইতিহাস", "যাত্রা", "শুরু", "১৯৭৭", "১৯৮৯", "প্রতিষ্ঠা", "ভার্ক", "পরিচিতি", "ভার্ক কে", "আমাদের সম্পর্কে", "পটভূমি"],
    answerEn: `Hello! I'd be delighted to tell you about VERC's history!\n\n**VERC Journey & History**\n\n- **1977**: VERC started its journey as a project of **SCF-USA** back in 1977 with an aim to provide process consultancy to ensure effective community participation.\n- **1989**: By 1989, it became a separate local organization serving the entire NGO sector in Bangladesh.\n- **Present**: Currently, VERC focuses on implementing high-impact development projects while maintaining its pioneering status in **Non Formal Education (NFE)** and **Community Led Total Sanitation (CLTS)**.`,
    answerBn: `ভার্কের ইতিহাস সম্পর্কে আপনাকে জানাতে পেরে আনন্দিত!\n\n**ভার্কের যাত্রা ও ইতিহাস**\n\n- **১৯৭৭**: ভার্ক ১৯৭৭ সালে SCF-USA-এর একটি প্রকল্প হিসেবে যাত্রা শুরু করে যার লক্ষ্য ছিল কার্যকর জনঅংশগ্রহণ নিশ্চিত করা।\n- **১৯৮৯**: ১৯৮৯ সাল থেকে এটি একটি স্বতন্ত্র স্থানীয় সংস্থা হিসেবে বাংলাদেশের সমগ্র এনজিও খাতে অবদান রাখছে।\n- **বর্তমান ফোকাস**: বর্তমানে ভার্ক উচ্চ-প্রভাবশালী উন্নয়ন প্রকল্প বাস্তবায়নে মনোনিবেশ করছে এবং এনএফই (NFE) ও সিএলটিএস (CLTS) কর্মসূচিতে অগ্রণী ভূমিকা পালন করছে।`,
    followUpEn: "Would you like to know more about our pioneering contributions in Sanitation (CLTS) or Education (NFE)?",
    followUpBn: "আপনি কি স্যানিটেশন (CLTS) বা শিক্ষা (NFE) বিষয়ে আমাদের অগ্রগামী ভূমিকা সম্পর্কে আরও জানতে চান?"
  },
  {
    id: "vision",
    category: "Vision",
    keywordsEn: ["vision", "societal vision", "future", "society", "view", "dream"],
    keywordsBn: ["ভিশন", "সামাজিক লক্ষ্য", "স্বপ্ন", "সমাজ", "ভবিষ্যৎ"],
    answerEn: `Here is the societal vision that inspires everything we do at VERC:\n\n**Societal Vision of VERC**\n\n"A self-reliant and enlightened society based on justice, equity and sustainability where every human being has equal opportunity to maximize their potentials."`,
    answerBn: `ভার্কের প্রতিটি কার্যক্রম যে সামাজিক লক্ষ্য দ্বারা পরিচালিত হয়:\n\n**ভার্কের সামাজিক লক্ষ্য (Societal Vision)**\n\n"একটি স্বনির্ভর ও আলোকিত সমাজ যেখানে প্রতিটি মানুষ ন্যায়বিচার, সাম্য এবং স্থায়িত্বের ভিত্তিতে নিজের সম্ভাবনা বিকাশের সমান সুযোগ পায়।"`,
    followUpEn: "Would you also like to read our Mission Statement or Core Values?",
    followUpBn: "আপনি কি আমাদের মিশন স্টেটমেন্ট বা মূল মূল্যবোধগুলোও জানতে চান?"
  },
  {
    id: "mission",
    category: "Mission",
    keywordsEn: ["mission", "mission statement", "purpose", "aim", "target"],
    keywordsBn: ["মিশন", "উদ্দেশ্য", "লক্ষ্যবস্তু", "মূল উদ্দেশ্য"],
    answerEn: `Certainly! Here is VERC's core Mission Statement:\n\n**VERC Mission Statement**\n\n"Transforming the lives of marginalized, disadvantaged and destitute people by providing humanitarian assistance and building resilient livelihoods."`,
    answerBn: `নিশ্চয়ই! এখানে ভার্কের মূল মিশন স্টেটমেন্ট তুলে ধরা হলো:\n\n**ভার্কের মিশন স্টেটমেন্ট (Mission Statement)**\n\n"মানবিক সহায়তা প্রদান এবং স্থিতিস্থাপক জীবিকা গঠনের মাধ্যমে প্রান্তিক ও সুবিধাবঞ্চিত মানুষের জীবন পরিবর্তন করা।"`,
    followUpEn: "Feel free to ask about our Strategic Goals or core thematic work!",
    followUpBn: "আমাদের কৌশলগত লক্ষ্য বা প্রধান কার্যক্রম সম্পর্কে নির্দ্বিধায় প্রশ্ন করতে পারেন!"
  },
  {
    id: "goals",
    category: "Goals",
    keywordsEn: ["goal", "goals", "objective", "objectives", "target", "ambition"],
    keywordsBn: ["গোল", "লক্ষ্য", "কৌশলগত লক্ষ্য", "উদ্দেশ্য"],
    answerEn: `Glad you asked! Here are VERC's strategic goals:\n\n**VERC Strategic Goals**\n\n"Sustainable socio-economic development of the disadvantaged and destitute people exploring their potentials and adaptation capacities."`,
    answerBn: `সুন্দর একটি প্রশ্ন! এখানে ভার্কের কৌশলগত লক্ষ্য তুলে ধরা হলো:\n\n**ভার্কের কৌশলগত লক্ষ্য (Our Goals)**\n\n"সুবিধাবঞ্চিত ও দুস্থ মানুষের সম্ভাবনা এবং অভিযোজন ক্ষমতা অন্বেষণের মাধ্যমে টেকসই আর্থ-সামাজিক উন্নয়ন।"`,
    followUpEn: "Interested in learning how we achieve these goals through Microfinance or WASH programs?",
    followUpBn: "আমরা কীভাবে মাইক্রোফাইন্যান্স বা WASH প্রোগ্রামের মাধ্যমে এই লক্ষ্যগুলো অর্জন করি তা জানতে চান?"
  },
  {
    id: "values",
    category: "Values",
    keywordsEn: ["value", "values", "core values", "principle", "principles", "ethics"],
    keywordsBn: ["মূল্যবোধ", "নীতি", "মূল মূল্যবোধ", "নীতিমালা"],
    answerEn: `At VERC, our operations are guided by seven core values:\n\n**VERC Core Values**\n\n- **Participation**: Engaging local communities actively.\n- **Respect**: Honor and dignity for every individual.\n- **Environment Friendly**: Sustainable and eco-conscious solutions.\n- **Sustainability**: Ensuring long-term community impact.\n- **Innovation**: Continuous improvement and groundbreaking models.\n- **Good Governance**: Transparency, accountability, and integrity.\n- **Equality**: Equal opportunities for all marginalized people.`,
    answerBn: `ভার্কের প্রতিটি কাজ ও সিদ্ধান্ত সাতটি মূল মূল্যবোধ দ্বারা পরিচালিত হয়:\n\n**ভার্কের মূল মূল্যবোধ (Core Values)**\n\n- **অংশগ্রহণ** (Participation)\n- **শ্রদ্ধা** (Respect)\n- **পরিবেশবান্ধব** (Environment Friendly)\n- **স্থায়িত্ব** (Sustainability)\n- **উদ্ভাবন** (Innovation)\n- **সুশাসন** (Good Governance)\n- **সমতা** (Equality)`,
    followUpEn: "Would you like to review our Core Competencies as well?",
    followUpBn: "আপনি কি আমাদের কোর কম্পিটেন্সি (দক্ষতা) সম্পর্কেও জানতে চান?"
  },
  {
    id: "competencies",
    category: "Competencies",
    keywordsEn: ["competency", "competencies", "strength", "capability", "skills", "expertise"],
    keywordsBn: ["দক্ষতা", "কম্পিটেন্সি", "শক্তি", "কোর কম্পিটেন্সি", "বিশেষজ্ঞতা"],
    answerEn: `Here are the organizational competencies that empower VERC's field success:\n\n**VERC Core Competencies**\n\n- **Innovativeness**\n- **Professionalism**\n- **Teamwork**\n- **Participatory Management**\n- **Learning Organization**\n- **Resource Sharing**\n- **Networking & Partnership**`,
    answerBn: `ভার্কের উন্নয়নমূলক সাফল্যের মূল শক্তিগুলো হলো:\n\n**ভার্কের কোর কম্পিটেন্সি (Core Competencies)**\n\n- **উদ্ভাবনী ক্ষমতা** (Innovativeness)\n- **পেশাদারিত্ব** (Professionalism)\n- **দলগত কাজ** (Teamwork)\n- **অংশগ্রহণমূলক ব্যবস্থাপনা** (Participatory Management)\n- **লার্নিং অর্গানাইজেশন** (Learning Organization)\n- **সম্পদ ভাগাভাগি** (Resource Sharing)\n- **নেটওয়ার্কিং ও পার্টনারশিপ** (Networking & Partnership)`
  },
  {
    id: "thematic",
    category: "Thematic Areas",
    keywordsEn: ["thematic", "focus", "area", "areas", "sector", "sectors", "programs", "work", "activities"],
    keywordsBn: ["ক্ষেত্র", "ফোকাস", "থিম্যাটিক", "কার্যক্রম", "খাত", "প্রকল্প"],
    answerEn: `VERC operates across six major thematic focus areas:\n\n**VERC Thematic Areas & Focus**\n\n- 📖 **Life Skill Education**: Community-run schools and adult literacy.\n- 🏥 **Health Services**: Mother and child hospitals in Savar & Mirsarai.\n- 💧 **WASH Support**: Clean water, 100% sanitation, and hygiene promotion.\n- 💼 **Micro Finance**: Financial inclusion through Jagoron & Agrosor loans.\n- 🌍 **Climate Adaptation**: Climate resilience and disaster vulnerability management.\n- 🛡️ **Humanitarian Response**: Rapid emergency relief and community rehabilitation.`,
    answerBn: `ভার্ক মূলত ৬টি প্রধান থিম্যাটিক ক্ষেত্র নিয়ে কাজ করে:\n\n**ভার্কের প্রধান থিম্যাটিক ক্ষেত্রসমূহ**\n\n- 📖 **লাইফ স্কিল এডুকেশন**: অনানুষ্ঠানিক শিশু ও বয়স্ক শিক্ষা।\n- 🏥 **স্বাস্থ্য সেবা**: সাভার ও মীরসরাই মা ও শিশু হাসপাতাল।\n- 💧 **WASH সহায়তা**: ১০০% স্যানিটেশন, নিরাপদ পানি ও স্বাস্থ্যবিধি।\n- 💼 **মাইক্রোফাইন্যান্স**: জাগরণ ও অগ্রসর ক্ষুদ্রঋণ সুবিধা।\n- 🌍 **জলবায়ু অভিযোজন**: দুর্যোগ মোকাবেলা ও জলবায়ু সহনশীলতা।\n- 🛡️ **মানবিক সহায়তা**: জরুরি ত্রাণ ও পুনর্বাসন।`,
    followUpEn: "Which thematic area would you like to explore in more detail?",
    followUpBn: "কোন নির্দিষ্ট ক্ষেত্রটি সম্পর্কে আপনি বিস্তারিত জানতে চান?"
  },
  {
    id: "clts",
    category: "Pioneering CLTS",
    keywordsEn: ["clts", "sanitation", "toilet", "hygiene", "february 2000", "2000", "people initiated", "water credit", "wash", "latrine", "clean water"],
    keywordsBn: ["সিএলটিএস", "স্যানিটেশন", "টয়লেট", "ওয়াশ", "২০০০", "স্বাস্থ্যবিধি", "পায়খানা", "নিরাপদ পানি"],
    answerEn: `I'd love to highlight one of VERC's proudest global breakthroughs!\n\n**Pioneering Contribution: Community Led Total Sanitation (CLTS)**\n\nIntroduced in **Feb 2000**, VERC pioneered the **'People Initiated 100% Sanitation Approach'**. It is now recognized as a global gold standard replicated across Bangladesh's national sanitation program strategy and in over 60 countries worldwide.`,
    answerBn: `ভার্কের সবচেয়ে গর্বের বৈশ্বিক আবিষ্কারগুলোর মধ্যে এটি অন্যতম!\n\n**ভার্কের যুগান্তকারী অবদান: Community Led Total Sanitation (CLTS)**\n\n২০০০ সালের **ফেব্রুয়ারিতে** ভার্ক **'পিপল ইনিশিয়েটেড ১০০% স্যানিটেশন অ্যাপ্রোচ'** শুরু করে, যা এখন জাতীয় এবং বৈশ্বিক স্যানিটেশন কৌশলের একটি অবিচ্ছেদ্য অংশ এবং বিশ্বের ৬০টিরও বেশি দেশে অনুসৃত হয়।`,
    followUpEn: "Would you also like to read about our pioneering work in Non-Formal Education (NFE)?",
    followUpBn: "আপনি কি অনানুষ্ঠানিক শিক্ষা (NFE) বিষয়েও আমাদের যুগান্তকারী অবদান দেখতে চান?"
  },
  {
    id: "nfe",
    category: "Pioneering NFE",
    keywordsEn: ["nfe", "non formal education", "education", "school", "learning", "literacy", "adult education", "children school"],
    keywordsBn: ["শিক্ষা", "এনএফই", "অনানুষ্ঠানিক শিক্ষা", "স্কুল", "বয়স্ক শিক্ষা", "স্বাক্ষরতা", "বিদ্যালয়"],
    answerEn: `Education has been at the heart of VERC since its inception!\n\n**Pioneering Contribution: Non Formal Education (NFE)**\n\nVERC initiated innovative **community-run school models** and adult education strategies. These models have been adapted and replicated worldwide by leading international development organizations for hard-to-reach populations.`,
    answerBn: `শিক্ষার প্রসার ভার্কের কাজের অন্যতম প্রধান চালিকাশক্তি!\n\n**ভার্কের যুগান্তকারী অবদান: অনানুষ্ঠানিক শিক্ষা (NFE)**\n\nভার্ক প্রথম কমিউনিটি চালিত স্কুল মডেল এবং বয়স্ক শিক্ষা কৌশল চালু করে যা বিশ্বজুড়ে বিভিন্ন আন্তর্জাতিক উন্নয়ন সংস্থা দ্বারা অনুকরণ করা হয়েছে।`
  },
  {
    id: "headquarters",
    category: "Contact",
    keywordsEn: ["headquarters", "hq", "address", "location", "office", "savar", "where is verc", "building", "visit"],
    keywordsBn: ["ঠিকানা", "অফিস", "কোথায়", "সদর দপ্তর", "সাভার", "হেড অফিস", "অবস্থান"],
    answerEn: `Here is the official address of VERC Headquarters:\n\n📍 **Address**: B30, Ekhlas Uddin Khan Road, Anandapur, Savar, Dhaka, Bangladesh.`,
    answerBn: `ভার্কের প্রধান কার্যালয়ের অফিসিয়াল ঠিকানা নিচে দেওয়া হলো:\n\n📍 **ঠিকানা**: বি৩০, এখলাস উদ্দিন খান রোড, আনন্দপুর, সাভার, ঢাকা, বাংলাদেশ।`,
    followUpEn: "Need our direct phone numbers or email addresses?",
    followUpBn: "আমাদের সরাসরি ফোন নাম্বার বা ইমেইল ঠিকানা প্রয়োজন?"
  },
  {
    id: "phone",
    category: "Contact",
    keywordsEn: ["phone", "support", "contact number", "hotline", "call", "telephone", "mobile", "number", "dial"],
    keywordsBn: ["ফোন", "মোবাইল", "কল", "নাম্বার", "হটলাইন", "টেলিফোন"],
    answerEn: `You can reach our team directly during office hours:\n\n📞 **Phone & Support**: +88 02223371216, +88 02223371217\n🕒 **Working Hours**: Sunday to Thursday, 9:00 AM – 5:00 PM`,
    answerBn: `অফিস চলাকালীন আপনি সরাসরি আমাদের টিমের সাথে যোগাযোগ করতে পারেন:\n\n📞 **ফোন ও সাপোর্ট**: +88 02223371216, +88 02223371217\n🕒 **অফিস সময়**: রবিবার - বৃহস্পতিবার (সকাল ৯:০০ - বিকাল ৫:০০)`
  },
  {
    id: "email",
    category: "Contact",
    keywordsEn: ["email", "mail", "contact email", "info", "reach", "send mail"],
    keywordsBn: ["ইমেইল", "মেইল", "ই-মেইল", "যোগাযোগ"],
    answerEn: `Here are our official email addresses for general inquiries and partnerships:\n\n✉️ **Official Email**: verc@bangla.net, info@vercbd.org`,
    answerBn: `সাধারণ তথ্যানুসন্ধান এবং পার্টনারশিপের জন্য আমাদের অফিশিয়াল ইমেইল নিচে দেওয়া হলো:\n\n✉️ **অফিসিয়াল ইমেইল**: verc@bangla.net, info@vercbd.org`
  },
  {
    id: "microfinance",
    category: "Microfinance",
    keywordsEn: ["microfinance", "micro finance", "loan", "credit", "jagoron", "agrosor", "branch", "branches", "recovery", "savings", "money"],
    keywordsBn: ["মাইক্রোফাইন্যান্স", "ক্ষুদ্রঋণ", "ঋণ", "জাগরণ", "অগ্রসর", "শাখা", "সঞ্চয়", "টাকা"],
    answerEn: `Here is an overview of VERC's Microfinance operations:\n\n**VERC Microfinance Program**\n\n- **Core Schemes**: Jagoron (microcredit), Agrosor (small enterprise), and Water Credit (hygiene sanitation loans).\n- **Network**: Over 136 branches across 25 operational areas in Bangladesh.\n- **Impact**: Financial inclusion for over 112,000 active members with a 99.1% cumulative loan recovery rate.`,
    answerBn: `ভার্কের মাইক্রোফাইন্যান্স কার্যক্রমের সংক্ষিপ্ত বিবরণ নিচে দেওয়া হলো:\n\n**ভার্কের মাইক্রোফাইন্যান্স কর্মসূচি**\n\n- **প্রকল্পসমূহ**: জাগরণ, অগ্রসর এবং ওয়াটার ক্রেডিট।\n- **শাখা নেটওয়ার্ক**: ২৫টি এলাকায় ১৩৬টিরও বেশি শাখা রয়েছে।\n- **প্রভাব**: ৯৯.১০% ঋণ আদায় হার সহ প্রান্তিক জনগোষ্ঠীর অর্থনৈতিক উন্নয়ন।`
  },
  {
    id: "health",
    category: "Health",
    keywordsEn: ["health", "hospital", "clinic", "doctor", "mother", "child", "mirsarai", "patient", "medical"],
    keywordsBn: ["স্বাস্থ্য", "হাসপাতাল", "ক্লিনিক", "ডাক্তার", "মা ও শিশু", "সাভার হাসপাতাল", "চিকিৎসা"],
    answerEn: `Here is information regarding VERC's healthcare initiatives:\n\n**VERC Health Program & Hospitals**\n\nVERC focuses on mother and child health services with priority to marginalized populations, operating specialized **Mother and Child Hospitals** in Savar and Mirsarai.`,
    answerBn: `ভার্কের স্বাস্থ্য সেবা সংক্রান্ত তথ্য নিচে দেওয়া হলো:\n\n**ভার্কের স্বাস্থ্য সেবা**\n\nপ্রান্তিক জনগোষ্ঠীর মা ও শিশু স্বাস্থ্য সেবায় অগ্রাধিকার দিয়ে সাভার এবং মীরসরাইয়ে বিশেষায়িত **মা ও শিশু হাসপাতাল** পরিচালনা করছে।`
  }
];

export function findRuleAnswer(userQuery: string, lang: "en" | "bn" = "en"): { answer: string; ruleId?: string; followUp?: string } {
  const query = userQuery.trim().toLowerCase();
  
  if (!query) {
    return {
      answer: lang === "en" 
        ? "Hello! I am your VERC Assistant. How can I help you today? Please feel free to ask a question or select a topic below." 
        : "নমস্কার! আমি আপনার ভার্ক সহকারী। আমি কীভাবে সাহায্য করতে পারি? যেকোনো প্রশ্ন লিখুন বা নিচের বিষয়টি নির্বাচন করুন।"
    };
  }

  // 1. Conversational Intent: Greetings
  const greetingsEn = ["hi", "hello", "hey", "greetings", "good morning", "good afternoon", "good evening", "assalamu alaikum", "namaskar"];
  const greetingsBn = ["হ্যালো", "হাই", "নমস্কার", "আসসালামু আলাইকুম", "কেমন আছেন", "শুভ সকাল", "শুভ অপরাহ্ন"];
  if (greetingsEn.some(g => query === g || query.startsWith(g + " ")) || greetingsBn.some(g => query === g || query.startsWith(g + " "))) {
    return {
      answer: lang === "en"
        ? "Hello! 👋 Welcome to **VERC (Village Education Resource Center)**. I am your 24/7 conversational FAQ assistant.\n\nHow can I help you today? You can ask me about our **History**, **Sanitation (CLTS)**, **Education (NFE)**, **Microfinance**, or **Headquarters & Contact details**!"
        : "হ্যালো! 👋 **ভার্ক (ভিলেজ এডুকেশন রিসোর্স সেন্টার)**-এ আপনাকে স্বাগতম। আমি আপনার ২৪/৭ এফএকিউ সহকারী।\n\nআমি আপনাকে কীভাবে সাহায্য করতে পারি? আপনি ভার্কের **ইতিহাস**, **স্যানিটেশন (CLTS)**, **অনানুষ্ঠানিক শিক্ষা (NFE)**, **মাইক্রোফাইন্যান্স** বা **যোগাযোগের ঠিকানা** সম্পর্কে যেকোনো প্রশ্ন করতে পারেন!",
      followUp: lang === "en" ? "Click any quick prompt below or type your question!" : "নিচের প্রশ্নগুলোতে ক্লিক করুন বা আপনার প্রশ্ন লিখুন!"
    };
  }

  // 2. Conversational Intent: Thanks / Gratitude
  const thanksEn = ["thanks", "thank you", "thank you so much", "thx", "appreciate it", "great"];
  const thanksBn = ["ধন্যবাদ", "অনেক ধন্যবাদ", "থ্যাংকস", "শুভকামনা", "ধন্যবাদ ভাই"];
  if (thanksEn.some(t => query === t || query.includes(t)) || thanksBn.some(t => query === t || query.includes(t))) {
    return {
      answer: lang === "en"
        ? "You're very welcome! 😊 It is my pleasure to assist you. Please let me know if you have any other questions about VERC's work, values, or contact details!"
        : "আপনাকে অসংখ্য ধন্যবাদ! 😊 আপনার সেবা করতে পেরে আনন্দিত। ভার্কের কার্যক্রম বা অন্য কোনো বিষয়ে জানার থাকলে নির্দ্বিধায় জিজ্ঞাসা করুন!"
    };
  }

  // 3. Conversational Intent: Identity / Bot Info
  const identityEn = ["who are you", "what is your name", "what can you do", "who created you", "bot info"];
  const identityBn = ["আপনি কে", "আপনার নাম কি", "আপনি কি করতে পারেন", "ভার্ক বোট"];
  if (identityEn.some(i => query.includes(i)) || identityBn.some(i => query.includes(i))) {
    return {
      answer: lang === "en"
        ? "I am the **VERC Conversational AI Assistant**! 🤖\n\nI have complete knowledge of the **Village Education Resource Center (VERC)** including our 1977 history, societal vision, core values, pioneering Community Led Total Sanitation (CLTS), Non-Formal Education (NFE), Microfinance network, and Headquarters contact info."
        : "আমি **ভার্ক কনভার্সেশনাল এআই সহকারী**! 🤖\n\nভিলেজ এডুকেশন রিসোর্স সেন্টার (VERC)-এর ১৯৭৭ সালের ইতিহাস, সামাজিক লক্ষ্য, মূল্যবোধ, স্যানিটেশন (CLTS), শিক্ষা (NFE), মাইক্রোফাইন্যান্স এবং হেড অফিস সম্পর্কে সব তথ্য আমার জানা আছে।"
    };
  }

  // 4. Direct Topic ID match
  const directTopic = VERC_RULES.find(r => r.id === query);
  if (directTopic) {
    return {
      answer: lang === "bn" ? directTopic.answerBn : directTopic.answerEn,
      ruleId: directTopic.id,
      followUp: lang === "bn" ? directTopic.followUpBn : directTopic.followUpEn
    };
  }

  // 5. Intelligent Weight-based Rule Matcher
  let bestMatch: Rule | null = null;
  let maxScore = 0;

  for (const rule of VERC_RULES) {
    let score = 0;
    const keywords = lang === "bn" ? [...rule.keywordsBn, ...rule.keywordsEn] : [...rule.keywordsEn, ...rule.keywordsBn];
    
    for (const kw of keywords) {
      const lowerKw = kw.toLowerCase();
      if (query === lowerKw) {
        score += 10;
      } else if (query.includes(lowerKw)) {
        score += lowerKw.length > 4 ? 5 : 3;
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestMatch = rule;
    }
  }

  if (bestMatch && maxScore >= 3) {
    return {
      answer: lang === "bn" ? bestMatch.answerBn : bestMatch.answerEn,
      ruleId: bestMatch.id,
      followUp: lang === "bn" ? bestMatch.followUpBn : bestMatch.followUpEn
    };
  }

  // 6. FAQ Overview / Directory
  if (query.includes("faq") || query.includes("list") || query.includes("all") || query.includes("প্রশ্ন") || query.includes("তালিকা")) {
    return {
      answer: lang === "en"
        ? "Here are the main topics I am trained to discuss with you:\n\n- **Journey & History** (Started 1977 as SCF-USA project, NGO in 1989)\n- **Societal Vision & Mission Statement**\n- **Our Strategic Goals & 7 Core Values**\n- **7 Core Competencies**\n- **6 Thematic Focus Areas** (Education, Health, WASH, Microfinance, Climate, Relief)\n- **Pioneering CLTS Sanitation** (Feb 2000 100% Sanitation Approach)\n- **Non-Formal Education (NFE)**\n- **Headquarters Address, Phone & Email**"
        : "যেসব বিষয়ে আমি আপনাকে বিস্তারিত তথ্য দিতে পারি:\n\n- **ইতিহাস ও যাত্রা** (১৯৭৭ সালে শুরু, ১৯৮৯ সালে এনজিও)\n- **সামাজিক লক্ষ্য ও মিশন**\n- **কৌশলগত লক্ষ্য ও ৭টি মূল মূল্যবোধ**\n- **৭টি কোর কম্পিটেন্সি (দক্ষতা)**\n- **৬টি প্রধান ফোকাস এরিয়া** (শিক্ষা, স্বাস্থ্য, ওয়াশ, ক্ষুদ্রঋণ, জলবায়ু, ত্রাণ)\n- **স্যানিটেশন (CLTS)** (ফেব্রুয়ারি ২০০০ ১০০% স্যানিটেশন)\n- **অনানুষ্ঠানিক শিক্ষা (NFE)**\n- **প্রধান কার্যালয়ের ঠিকানা, ফোন ও ইমেইল**"
    };
  }

  // 7. Conversational Default Fallback
  return {
    answer: lang === "en"
      ? "I understand you're asking about VERC! While I might not have captured that exact phrase, here are the key areas I can tell you all about:\n\n- **History & Origin**: Founded in 1977 as SCF-USA project.\n- **Pioneering Sanitation (CLTS)**: Introduced Feb 2000.\n- **Education (NFE)**: Community-run schools & literacy.\n- **Headquarters**: Anandapur, Savar, Dhaka.\n- **Contact Phone**: +88 02223371216 | info@vercbd.org\n\nFeel free to tap any topic button below!"
      : "আমি বুঝতে পারছি আপনি ভার্ক সম্পর্কে জানতে চাচ্ছেন! নিচের মূল বিষয়গুলো সম্পর্কে আমি আপনাকে সব তথ্য দিতে পারি:\n\n- **ইতিহাস ও সূচনা**: ১৯৭৭ সালে SCF-USA প্রকল্প হিসেবে যাত্রা শুরু।\n- **স্যানিটেশন (CLTS)**: ২০০০ সালের ফেব্রুয়ারি থেকে ১০০% স্যানিটেশন।\n- **অনানুষ্ঠানিক শিক্ষা (NFE)**: কমিউনিটি চালিত স্কুল ও শিক্ষা।\n- **প্রধান কার্যালয়**: আনন্দপুর, সাভার, ঢাকা।\n- **ফোন**: +88 02223371216 | info@vercbd.org\n\nনিচের প্রশ্নগুলোতে ক্লিক করে আরও জানুন!"
  };
}
