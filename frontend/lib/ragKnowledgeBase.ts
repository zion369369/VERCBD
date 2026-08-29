export interface KnowledgeChunk {
  id: string;
  category: string;
  subcategory?: string;
  title: string;
  keywords: string[];
  keywordsBn?: string[];
  contentEn: string;
  contentBn: string;
  metadata?: {
    location?: string;
    impactMetric?: string;
    contactRef?: string;
  };
}

export interface RetrievalResult {
  chunks: KnowledgeChunk[];
  formattedContext: string;
  retrievedCount: number;
  topCategory: string;
  scores: Array<{ id: string; score: number }>;
}

export const VERC_RAG_KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: "history_origin",
    category: "About VERC",
    subcategory: "Institutional History",
    title: "History and Origin of VERC (1977 - Present)",
    keywords: ["history", "origin", "started", "founded", "1977", "1989", "scf", "scf-usa", "save the children", "background", "consultancy", "establishment"],
    keywordsBn: ["ইতিহাস", "যাত্রা", "শুরু", "১৯৭৭", "১৯৮৯", "প্রতিষ্ঠা", "ভার্ক", "পরিচিতি", "ভার্ক কে", "আমাদের সম্পর্কে", "পটভূমি"],
    contentEn: `The Village Education Resource Center (VERC) started its journey as a project of Save the Children Fund USA (SCF-USA) back in 1977 with an aim to provide process consultancy to ensure effective community participation in development. By 1989, VERC transitioned into a completely independent local non-governmental development organization (NGO) serving the entire NGO and social development sector in Bangladesh. Over the decades, VERC has maintained its pioneering status in Non Formal Education (NFE) and Community Led Total Sanitation (CLTS).`,
    contentBn: `ভিলেজ এডুকেশন রিসোর্স সেন্টার (ভার্ক) ১৯৭৭ সালে সেভ দ্য চিলড্রেন ফান্ড ইউএসএ (SCF-USA)-এর একটি প্রকল্প হিসেবে যাত্রা শুরু করে যার উদ্দেশ্য ছিল কার্যকর জনঅংশগ্রহণ নিশ্চিত করতে প্রক্রিয়াগত পরামর্শ প্রদান করা। ১৯৮৯ সালের মধ্যে ভার্ক একটি সম্পূর্ণ স্বাধীন ও স্বতন্ত্র স্থানীয় বেসরকারি উন্নয়ন সংস্থায় (এনজিও) রূপান্তরিত হয়। বিগত দশকগুলোতে ভার্ক অনানুষ্ঠানিক শিক্ষা (NFE) এবং কমিউনিটি চালিত ১০০% স্যানিটেশন (CLTS) কর্মসূচিতে অগ্রণী ভূমিকা পালন করে আসছে।`,
    metadata: {
      impactMetric: "Established 1977 | Independent NGO since 1989"
    }
  },
  {
    id: "vision_mission_goals",
    category: "About VERC",
    subcategory: "Strategic Direction",
    title: "Societal Vision, Mission Statement, and Strategic Goals",
    keywords: ["vision", "mission", "goal", "goals", "aim", "purpose", "target", "society", "equity", "justice", "resilient", "future", "potentials"],
    keywordsBn: ["ভিশন", "মিশন", "লক্ষ্য", "উদ্দেশ্য", "সামাজিক লক্ষ্য", "স্বপ্ন", "সমতা", "ন্যায়বিচার", "ভবিষ্যৎ"],
    contentEn: `Societal Vision: A self-reliant and enlightened society based on justice, equity, and sustainability where every human being has equal opportunity to maximize their potentials.
Mission Statement: Transforming the lives of marginalized, disadvantaged, and destitute people by providing humanitarian assistance and building resilient livelihoods.
Strategic Goals: Sustainable socio-economic development of disadvantaged and destitute people exploring their potentials and adaptation capacities.`,
    contentBn: `সামাজিক লক্ষ্য (Societal Vision): একটি স্বনির্ভর ও আলোকিত সমাজ যেখানে প্রতিটি মানুষ ন্যায়বিচার, সাম্য এবং স্থায়িত্বের ভিত্তিতে নিজের সম্ভাবনা বিকাশের সমান সুযোগ পায়।
মিশন স্টেটমেন্ট (Mission Statement): মানবিক সহায়তা প্রদান এবং স্থিতিস্থাপক জীবিকা গঠনের মাধ্যমে প্রান্তিক ও সুবিধাবঞ্চিত মানুষের জীবন পরিবর্তন করা।
কৌশলগত লক্ষ্য (Our Goals): সুবিধাবঞ্চিত ও দুস্থ মানুষের সম্ভাবনা এবং অভিযোজন ক্ষমতা অন্বেষণের মাধ্যমে টেকসই আর্থ-সামাজিক উন্নয়ন।`,
    metadata: {
      impactMetric: "Empowering Marginalized Communities Worldwide"
    }
  },
  {
    id: "core_values",
    category: "Core Principles",
    subcategory: "Organizational Values",
    title: "VERC Core Values",
    keywords: ["value", "values", "core values", "principles", "ethics", "governance", "equality", "respect", "participation", "sustainability"],
    keywordsBn: ["মূল্যবোধ", "নীতি", "মূল মূল্যবোধ", "অংশগ্রহণ", "শ্রদ্ধা", "সুশাসন", "সমতা"],
    contentEn: `VERC strictly adheres to seven core values:
1. Participation - Active community engagement and ownership.
2. Respect - Dignity and honor for all individuals.
3. Environment Friendly - Eco-conscious and climate-adapted solutions.
4. Sustainability - Ensuring long-term impact and self-reliance.
5. Innovation - Continuous learning and pioneering groundbreaking models.
6. Good Governance - Transparency, integrity, and accountability.
7. Equality - Equal opportunities for all marginalized individuals.`,
    contentBn: `ভার্কের ৭টি মূল মূল্যবোধ:
১. অংশগ্রহণ (Participation) - সক্রিয় জনঅংশগ্রহণ।
২. শ্রদ্ধা (Respect) - মানুষের মর্যাদা প্রদান।
৩. পরিবেশবান্ধব (Environment Friendly) - পরিবেশ সচেতন উন্নয়ন।
৪. স্থায়িত্ব (Sustainability) - দীর্ঘমেয়াদী আত্মনির্ভরশীলতা।
৫. উদ্ভাবন (Innovation) - নতুন ও কার্যকর মডেল তৈরি।
৬. সুশাসন (Good Governance) - স্বচ্ছতা ও জবাবদিহিতা।
৭. সমতা (Equality) - সবার জন্য সমান সুযোগ।`,
    metadata: {
      impactMetric: "7 Core Governance Values"
    }
  },
  {
    id: "core_competencies",
    category: "Core Principles",
    subcategory: "Organizational Competencies",
    title: "VERC Core Competencies",
    keywords: ["competencies", "skills", "capabilities", "strengths", "professionalism", "teamwork", "learning organization", "networking", "partnership"],
    keywordsBn: ["দক্ষতা", "কম্পিটেন্সি", "শক্তি", "পেশাদারিত্ব", "দলগত কাজ", "পার্টনারশিপ"],
    contentEn: `VERC's core competencies include:
- Innovativeness in community development models.
- Professionalism in project execution.
- Teamwork and cohesive operations.
- Participatory Management in decision-making.
- Learning Organization continuously adapting lessons learned.
- Resource Sharing for efficiency.
- Networking & Partnership with national and international donors.`,
    contentBn: `ভার্কের ৭টি মূল কোর কম্পিটেন্সি:
- উদ্ভাবনী ক্ষমতা (Innovativeness)
- পেশাদারিত্ব (Professionalism)
- দলগত কাজ (Teamwork)
- অংশগ্রহণমূলক ব্যবস্থাপনা (Participatory Management)
- লার্নিং অর্গানাইজেশন (Learning Organization)
- সম্পদ ভাগাভাগি (Resource Sharing)
- নেটওয়ার্কিং ও পার্টনারশিপ (Networking & Partnership)`,
    metadata: {
      impactMetric: "7 Core Technical Competencies"
    }
  },
  {
    id: "clts_sanitation",
    category: "Pioneering Work",
    subcategory: "Water & Sanitation",
    title: "Community Led Total Sanitation (CLTS)",
    keywords: ["clts", "sanitation", "toilet", "hygiene", "february 2000", "2000", "people initiated", "100% sanitation", "latrine", "open defecation", "wash"],
    keywordsBn: ["সিএলটিএস", "স্যানিটেশন", "টয়লেট", "ওয়াশ", "২০০০", "স্বাস্থ্যবিধি", "পায়খানা", "নিরাপদ পানি"],
    contentEn: `Pioneering CLTS Contribution: In February 2000, VERC pioneered the 'People Initiated 100% Sanitation Approach' (CLTS) in Bangladesh. This revolutionary methodology empowers local communities to analyze their sanitation status and eliminate open defecation without hardware subsidies. CLTS has become a global gold standard in sanitation, adopted into Bangladesh's national strategy and replicated in over 60 countries across Asia, Africa, and Latin America.`,
    contentBn: `স্যানিটেশনে যুগান্তকারী অবদান (CLTS): ২০০০ সালের ফেব্রুয়ারি মাসে ভার্ক বাংলাদেশে 'পিপল ইনিশিয়েটেড ১০০% স্যানিটেশন অ্যাপ্রোচ' (CLTS) শুরু করে। এটি কোনো সরাসরি সরকারি ভর্তুকি ছাড়াই গ্রামীণ সম্প্রদায়কে উন্মুক্ত স্থানে মলত্যাগ বন্ধ করতে উদ্বুদ্ধ করে। এটি এখন বাংলাদেশ সরকারের জাতীয় স্যানিটেশন কৌশল এবং বিশ্বের ৬০টিরও বেশি দেশে গোল্ড স্ট্যান্ডার্ড হিসেবে স্বীকৃত।`,
    metadata: {
      impactMetric: "Replicated in 60+ countries | Global Gold Standard since Feb 2000"
    }
  },
  {
    id: "nfe_education",
    category: "Pioneering Work",
    subcategory: "Education Sector",
    title: "Non Formal Education (NFE)",
    keywords: ["nfe", "non formal education", "education", "school", "literacy", "adult education", "proteeva", "scbrt", "parse", "learning"],
    keywordsBn: ["শিক্ষা", "এনএফই", "অনানুষ্ঠানিক শিক্ষা", "স্কুল", "বয়স্ক শিক্ষা", "স্বাক্ষরতা", "বিদ্যালয়"],
    contentEn: `Pioneering Non-Formal Education (NFE): VERC is one of the earliest pioneers of non-formal children's education and adult literacy in Bangladesh. VERC initiated community-run school models, child-centered active learning techniques, and innovative learning materials. These models have been adapted worldwide by UNICEF, UNESCO, and major international NGOs. VERC runs targeted projects such as Proteeva, SCBRT, and PARSE to ensure education access for underprivileged children.`,
    contentBn: `অনানুষ্ঠানিক শিক্ষা (NFE): শিশু এবং বয়স্ক শিক্ষার ক্ষেত্রে ভার্ক বাংলাদেশের অন্যতম অগ্রগামী সংস্থা। ভার্ক প্রথম কমিউনিটি চালিত প্রাথমিক বিদ্যালয় মডেল এবং বয়স্ক শিক্ষা কেন্দ্র চালু করে। ইউনিসেফ ও ইউনেস্কোসহ আন্তর্জাতিক সংস্থাগুলো ভার্কের এই শিক্ষা মডেল বিশ্বজুড়ে অনুসরণ করেছে। ভার্ক বর্তমানে প্রতিভা (Proteeva), SCBRT এবং PARSE সহ বিভিন্ন শিক্ষা প্রকল্প পরিচালনা করছে।`,
    metadata: {
      impactMetric: "Replicated by UNICEF & UNESCO globally"
    }
  },
  {
    id: "microfinance_program",
    category: "Microfinance",
    subcategory: "Economic Empowerment",
    title: "VERC Microfinance & Livelihood Program",
    keywords: ["microfinance", "micro finance", "loan", "credit", "jagoron", "agrosor", "buniad", "sufolon", "enrich", "water credit", "branches", "recovery", "members"],
    keywordsBn: ["মাইক্রোফাইন্যান্স", "ক্ষুদ্রঋণ", "ঋণ", "জাগরণ", "অগ্রসর", "বুনিয়াদ", "সুফলন", "এনরিচ", "ওয়াটার ক্রেডিট", "শাখা", "সদস্য"],
    contentEn: `VERC Microfinance Program: VERC operates a comprehensive Microfinance & Livelihood Development network with over 136 branches across 25 operational areas (31 districts and 106 upazilas) in Bangladesh. 
Core Loan Schemes:
- Jagoron: Microcredit for small traders and rural micro-entrepreneurs.
- Agrosor: Enterprise development loans for growing businesses.
- Buniad: Financial support for ultra-poor households.
- Sufolon: Seasonal agricultural credit for farmers.
- ENRICH: Holistic community development financial aid.
- Water Credit: Dedicated financing for household safe drinking water and sanitary latrines.
VERC serves over 112,000 active members with an exemplary cumulative loan recovery rate of 99.10%.`,
    contentBn: `ভার্কের মাইক্রোফাইন্যান্স কর্মসূচি: ভার্ক বাংলাদেশে ৩১টি জেলা ও ১০৬টি উপজেলায় ২৫টি এলাকায় ১৩৬টিরও বেশি শাখার মাধ্যমে বিস্তৃত ক্ষুদ্রঋণ কর্মসূচি পরিচালনা করছে।
প্রধান ঋণ সুবিধাসমূহ:
- জাগরণ (Jagoron): ক্ষুদ্র ব্যবসায়ী ও গ্রামীণ উদ্যোক্তা ঋণ।
- অগ্রসর (Agrosor): মাঝারি ব্যবসা সম্প্রসারণের উদ্যোক্তা ঋণ।
- বুনিয়াদ (Buniad): চরম দরিদ্র জনগোষ্ঠীর আর্থিক সহায়তা।
- সুফলন (Sufolon): কৃষকদের জন্য কৃষি ঋণ।
- এনরিচ (ENRICH): সমন্বিত সামাজিক উন্নয়ন ঋণ।
- ওয়াটার ক্রেডিট (Water Credit): নিরাপদ পানি ও ল্যাট্রিন নির্মাণের বিশেষ ঋণ।
ভার্ক বর্তমানে ১,১২,০০০+ সক্রিয় সদস্যকে সেবা দিচ্ছে এবং এর সঞ্চয় ও ঋণ আদায়ের গড় হার ৯৯.১০%।`,
    metadata: {
      impactMetric: "136+ Branches | 112,000+ Members | 99.10% Recovery Rate"
    }
  },
  {
    id: "health_hospitals",
    category: "Health Program",
    subcategory: "Medical Services",
    title: "VERC Health Services & Mother & Child Hospitals",
    keywords: ["health", "hospital", "mother and child hospital", "clinic", "savar hospital", "mirsarai hospital", "maternal", "immunization", "doctor", "delivery"],
    keywordsBn: ["স্বাস্থ্য", "হাসপাতাল", "মা ও শিশু হাসপাতাল", "সাভার", "মীরসরাই", "ক্লিনিক", "ডাক্তার", "মাতৃত্বকালীন"],
    contentEn: `VERC Health Program & Hospitals: VERC prioritizes maternal, child, and community healthcare. VERC operates two specialized Mother and Child Hospitals:
1. VERC Mother and Child Hospital, Savar, Dhaka.
2. VERC Mother and Child Hospital, Mirsarai, Chattogram.
Services include 24/7 emergency maternity care, safe delivery, prenatal/postnatal care, child vaccination, outpatient doctor consultations, and rural community health awareness clinics.`,
    contentBn: `ভার্ক স্বাস্থ্য সেবা ও হাসপাতাল: ভার্ক প্রান্তিক জনগোষ্ঠীর মা ও শিশু স্বাস্থ্য সেবাকে সর্বোচ্চ অগ্রাধিকার দেয়। ভার্ক দুটি বিশেষায়িত মা ও শিশু হাসপাতাল পরিচালনা করছে:
১. ভার্ক মা ও শিশু হাসপাতাল, সাভার, ঢাকা।
২. ভার্ক মা ও শিশু হাসপাতাল, মীরসরাই, চট্টগ্রাম।
সেবাসমূহ: ২৪ ঘণ্টা প্রসূতি সেবা, নিরাপদ সন্তান প্রসব, গর্ভকালীন ও প্রসবপরবর্তী সেবা, শিশু টিকাদান, আউটডোর ডাক্তার কনসাল্টেশন এবং গ্রামীণ জনস্বাস্থ্য সচেতনতা।`,
    metadata: {
      location: "Savar (Dhaka) & Mirsarai (Chattogram)",
      impactMetric: "24/7 Maternity & Child Care Hospitals"
    }
  },
  {
    id: "headquarters_contact",
    category: "Contact Info",
    subcategory: "Headquarters & Support",
    title: "VERC Headquarters & Contact Information",
    keywords: ["headquarters", "contact", "address", "phone", "email", "savar", "location", "office", "hotline", "zip", "map"],
    keywordsBn: ["ঠিকানা", "যোগাযোগ", "ফোন", "ইমেইল", "সাভার", "সদর দপ্তর", "হটলাইন"],
    contentEn: `VERC Headquarters & Official Contact Details:
Address: B30, Ekhlas Uddin Khan Road, Anandapur, Savar, Dhaka, Bangladesh.
Phone Lines: +88 02223371216, +88 02223371217, +88 02223371218
Telephone & Fax: Tel: +88 02 7742029, Fax: +88 02 7745779
Official Email: verc@bangla.net, info@vercbd.org
Official Website: https://www.vercbd.org`,
    contentBn: `ভার্ক প্রধান কার্যালয় ও যোগাযোগের ঠিকানা:
ঠিকানা: বি৩০, এখলাস উদ্দিন খান রোড, আনন্দপুর, সাভার, ঢাকা, বাংলাদেশ।
ফোন নাম্বার: +৮৮ ০২২২৩৩cx১২১৬, +৮৮ ০২২২৩৩cx১২১৭, +৮৮ ০২২২৩৩cx১২১৮
জরুরি টেলিফোন: +৮৮ ০২ ৭৭৪২০২৯, ফ্যাক্স: +৮৮ ০২ ৭৭৪৫৭৭৯
অফিসিয়াল ইমেইল: verc@bangla.net, info@vercbd.org
ওয়েবসাইট: https://www.vercbd.org`,
    metadata: {
      contactRef: "Anandapur, Savar, Dhaka"
    }
  },
  {
    id: "legal_affiliation",
    category: "Legal Information",
    subcategory: "Government Registrations",
    title: "VERC Legal Affiliations & Registrations",
    keywords: ["legal", "registration", "affiliation", "ngo bureau", "mra", "license", "government", "social welfare", "reg number"],
    keywordsBn: ["নিবন্ধন", "আইনি অনুমোদন", "এনজিও বিউরো", "এমআরএ", "লাইসেন্স"],
    contentEn: `VERC Legal Affiliations & Registrations:
- Registered with NGO Affairs Bureau, Prime Minister's Office, Bangladesh (Reg No: 374).
- Licensed by Microcredit Regulatory Authority (MRA) for Microfinance operations (MRA License No: 00923-00788-00129).
- Registered with Department of Social Services, Bangladesh (Reg No: Dha-0678).`,
    contentBn: `ভার্কের আইনি নিবন্ধন ও অনুমোদনসমূহ:
- প্রধানমন্ত্রীর কার্যালয়ের এনজিও বিষয়ক ব্যুরো থেকে নিবন্ধিত (নিবন্ধন নং: ৩৭৪)।
- মাইক্রোক্রেডিট রেগুলেটরি অথরিটি (MRA) লাইসেন্সপ্রাপ্ত (লাইসেন্স নং: ০০৯২৩-০০৭৮৮-০০১২৯)।
- সমাজসেবা অধিদপ্তর থেকে নিবন্ধিত (নিবন্ধন নং: ঢা-০৬৭৮)।`,
    metadata: {
      impactMetric: "NGO Bureau Reg #374 | MRA License #00923-00788-00129"
    }
  }
];

// BM25-Weighted Token Scorer for High-Precision Hybrid RAG Retrieval
export function retrieveRAGContext(userQuery: string, lang: "en" | "bn" = "en", maxChunks: number = 4): RetrievalResult {
  const cleanQuery = userQuery.trim().toLowerCase();
  const tokens = cleanQuery.split(/[\s,?.!_]+/).filter(t => t.length > 1);

  if (tokens.length === 0) {
    const defaultChunks = VERC_RAG_KNOWLEDGE_BASE.slice(0, maxChunks);
    return {
      chunks: defaultChunks,
      retrievedCount: defaultChunks.length,
      topCategory: "General Overview",
      scores: defaultChunks.map(c => ({ id: c.id, score: 1.0 })),
      formattedContext: defaultChunks
        .map(c => `[DOCUMENT: ${c.title} | Category: ${c.category}]\n${lang === "bn" ? c.contentBn : c.contentEn}`)
        .join("\n\n---\n\n")
    };
  }

  const scoredChunks = VERC_RAG_KNOWLEDGE_BASE.map(chunk => {
    let score = 0;
    const keywordsEn = chunk.keywords.map(k => k.toLowerCase());
    const keywordsBn = (chunk.keywordsBn || []).map(k => k.toLowerCase());
    const allKeywords = [...keywordsEn, ...keywordsBn];
    const fullText = (chunk.contentEn + " " + chunk.contentBn + " " + chunk.title + " " + chunk.category).toLowerCase();

    for (const token of tokens) {
      // Direct Keyword Match Boost
      if (allKeywords.includes(token)) {
        score += 8.0;
      }
      // Partial Keyword Match
      else if (allKeywords.some(kw => kw.includes(token) || token.includes(kw))) {
        score += 4.0;
      }

      // Title Match Weight
      if (chunk.title.toLowerCase().includes(token)) {
        score += 5.0;
      }

      // Full Text Frequency (TF) Weight
      const matches = fullText.split(token).length - 1;
      if (matches > 0) {
        score += Math.min(matches, 3) * 1.5;
      }
    }

    return { chunk, score };
  });

  scoredChunks.sort((a, b) => b.score - a.score);

  const topScored = scoredChunks.filter(s => s.score > 0).slice(0, maxChunks);
  const selectedChunks = topScored.length > 0 
    ? topScored.map(s => s.chunk) 
    : VERC_RAG_KNOWLEDGE_BASE.slice(0, maxChunks);

  const formattedContext = selectedChunks
    .map(c => {
      const metricTag = c.metadata?.impactMetric ? ` | Metric: ${c.metadata.impactMetric}` : "";
      return `[DOCUMENT: ${c.title} | Category: ${c.category}${metricTag}]\n${lang === "bn" ? c.contentBn : c.contentEn}`;
    })
    .join("\n\n---\n\n");

  return {
    chunks: selectedChunks,
    retrievedCount: selectedChunks.length,
    topCategory: selectedChunks[0]?.category || "General",
    scores: scoredChunks.map(s => ({ id: s.chunk.id, score: s.score })),
    formattedContext
  };
}
