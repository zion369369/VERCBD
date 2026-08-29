"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "bn";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    nav_home: "Home",
    nav_about: "About Us",
    nav_vision: "Vision and Mission",
    nav_leadership: "Governance & Leadership",
    nav_staff: "Senior Staff Members",
    nav_awards: "Our Awards",
    nav_programs: "Social Programs",
    nav_education: "Education - Non Formal",
    nav_wash: "Health, Water & Sanitation",
    nav_livelihood: "Livelihood & Empowerment",
    nav_capacity: "Capacity Building",
    nav_microfinance: "Microfinance",
    nav_mf_about: "About Microfinance",
    nav_mf_products: "Loan & Savings Products",
    nav_mf_process: "Eligibility & Process",
    nav_impact: "Impact & Partners",
    nav_impact_results: "Impact Results",
    nav_partners: "Development Partners",
    nav_resources: "Resources & Contact",
    nav_gallery: "Photo & Video Gallery",
    nav_branches: "Branch Network",
    nav_contact: "Contact Us",
    nav_admin: "Admin Studio",
    nav_donate: "Donate",

    // Hero Section
    hero_title_1: "Transforming",
    hero_highlight_1: "Destinies.",
    hero_subtitle_1: "Dedicated to empowering marginalized communities through sustainable innovation and participatory development since 1977.",
    hero_btn_primary_1: "Our Story",
    hero_btn_secondary_1: "Partner with Us",

    hero_title_2: "Pioneering Community",
    hero_highlight_2: "Sanitation & Water.",
    hero_subtitle_2: "Leading the global CLTS revolution, providing life-saving hygiene and clean water infrastructure to millions.",
    hero_btn_primary_2: "Explore WaSH",
    hero_btn_secondary_2: "Annual Reports",

    hero_title_3: "Empowering Through",
    hero_highlight_3: "Non-Formal Education.",
    hero_subtitle_3: "Creating innovative learning models, early childhood centers, and adult literacy programs across Bangladesh.",
    hero_btn_primary_3: "Education Programs",
    hero_btn_secondary_3: "Donate Now",

    // Impact Stats
    stat_lives_label: "Lives Transformed",
    stat_lives_sub: "Across 64 districts in Bangladesh",
    stat_districts_label: "Districts Covered",
    stat_districts_sub: "Active field presence",
    stat_leaders_label: "Community Leaders",
    stat_leaders_sub: "Empowered grassroot champions",
    stat_legacy_label: "Legacy Years",
    stat_legacy_sub: "Established in 1977",

    // Programs Section
    focus_badge: "Our Focus",
    focus_title: "Social Program",
    focus_highlight: "Pillars.",
    focus_subtitle: "Addressing the most critical needs of rural and marginalized communities through integrated development approaches.",
    explore_program: "Explore Program",

    prog_edu_title: "Non-Formal Education",
    prog_edu_desc: "Providing innovative learning models, early childhood development, and adult literacy for marginalized children and communities.",
    
    prog_wash_title: "Health & WaSH",
    prog_wash_desc: "Pioneering Community-Led Total Sanitation (CLTS) globally and delivering arsenic-safe drinking water and hospital care.",
    
    prog_live_title: "Livelihood & Empowerment",
    prog_live_desc: "Building resilient futures through vocational training, women's empowerment, and agro-based income generation.",
    
    prog_cap_title: "Capacity Building & Training",
    prog_cap_desc: "Strengthening local institutions, local government bodies, and youth leadership through training and research.",

    // SDG Section
    sdg_badge: "Global Agenda 2030",
    sdg_title: "Achieving the",
    sdg_highlight: "SDGs.",
    sdg_subtitle: "VERC is strongly committed to contributing to achieving the Sustainable Development Goals (SDGs) by 2030 through our high-impact core programs.",

    // Global Collaboration
    global_badge: "Global Collaborations",
    global_title: "Partnering for",
    global_highlight: "Global Impact.",
    global_subtitle: "VERC works alongside international agencies like UNICEF and World Bank to implement life-changing infrastructure. Field visits from Goodwill Ambassadors highlight the success of our Community-Led models in providing safe water to marginalized families.",
    global_btn: "Our Partners & Donors",
    spotlight_badge: "Field Visit Spotlight",
    spotlight_title: "Community sanitation observation and piped water network inauguration.",

    // Success Story
    success_badge: "Community Success",
    success_title: "Empowering",
    success_highlight: "Future Generations.",
    success_quote: "\"VERC has always been focusing on strategies its course of action based on Strategic Planning. We nurture expansive patterns of thinking to set collective aspiration free.\"",
    success_btn: "View Impact Results",

    // CTA Section
    cta_title: "Be the",
    cta_highlight: "Change.",
    cta_subtitle: "Support VERC in building a self-reliant and enlightened society based on justice, equity and sustainability.",
    cta_btn_donate: "Support Our Work",
    cta_btn_partner: "Become a Partner",

    // Footer
    footer_tagline: "Village Education Resource Center (VERC) is a leading non-governmental development organization in Bangladesh, pioneering CLTS and Non-Formal Education since 1977.",
    footer_quick_links: "Quick Links",
    footer_programs: "Core Programs",
    footer_headquarters: "Headquarters",
    footer_rights: "All Rights Reserved. Village Education Resource Center (VERC)."
  },
  bn: {
    // Navigation
    nav_home: "হোম",
    nav_about: "আমাদের সম্পর্কে",
    nav_vision: "ভিশন ও মিশন",
    nav_leadership: "গভর্ন্যান্স ও নেতৃত্ব",
    nav_staff: "সিনিয়র কর্মকর্তা বৃন্দ",
    nav_awards: "আমাদের অর্জন ও পুরস্কার",
    nav_programs: "সামাজিক কর্মসূচি",
    nav_education: "অনানুষ্ঠানিক শিক্ষা",
    nav_wash: "স্বাস্থ্য, পানি ও স্যানিটেশন (WASH)",
    nav_livelihood: "জীবিকা ও ক্ষমতায়ন",
    nav_capacity: "ক্ষমতায়ন ও প্রশিক্ষণ",
    nav_microfinance: "মাইক্রোফাইন্যান্স",
    nav_mf_about: "মাইক্রোফাইন্যান্স পরিচিতি",
    nav_mf_products: "ঋণ ও সঞ্চয় প্রকল্প",
    nav_mf_process: "আবেদন ও যোগ্যতা",
    nav_impact: "প্রভাব ও অংশীদার",
    nav_impact_results: "আমাদের প্রভাব ও ফলাফল",
    nav_partners: "উন্নয়ন অংশীদারগণ",
    nav_resources: "সম্পদ ও যোগাযোগ",
    nav_gallery: "ফটো ও ভিডিও গ্যালারি",
    nav_branches: "শাখা নেটওয়ার্ক",
    nav_contact: "যোগাযোগ",
    nav_admin: "এডমিন স্টুডিও",
    nav_donate: "দান করুন",

    // Hero Section
    hero_title_1: "ভবিষ্যৎ বিনির্মাণ ও",
    hero_highlight_1: "সামাজিক উন্নয়ন।",
    hero_subtitle_1: "১৯৭৭ সাল থেকে টেকসই উদ্ভাবন ও জনঅংশগ্রহণের মাধ্যমে প্রান্তিক জনগোষ্ঠীর ক্ষমতায়নে নিবেদিত।",
    hero_btn_primary_1: "আমাদের গল্প",
    hero_btn_secondary_1: "অংশীদার হন",

    hero_title_2: "কমিউনিটি স্যানিটেশন ও",
    hero_highlight_2: "নিরাপদ পানি সরবরাহ।",
    hero_subtitle_2: "বিশ্বজুড়ে সিএলটিএস স্যানিটেশন বিপ্লবের রূপকার, লক্ষ লক্ষ মানুষের জন্য স্বাস্থ্যসম্মত ও নিরাপদ পরিবেশ নিশ্চিতকরণ।",
    hero_btn_primary_2: "ওয়াশ কর্মসূচি দেখুন",
    hero_btn_secondary_2: "বার্ষিক প্রতিবেদন",

    hero_title_3: "অনানুষ্ঠানিক শিক্ষার",
    hero_highlight_3: "মাধ্যমে আলো ছড়ানো।",
    hero_subtitle_3: "বাংলাদেশ জুড়ে প্রাথমিক শিক্ষা, শিশু বিকাশ কেন্দ্র এবং বয়স্ক শিক্ষা কর্মসূচি পরিচালনা।",
    hero_btn_primary_3: "শিক্ষা কর্মসূচি",
    hero_btn_secondary_3: "সহায়তা করুন",

    // Impact Stats
    stat_lives_label: "জীবন রূপান্তরিত",
    stat_lives_sub: "বাংলাদেশের ৬৪টি জেলা জুড়ে",
    stat_districts_label: "জেলা কভারেজ",
    stat_districts_sub: "তৃণমূল মাঠপর্যায়ে কাজের বিস্তার",
    stat_leaders_label: "কমিউনিটি লিডার",
    stat_leaders_sub: "ক্ষমতায়িত গ্রামীণ চ্যাম্পিয়ন",
    stat_legacy_label: "গৌরবময় ইতিহাস",
    stat_legacy_sub: "১৯৭৭ সালে প্রতিষ্ঠিত",

    // Programs Section
    focus_badge: "আমাদের লক্ষ্য ও ক্ষেত্র",
    focus_title: "সামাজিক উন্নয়ন",
    focus_highlight: "কর্মসূচিসমূহ।",
    focus_subtitle: "সমন্বিত উন্নয়ন পদ্ধতির মাধ্যমে গ্রামীণ ও সুবিধাবঞ্চিত মানুষের মৌলিক চাহিদা পূরণ।",
    explore_program: "বিস্তারিত দেখুন",

    prog_edu_title: "অনানুষ্ঠানিক শিক্ষা (NFE)",
    prog_edu_desc: "শিশু বিকাশ কেন্দ্র, বয়স্ক শিক্ষা এবং প্রান্তিক শিশুদের জন্য মানসম্মত প্রাথমিক অনানুষ্ঠানিক শিক্ষা প্রদান।",
    
    prog_wash_title: "স্বাস্থ্য ও ওয়াশ (CLTS)",
    prog_wash_desc: "কমিউনিটি চালিত স্যানিটেশনে (CLTS) বিশ্বে অগ্রণী ভূমিকা এবং আর্সেনিকমুক্ত নিরাপদ পানি ও হাসপাতালে সেবা প্রদান।",
    
    prog_live_title: "জীবিকা ও ক্ষমতায়ন",
    prog_live_desc: "কারিগরি প্রশিক্ষণ, নারী উদ্যোক্তা সৃষ্টি এবং কৃষিভিত্তিক আয়ের মাধ্যমে স্থায়ী স্বনির্ভরতা অর্জন।",
    
    prog_cap_title: "ক্ষমতায়ন ও প্রশিক্ষণ",
    prog_cap_desc: "স্থানীয় সরকার, সমাজভিত্তিক সংগঠন এবং যুব নেতৃত্বকে প্রশিক্ষণের মাধ্যমে শক্তিশালীকরণ।",

    // SDG Section
    sdg_badge: "গ্লোবাল এজেন্ডা ২০৩০",
    sdg_title: "এসডিজি অর্জনে",
    sdg_highlight: "আমাদের অঙ্গীকার।",
    sdg_subtitle: "ভার্ক উচ্চ-প্রভাবশালী সামাজিক কর্মসূচির মাধ্যমে ২০৩০ সালের মধ্যে টেকসই উন্নয়ন লক্ষ্যমাত্রা (SDGs) অর্জনে দৃঢ়ভাবে কাজ করছে।",

    // Global Collaboration
    global_badge: "আন্তর্জাতিক অংশীদারিত্ব",
    global_title: "বৈশ্বিক প্রভাবে",
    global_highlight: "কৌশলগত ঐক্য।",
    global_subtitle: "ভার্ক ইউনিসেফ এবং বিশ্বব্যাংকের মতো আন্তর্জাতিক উন্নয়ন সংস্থার সাথে একযোগে জীবনরক্ষাকারী অবকাঠামো গড়ে তুলছে।",
    global_btn: "আমাদের উন্নয়ন অংশীদারগণ",
    spotlight_badge: "মাঠপর্যায় পরিদর্শন",
    spotlight_title: "কমিউনিটি স্যানিটেশন পর্যবেক্ষণ এবং পাইপলাইনের মাধ্যমে নিরাপদ পানি প্রকল্প উদ্বোধন।",

    // Success Story
    success_badge: "সফলতার গল্প",
    success_title: "ভবিষ্যৎ প্রজন্মকে",
    success_highlight: "ক্ষমতায়ন।",
    success_quote: "\"ভার্ক সর্বদা কৌশলগত পরিকল্পনার ভিত্তিতে উন্নয়ন পদক্ষেপ নির্ধারণ করে। আমরা যৌথ অগ্রগতি অর্জনে উদ্ভাবনী চিন্তাকে উৎসাহিত করি।\"",
    success_btn: "ফলাফল ও প্রভাব দেখুন",

    // CTA Section
    cta_title: "পরিবর্তনের",
    cta_highlight: "অংশীদার হন।",
    cta_subtitle: "ন্যায়বিচার, সাম্য এবং স্থায়িত্বের ভিত্তিতে স্বনির্ভর ও আলোকিত সমাজ গঠনে ভার্কের পাশে দাঁড়ান।",
    cta_btn_donate: "আমাদের কাজে সহায়তা করুন",
    cta_btn_partner: "অংশীদার হন",

    // Footer
    footer_tagline: "ভিলেজ এডুকেশন রিসোর্স সেন্টার (ভার্ক) বাংলাদেশে অনানুষ্ঠানিক শিক্ষা ও সিএলটিএস স্যানিটেশন বিপ্লবের অগ্রগামী বেসরকারি উন্নয়ন সংস্থা।",
    footer_quick_links: "দ্রুত লিঙ্ক",
    footer_programs: "প্রধান কর্মসূচি",
    footer_headquarters: "প্রধান কার্যালয়",
    footer_rights: "সর্বস্বত্ব সংরক্ষিত। ভিলেজ এডুকেশন রিসোর্স সেন্টার (ভার্ক)।"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("vercbd_language");
      if (stored === "en" || stored === "bn") {
        setLanguage(stored as Language);
      }
    } catch (e) {
      console.warn("Could not load language from localStorage", e);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem("vercbd_language", lang);
    } catch (e) {
      console.warn("Could not save language to localStorage", e);
    }
  };

  const toggleLanguage = () => {
    changeLanguage(language === "en" ? "bn" : "en");
  };

  const t = (key: string): string => {
    return translations[language][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
