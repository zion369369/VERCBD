"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface HeroSlide {
  id: string;
  title: string;
  highlightText: string;
  subtitle: string;
  imageUrl: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
}

export interface ImpactStat {
  id: string;
  key: string;
  label: string;
  value: string;
  subText?: string;
  category?: string;
  iconName?: string;
}

export interface ProgramItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  imageUrl: string;
  features: string[];
  reach: string;
  status: "Active" | "Review" | "Draft";
  color?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string;
  imageUrl: string;
  date: string;
  author: string;
  status: "Published" | "Draft";
}

export interface SuccessStory {
  id: string;
  title: string;
  slug: string;
  beneficiaryName: string;
  location: string;
  story: string;
  imageUrl: string;
  date: string;
}

export interface MicrofinanceProduct {
  id: string;
  title: string;
  category: string;
  loanLimit: string;
  interestRate: string;
  tenure: string;
  description: string;
  eligibility: string[];
  imageUrl?: string;
  features: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  department: string;
  bio: string;
  imageUrl: string;
  phone?: string;
}

export interface PartnerItem {
  id: string;
  name: string;
  category: "Government" | "UN Agencies" | "International NGO" | "Corporate & Others";
  logoUrl: string;
  websiteUrl: string;
  description?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Education" | "WASH" | "Livelihood" | "Health" | "Events" | "All";
  imageUrl: string;
  description?: string;
  date: string;
}

export interface BranchOffice {
  id: string;
  name: string;
  district: string;
  division: string;
  address: string;
  phone: string;
  email: string;
  manager: string;
  lat?: number;
  lng?: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  date: string;
  status: "Unread" | "Read" | "Replied";
}

export interface Subscriber {
  id: string;
  email: string;
  joinedDate: string;
  status: "Active" | "Pending" | "Unsubscribed";
}

export interface DonationRecord {
  id: string;
  donorName: string;
  donorType: "Individual" | "Institutional Grant" | "Corporate CSR" | "Philanthropy";
  amount: number;
  currency: "BDT" | "USD" | "EUR" | "GBP";
  program: "WaSH & Clean Water" | "Child Education" | "Mother & Child Health" | "Emergency Flood Relief" | "Microfinance Capital" | "General Humanitarian Fund";
  date: string;
  paymentMethod: "Direct Wire / Swift" | "Bank Transfer" | "bKash / Nagad" | "Credit Card" | "Institutional Grant Agreement";
  receiptNumber: string;
  status: "Completed" | "Pledged" | "Processing" | "Allocated";
  notes?: string;
  donorEmail?: string;
}

export interface CharityCampaign {
  id: string;
  title: string;
  thematicArea: "Disaster Relief" | "Arsenic Safe Water" | "Winter Warmth" | "Child School Kit" | "Maternal Care";
  targetAmount: string;
  raisedAmount: string;
  beneficiariesTarget: string;
  status: "Active" | "Urgent" | "Completed" | "Planned";
  deadline: string;
  location: string;
  imageUrl: string;
  progress: number;
}

export interface SiteSettings {
  siteTitle: string;
  tagline: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  email: string;
  supportEmail: string;
  phone: string;
  hotline: string;
  address: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  totalDonationAmount: string;
  donorsCount: number;
  registrationNumber?: string;
  ngoAffairsBureauReg?: string;
}

export interface CharityDashboardMetric {
  beneficiaries: { value: string; label: string; period: string; percentage: number };
  donationsMobilized: { value: string; label: string; period: string; percentage: number };
  activePrograms: { value: number; label: string; period: string; percentage: number };
  microfinanceMembers: { value: string; label: string; period: string; percentage: number };
  topFundedProgram: {
    title: string;
    beneficiaries: string;
    fundsAllocated: string;
    imageUrl: string;
    leadPartner: string;
  };
  thematicDistribution: Array<{
    thematicArea: string;
    percentage: number;
    color: string;
  }>;
  financialFlowData: Array<{
    month: string;
    grantsInflow: number; // in Lakh BDT
    programExpenses: number; // in Lakh BDT
  }>;
}

interface ContentContextType {
  heroSlides: HeroSlide[];
  impactStats: ImpactStat[];
  programs: ProgramItem[];
  news: NewsItem[];
  stories: SuccessStory[];
  microfinanceProducts: MicrofinanceProduct[];
  teamMembers: TeamMember[];
  partners: PartnerItem[];
  gallery: GalleryItem[];
  branches: BranchOffice[];
  messages: ContactMessage[];
  subscribers: Subscriber[];
  donations: DonationRecord[];
  campaigns: CharityCampaign[];
  siteSettings: SiteSettings;
  dashboardMetrics: CharityDashboardMetric;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  
  // CRUD Operations
  addHeroSlide: (slide: Omit<HeroSlide, "id">) => void;
  updateHeroSlide: (id: string, slide: Partial<HeroSlide>) => void;
  deleteHeroSlide: (id: string) => void;

  updateImpactStat: (id: string, stat: Partial<ImpactStat>) => void;
  addImpactStat: (stat: Omit<ImpactStat, "id">) => void;
  deleteImpactStat: (id: string) => void;

  addProgram: (program: Omit<ProgramItem, "id">) => void;
  updateProgram: (id: string, program: Partial<ProgramItem>) => void;
  deleteProgram: (id: string) => void;

  addNews: (item: Omit<NewsItem, "id">) => void;
  updateNews: (id: string, item: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;

  addStory: (story: Omit<SuccessStory, "id">) => void;
  updateStory: (id: string, story: Partial<SuccessStory>) => void;
  deleteStory: (id: string) => void;

  addMicrofinanceProduct: (product: Omit<MicrofinanceProduct, "id">) => void;
  updateMicrofinanceProduct: (id: string, product: Partial<MicrofinanceProduct>) => void;
  deleteMicrofinanceProduct: (id: string) => void;

  addTeamMember: (member: Omit<TeamMember, "id">) => void;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;

  addPartner: (partner: Omit<PartnerItem, "id">) => void;
  updatePartner: (id: string, partner: Partial<PartnerItem>) => void;
  deletePartner: (id: string) => void;

  addGalleryItem: (item: Omit<GalleryItem, "id">) => void;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;

  addBranch: (branch: Omit<BranchOffice, "id">) => void;
  updateBranch: (id: string, branch: Partial<BranchOffice>) => void;
  deleteBranch: (id: string) => void;

  addMessage: (msg: Omit<ContactMessage, "id" | "date" | "status">) => void;
  updateMessageStatus: (id: string, status: ContactMessage["status"]) => void;
  deleteMessage: (id: string) => void;

  addSubscriber: (email: string) => void;
  deleteSubscriber: (id: string) => void;

  addDonation: (donation: Omit<DonationRecord, "id">) => void;
  updateDonation: (id: string, donation: Partial<DonationRecord>) => void;
  deleteDonation: (id: string) => void;

  addCampaign: (campaign: Omit<CharityCampaign, "id">) => void;
  updateCampaign: (id: string, campaign: Partial<CharityCampaign>) => void;
  deleteCampaign: (id: string) => void;

  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  updateDashboardMetrics: (metrics: Partial<CharityDashboardMetric>) => void;
  resetToDefaults: () => void;
}

const defaultHeroSlides: HeroSlide[] = [
  {
    id: "hero-1",
    title: "Transforming",
    highlightText: "Destinies.",
    subtitle: "Dedicated to empowering marginalized communities through sustainable innovation and participatory development since 1977.",
    imageUrl: "/assets/home_official_1.jpg",
    primaryBtnText: "Our Story",
    primaryBtnLink: "/about",
    secondaryBtnText: "Partner with Us",
    secondaryBtnLink: "/contact"
  },
  {
    id: "hero-2",
    title: "Pioneering Community",
    highlightText: "Sanitation & Water.",
    subtitle: "Leading the global CLTS revolution, providing life-saving hygiene and clean water infrastructure to millions.",
    imageUrl: "/assets/wash_hero.png",
    primaryBtnText: "Explore WaSH",
    primaryBtnLink: "/programs/wash",
    secondaryBtnText: "Annual Reports",
    secondaryBtnLink: "/about"
  },
  {
    id: "hero-3",
    title: "Empowering Through",
    highlightText: "Non-Formal Education.",
    subtitle: "Creating innovative learning models, early childhood centers, and adult literacy programs across Bangladesh.",
    imageUrl: "/assets/edu_1.png",
    primaryBtnText: "Education Programs",
    primaryBtnLink: "/programs/education",
    secondaryBtnText: "Donate Now",
    secondaryBtnLink: "/donate"
  }
];

const defaultImpactStats: ImpactStat[] = [
  { id: "stat-1", key: "lives", label: "Lives Transformed", value: "5.2M+", subText: "Across 31 districts & 106 upazilas", category: "General", iconName: "Users" },
  { id: "stat-2", key: "districts", label: "Districts Covered", value: "31", subText: "Active field presence in 106 upazilas", category: "General", iconName: "Globe" },
  { id: "stat-3", key: "leaders", label: "Community Champions", value: "12,500+", subText: "Empowered grassroot sanitation leaders", category: "General", iconName: "UserCheck" },
  { id: "stat-4", key: "legacy", label: "Years of Service", value: "48+", subText: "Founded in 1977", category: "General", iconName: "History" },
  { id: "stat-5", key: "branches", label: "Field Branch Offices", value: "136", subText: "Grassroot service delivery hubs", category: "Microfinance", iconName: "MapPin" },
  { id: "stat-6", key: "microfinance_amt", label: "Community Credit Disbursed", value: "৳ 6.8B+", subText: "99.10% cumulative recovery rate", category: "Microfinance", iconName: "Banknote" },
  { id: "stat-7", key: "learning_centers", label: "Active Learning Centers", value: "300+", subText: "Community-run schools for children", category: "Education", iconName: "BookOpen" },
  { id: "stat-8", key: "students", label: "Stipend Beneficiaries", value: "14,800+", subText: "Marginalized children & youth supported", category: "Education", iconName: "GraduationCap" },
  { id: "stat-9", key: "rohingya", label: "Humanitarian Relief", value: "Camp 8W", subText: "Emergency WaSH & child protection hub", category: "Emergency", iconName: "HeartHandshake" }
];

const defaultPrograms: ProgramItem[] = [
  {
    id: "prog-1",
    title: "Non-Formal Education",
    slug: "education",
    category: "Education",
    description: "Providing innovative learning models, early childhood development, and adult literacy for marginalized children and communities.",
    imageUrl: "/assets/edu_1.png",
    features: [
      "Early Childhood Development (ECD) Centers",
      "Non-Formal Primary Education (NFPE)",
      "Adult & Adolescent Literacy Groups",
      "Community School Management Models"
    ],
    reach: "450K+ Children",
    status: "Active",
    color: "bg-blue-50"
  },
  {
    id: "prog-2",
    title: "Water, Sanitation & Hygiene (WaSH)",
    slug: "wash",
    category: "Health & WASH",
    description: "Pioneering Community-Led Total Sanitation (CLTS) globally and delivering arsenic-safe drinking water and hospital care.",
    imageUrl: "/assets/wash_hero.png",
    features: [
      "Community Led Total Sanitation (CLTS)",
      "Piped Water Networks & Deep Tube Wells",
      "Mother & Child Specialized Hospitals",
      "Arsenic Mitigation & Water Quality Testing"
    ],
    reach: "2.8M+ People",
    status: "Active",
    color: "bg-emerald-50"
  },
  {
    id: "prog-3",
    title: "Health & Nutrition",
    slug: "health",
    category: "Health",
    description: "Delivering affordable maternal, newborn, and primary healthcare through community clinics and hospitals in Savar and Mirsarai.",
    imageUrl: "/assets/health_hero.png",
    features: [
      "Savar & Mirsarai Mother & Child Hospitals",
      "Mobile Healthcare Camps for Remote Villages",
      "Nutritional Counseling for Pregnant Mothers",
      "Emergency Ambulance & Diagnostic Services"
    ],
    reach: "680K+ Patients",
    status: "Active",
    color: "bg-rose-50"
  },
  {
    id: "prog-4",
    title: "Microfinance & Livelihoods",
    slug: "microfinance",
    category: "Economic Development",
    description: "Empowering rural women and ultra-poor families through inclusive financial services, livestock training, and entrepreneurship capital.",
    imageUrl: "/assets/microfinance_woman_hero.png",
    features: [
      "Jagoron Rural Micro-Enterprise Loans",
      "Buniad Ultra-Poor Livelihood Grant Linkage",
      "WaterCredit Household Sanitation Financing",
      "Seasonal Agro-Harvest Credit (Sufolon)"
    ],
    reach: "112,437 Active Members",
    status: "Active",
    color: "bg-amber-50"
  },
  {
    id: "prog-5",
    title: "Climate Change & Disaster Relief",
    slug: "climate-disaster",
    category: "Emergency & Climate",
    description: "Building community resilience against seasonal monsoons, cyclones, and climate shocks with rapid emergency relief and disaster preparedness.",
    imageUrl: "/assets/impact_hero.png",
    features: [
      "Rapid Monsoon & Flood Relief Response",
      "Cyclone-Resilient Community Infrastructure",
      "Climate-Adaptive Floating Agriculture",
      "Emergency Safe Water Purification Kits"
    ],
    reach: "320K+ Affected Families",
    status: "Active",
    color: "bg-teal-50"
  }
];

const defaultNews: NewsItem[] = [
  {
    id: "news-1",
    title: "UNICEF Goodwill Ambassador Orlando Bloom Visits VERC Pipe Water Project",
    slug: "orlando-bloom-unicef-visit",
    category: "Global Partnership",
    summary: "Orlando Bloom inspected VERC's innovative piped water supply network, witnessing first-hand how sustainable clean water transforms coastal communities.",
    content: "During his high-profile field mission in Bangladesh, UNICEF Goodwill Ambassador Orlando Bloom visited VERC's community-managed Pipe Water Network project. He engaged directly with women water committees and praised VERC's four-decade leadership in eradicating waterborne diseases.",
    imageUrl: "/assets/home_official_1.jpg",
    date: "2024-04-15",
    author: "VERC Communications Team",
    status: "Published"
  },
  {
    id: "news-2",
    title: "VERC Awarded National Recognition for Pioneering CLTS in South Asia",
    slug: "national-sanitation-award",
    category: "Milestone",
    summary: "Recognized for introducing the Community-Led Total Sanitation approach in 2000, now replicated in over 60 countries globally.",
    content: "At the National Sanitation Convention in Dhaka, government officials and international delegates celebrated VERC's seminal role in inventing CLTS in Rajshahi. The model has enabled millions to access dignity, safe latrines, and improved hygiene standards.",
    imageUrl: "/assets/wash_hero.png",
    date: "2024-03-22",
    author: "Advocacy & Policy Wing",
    status: "Published"
  },
  {
    id: "news-3",
    title: "Emergency Flood Relief Distributed Across 12,000 Sylhet Households",
    slug: "sylhet-flood-relief-distribution",
    category: "Emergency Relief",
    summary: "Emergency response teams delivered safe drinking water, dry food packs, and medical hygiene kits to flood-inundated families.",
    content: "VERC field workers mobilized emergency relief trucks across Sunamganj and Sylhet sadar upazilas, distributing water purification tablets, ORS, dry food rations, and temporary emergency shelter tarpaulins to thousands of stranded villagers.",
    imageUrl: "/assets/impact_hero.png",
    date: "2024-02-18",
    author: "Disaster Management Unit",
    status: "Published"
  }
];

const defaultStories: SuccessStory[] = [
  {
    id: "story-1",
    title: "Nilima's Journey to Financial Independence",
    slug: "nilima-journey",
    beneficiaryName: "Nilima Begum",
    location: "Kaliakoir, Gazipur",
    story: "Married at a young age to a visually impaired laborer, Nilima faced acute poverty. Through VERC's microfinance training and a Jagoron enterprise loan, she started an organic poultry farm. Today she employs 3 women and funds her children's schooling.",
    imageUrl: "/assets/microfinance_woman_hero.png",
    date: "2024-03-10"
  },
  {
    id: "story-2",
    title: "Defeating Arsenic: Safe Water for Monoharganj",
    slug: "defeating-arsenic",
    beneficiaryName: "Faruk Hossain & Community",
    location: "Monoharganj, Cumilla",
    story: "After developing severe arsenic skin lesions in 2005, Faruk thought his village was doomed. VERC installed deep community tube wells and trained local youth in water testing. The village is now completely arsenic-safe.",
    imageUrl: "/assets/wash_hero.png",
    date: "2024-02-14"
  },
  {
    id: "story-3",
    title: "First-Generation Graduate: Sumaiya's Dream",
    slug: "sumaiya-first-graduate",
    beneficiaryName: "Sumaiya Akter",
    location: "Savar, Dhaka",
    story: "Starting her education at a VERC non-formal learning center in 2012, Sumaiya received secondary stipends and mentoring. She recently completed her Bachelor of Education and is now a certified teacher.",
    imageUrl: "/assets/edu_1.png",
    date: "2024-01-25"
  }
];

const defaultDonations: DonationRecord[] = [
  {
    id: "don-1",
    donorName: "UNICEF Bangladesh",
    donorType: "Institutional Grant",
    amount: 12500000,
    currency: "BDT",
    program: "WaSH & Clean Water",
    date: "2024-04-18",
    paymentMethod: "Institutional Grant Agreement",
    receiptNumber: "GRANT-2024-088",
    status: "Allocated",
    notes: "Phase 3 Coastal Belt Piped Water Network Project",
    donorEmail: "dhaka.wash@unicef.org"
  },
  {
    id: "don-2",
    donorName: "Water.org Tranche II",
    donorType: "Institutional Grant",
    amount: 8500000,
    currency: "BDT",
    program: "WaSH & Clean Water",
    date: "2024-04-12",
    paymentMethod: "Direct Wire / Swift",
    receiptNumber: "GRANT-2024-089",
    status: "Completed",
    notes: "WaterCredit household sanitation loans revolving subsidy fund",
    donorEmail: "grants@water.org"
  },
  {
    id: "don-3",
    donorName: "Standard Chartered Bank CSR",
    donorType: "Corporate CSR",
    amount: 3500000,
    currency: "BDT",
    program: "Mother & Child Health",
    date: "2024-04-05",
    paymentMethod: "Bank Transfer",
    receiptNumber: "CSR-2024-014",
    status: "Completed",
    notes: "Savar Mother & Child Hospital ultrasound & neonatal incubator gear",
    donorEmail: "csr.bangladesh@sc.com"
  },
  {
    id: "don-4",
    donorName: "PKSF Social Safety Grant",
    donorType: "Institutional Grant",
    amount: 45000000,
    currency: "BDT",
    program: "Microfinance Capital",
    date: "2024-03-28",
    paymentMethod: "Direct Wire / Swift",
    receiptNumber: "PKSF-2024-Q1",
    status: "Allocated",
    notes: "Buniad Ultra-Poor sustainable livelihood grant & asset transfer",
    donorEmail: "operations@pksf.org.bd"
  },
  {
    id: "don-5",
    donorName: "Dr. Anisur Rahman & Family",
    donorType: "Individual",
    amount: 500000,
    currency: "BDT",
    program: "Child Education",
    date: "2024-03-15",
    paymentMethod: "bKash / Nagad",
    receiptNumber: "DON-2024-512",
    status: "Completed",
    notes: "Higher secondary scholarship for 20 underprivileged rural girls",
    donorEmail: "anisur.rahman.dr@gmail.com"
  },
  {
    id: "don-6",
    donorName: "GlobalGiving Flood Relief Pool",
    donorType: "Philanthropy",
    amount: 1800000,
    currency: "BDT",
    program: "Emergency Flood Relief",
    date: "2024-02-20",
    paymentMethod: "Direct Wire / Swift",
    receiptNumber: "GG-2024-901",
    status: "Completed",
    notes: "Sunamganj Emergency Flash Flood dry food and clean water supply",
    donorEmail: "relief@globalgiving.org"
  }
];

const defaultCampaigns: CharityCampaign[] = [
  {
    id: "camp-1",
    title: "Emergency Flood & Monsoon Relief 2024",
    thematicArea: "Disaster Relief",
    targetAmount: "৳ 25,00,000",
    raisedAmount: "৳ 18,50,000",
    beneficiariesTarget: "15,000 Households",
    status: "Urgent",
    deadline: "2024-06-30",
    location: "Sylhet, Sunamganj & Feni",
    imageUrl: "/assets/impact_hero.png",
    progress: 74
  },
  {
    id: "camp-2",
    title: "Arsenic-Free Deep Wells for 50 Remote Villages",
    thematicArea: "Arsenic Safe Water",
    targetAmount: "৳ 40,00,000",
    raisedAmount: "৳ 32,00,000",
    beneficiariesTarget: "45,000 Villagers",
    status: "Active",
    deadline: "2024-08-15",
    location: "Cumilla, Noakhali & Chandpur",
    imageUrl: "/assets/wash_hero.png",
    progress: 80
  },
  {
    id: "camp-3",
    title: "School Bags & Joyful Learning Kits for 5,000 Children",
    thematicArea: "Child School Kit",
    targetAmount: "৳ 15,00,000",
    raisedAmount: "৳ 12,40,000",
    beneficiariesTarget: "5,000 Rural Students",
    status: "Active",
    deadline: "2024-05-31",
    location: "Savar & Rangpur",
    imageUrl: "/assets/edu_1.png",
    progress: 82
  },
  {
    id: "camp-4",
    title: "Maternal & Newborn Intensive Care Equipment",
    thematicArea: "Maternal Care",
    targetAmount: "৳ 30,00,000",
    raisedAmount: "৳ 21,00,000",
    beneficiariesTarget: "8,000 Mothers & Infants",
    status: "Active",
    deadline: "2024-07-30",
    location: "Savar & Mirsarai Hospitals",
    imageUrl: "/assets/home_official_1.jpg",
    progress: 70
  }
];

const defaultMicrofinanceProducts: MicrofinanceProduct[] = [
  {
    id: "mf-1",
    title: "Jagoron (Rural Enterprise Loan)",
    category: "Microcredit",
    loanLimit: "Tk. 10,000 – 1,00,000",
    interestRate: "24% Declining (MRA Standard)",
    tenure: "12 Months (Weekly / Monthly)",
    description: "Provides collateral-free working capital for rural smallholder trades, livestock rearing, handicrafts, and village shops.",
    eligibility: ["Active rural women aged 18-55", "Permanent village resident", "Member of VERC grassroots samity"],
    features: ["No physical collateral required", "Doorstep repayment collection", "Free health insurance link"],
    imageUrl: "/assets/microfinance_woman_hero.png"
  },
  {
    id: "mf-2",
    title: "Agrosor (Micro-Enterprise Loan)",
    category: "Enterprise",
    loanLimit: "Tk. 1,00,000 – 10,00,000",
    interestRate: "24% Declining",
    tenure: "12 – 24 Months",
    description: "Designed for expanding enterprises, agro-processing units, poultry farms, and small manufacturing businesses.",
    eligibility: ["2+ years verified trade history", "Viable business cash flow", "Physical business premises"],
    features: ["Higher loan ceilings", "Flexible monthly installments", "Business mentorship and accounting support"],
    imageUrl: "/assets/microfinance_hero.png"
  },
  {
    id: "mf-3",
    title: "Buniad (Ultra-Poor Social Safety Program)",
    category: "Social Protection",
    loanLimit: "Tk. 5,000 – 30,000",
    interestRate: "Highly Subsidized / Special",
    tenure: "12 – 18 Months Flexible",
    description: "Targeted livelihood financing and grant linkages for extreme poverty, female-headed households, and disabled individuals.",
    eligibility: ["Landless or asset-poor families", "Daily wage earner or destitute household"],
    features: ["Zero processing fee", "Direct asset transfer linkage", "Free emergency healthcare vouchers"],
    imageUrl: "/assets/impact_hero.png"
  },
  {
    id: "mf-4",
    title: "WaterCredit (Sanitation & Water Loan)",
    category: "WaSH Finance",
    loanLimit: "Tk. 10,000 – 50,000",
    interestRate: "Subsidized WaSH Rate",
    tenure: "12 Months",
    description: "Affordable financing enabling low-income families to construct hygienic sanitary latrines and install deep water tube wells.",
    eligibility: ["Rural & peri-urban households lacking safe sanitation", "VERC community group member"],
    features: ["Technical construction guidance", "Quality materials support", "Family health improvement"],
    imageUrl: "/assets/wash_hero.png"
  }
];

const defaultTeamMembers: TeamMember[] = [
  {
    id: "team-1",
    name: "Md. Yakub Hossain",
    role: "Executive Director",
    email: "yakub@vercbd.org",
    department: "Executive Leadership",
    bio: "Steering VERC's strategic humanitarian roadmap, global partnerships, and community empowerment models since decades.",
    imageUrl: "/assets/education_official.jpg",
    phone: "+880 2 7745041"
  },
  {
    id: "team-2",
    name: "Md. Masud Hassan",
    role: "Deputy Executive Director",
    email: "masudhassan@vercbd.org",
    department: "Operations & Governance",
    bio: "Overseeing nationwide field programs, institutional capacity building, and international donor compliance.",
    imageUrl: "/assets/education_official_2.jpg",
    phone: "+880 2 7745042"
  },
  {
    id: "team-3",
    name: "Ranada Prasad Saha",
    role: "Director, Microfinance & Climate Adaptation",
    email: "ranada@vercbd.org",
    department: "Microfinance",
    bio: "Managing 136 branch operations and climate adaptation funds empowering over 112,000 active grassroots members.",
    imageUrl: "/assets/about_official.jpg",
    phone: "+880 2 7745043"
  },
  {
    id: "team-4",
    name: "Mustafizur Rashid Mridha",
    role: "Director, HR & Administration",
    email: "mrashid@vercbd.org",
    department: "Administration",
    bio: "Directing organizational human resources, staff welfare, field logistics, and institutional governance.",
    imageUrl: "/assets/education_1.jpg",
    phone: "+880 2 7745044"
  },
  {
    id: "team-5",
    name: "Md. Masud Royhan",
    role: "Director, Finance & Accounts",
    email: "royhan@vercbd.org",
    department: "Finance & Audit",
    bio: "Ensuring top-tier fiscal integrity, external statutory audits, and transparent donor grant reporting.",
    imageUrl: "/assets/education_2.jpg",
    phone: "+880 2 7745045"
  }
];

const defaultPartners: PartnerItem[] = [
  { id: "p-1", name: "Government of Bangladesh (GoB)", category: "Government", logoUrl: "/assets/gob_logo.png", websiteUrl: "https://bangladesh.gov.bd", description: "Ministry of Local Government, Rural Development and Cooperatives" },
  { id: "p-2", name: "PKSF (Palli Karma-Sahayak Foundation)", category: "Government", logoUrl: "/assets/pksf_logo.png", websiteUrl: "https://pksf.org.bd", description: "National apex development financing institution" },
  { id: "p-3", name: "Microcredit Regulatory Authority (MRA)", category: "Government", logoUrl: "/assets/mra_logo.png", websiteUrl: "https://mra.gov.bd", description: "Statutory microfinance regulator" },
  { id: "p-4", name: "UNICEF Bangladesh", category: "UN Agencies", logoUrl: "/assets/unicef_logo.png", websiteUrl: "https://unicef.org/bangladesh", description: "Global partnership in WaSH, CLTS, and child protection" },
  { id: "p-5", name: "Water.org", category: "International NGO", logoUrl: "/assets/wateraid_logo.png", websiteUrl: "https://water.org", description: "Pioneering WaterCredit market-based sanitation access" },
  { id: "p-6", name: "Save the Children", category: "International NGO", logoUrl: "/assets/savethechildren_logo.png", websiteUrl: "https://bangladesh.savethechildren.net", description: "Early childhood education and child rights" },
  { id: "p-7", name: "USAID", category: "International NGO", logoUrl: "/assets/usaid_logo.png", websiteUrl: "https://usaid.gov/bangladesh", description: "Health, nutrition, and food security programs" },
  { id: "p-8", name: "CARE Bangladesh", category: "International NGO", logoUrl: "/assets/care_logo.png", websiteUrl: "https://carebangladesh.org", description: "Community disaster risk reduction and livelihoods" }
];

const defaultGallery: GalleryItem[] = [
  { id: "gal-1", title: "Joyful Early Childhood Learning Session", category: "Education", imageUrl: "/assets/edu_1.png", description: "Children engaging in participatory numeracy and literacy games at Savar center.", date: "2024-03-15" },
  { id: "gal-2", title: "Community Total Sanitation Declaration", category: "WASH", imageUrl: "/assets/wash_hero.png", description: "Village leaders celebrating 100% open-defecation-free status in Rajshahi.", date: "2024-02-28" },
  { id: "gal-3", title: "Women Entrepreneurship Handicrafts Display", category: "Livelihood", imageUrl: "/assets/microfinance_woman_hero.png", description: "Organic crops and handloom products created by VERC microcredit beneficiaries.", date: "2024-01-20" },
  { id: "gal-4", title: "Orlando Bloom Inspects Piped Water Network", category: "Events", imageUrl: "/assets/home_official_1.jpg", description: "UNICEF goodwill ambassador assessing community water tap points.", date: "2024-04-02" },
  { id: "gal-5", title: "Mother & Child Specialized Medical Checkup", category: "Health", imageUrl: "/assets/health_hero.png", description: "Free antenatal care and infant immunization camp at Mirsarai Hospital.", date: "2024-02-12" },
  { id: "gal-6", title: "Arsenic-Free Deep Tubewell Commissioning", category: "WASH", imageUrl: "/assets/impact_hero.png", description: "Safe drinking water source inauguration serving 500 households.", date: "2024-03-08" }
];

const defaultBranches: BranchOffice[] = [
  { id: "br-1", name: "Savar Head Office & Training Institute", district: "Dhaka", division: "Dhaka", address: "B-30, Ekhlas Uddin Khan Road, Anandapur, Savar, Dhaka-1340", phone: "+880 2 7745041", email: "savar@vercbd.org", manager: "Md. Masud Hassan", lat: 23.8488, lng: 90.2585 },
  { id: "br-2", name: "Rajshahi Regional Operations Hub", district: "Rajshahi", division: "Rajshahi", address: "House 45, Terokhadia, Rajshahi Sadar", phone: "+880 721 771234", email: "rajshahi@vercbd.org", manager: "Shahadat Hossain", lat: 24.3745, lng: 88.6042 },
  { id: "br-3", name: "Chattogram & Mirsarai Center", district: "Chattogram", division: "Chattogram", address: "Mirsarai Hospital Road, Mirsarai, Chattogram", phone: "+880 31 654321", email: "ctg@vercbd.org", manager: "Kamrul Islam", lat: 22.7758, lng: 91.5746 },
  { id: "br-4", name: "Rangpur Field Operations Office", district: "Rangpur", division: "Rangpur", address: "Dhap Engineer Para, Rangpur City", phone: "+880 521 63980", email: "rangpur@vercbd.org", manager: "Aminul Islam", lat: 25.7439, lng: 89.2752 },
  { id: "br-5", name: "Cox's Bazar Humanitarian Response Hub", district: "Cox's Bazar", division: "Chattogram", address: "Kolatoli Road, Cox's Bazar", phone: "+880 341 62100", email: "coxsbazar@vercbd.org", manager: "Farzana Akter", lat: 21.4272, lng: 91.9846 }
];

const defaultMessages: ContactMessage[] = [
  { id: "msg-1", name: "Sarah Jenkins (UN Water)", email: "sarah.j@unwater.org", phone: "+1 415 890 1234", subject: "Partnership Inquiry: Scaling WaSH in Coastal Districts", message: "We are finalizing our 2024-2026 climate resilience grant allocations and would like to invite VERC to submit a full technical proposal for coastal piped water.", date: "2024-04-20 10:30 AM", status: "Unread" },
  { id: "msg-2", name: "Tariqul Islam (Donor)", email: "tariqul.dhaka@gmail.com", phone: "+880 1711 002233", subject: "Donation Confirmation & Tax Exemption Receipt", message: "I transferred Tk 50,000 for the child education stipend fund via bank transfer. Kindly email the official NGO tax exemption certificate.", date: "2024-04-18 04:15 PM", status: "Read" },
  { id: "msg-3", name: "Dr. Anika Rahman", email: "anika.r@univ.edu.bd", subject: "Academic Research Access on VERC CLTS Genesis", message: "I am conducting a doctoral study on the global propagation of CLTS since 2000. Could I access historical field documentation at the Savar archive?", date: "2024-04-12 02:40 PM", status: "Replied" }
];

const defaultSubscribers: Subscriber[] = [
  { id: "sub-1", email: "donor.relations@unicef.org", joinedDate: "2024-04-20", status: "Active" },
  { id: "sub-2", email: "sarah.j@impactfund.org", joinedDate: "2024-04-18", status: "Active" },
  { id: "sub-3", email: "community.lead@vercbd.org", joinedDate: "2024-04-10", status: "Active" },
  { id: "sub-4", email: "tariqul.dhaka@gmail.com", joinedDate: "2024-03-28", status: "Active" },
  { id: "sub-5", email: "field.officer@water.org", joinedDate: "2024-03-15", status: "Active" }
];

const defaultSiteSettings: SiteSettings = {
  siteTitle: "VERC | Village Education Resource Center",
  tagline: "Empowering Marginalized Communities & Transforming Destinies Since 1977",
  logoUrl: "/assets/logo.png",
  primaryColor: "#004B8D",
  secondaryColor: "#00AEEF",
  email: "verc@bangla.net",
  supportEmail: "info@vercbd.org",
  phone: "+880 2 7745041",
  hotline: "+880 2223371216",
  address: "B-30, Ekhlas Uddin Khan Road, Anandapur, Savar, Dhaka-1340, Bangladesh",
  facebookUrl: "https://facebook.com/vercbd",
  twitterUrl: "https://twitter.com/vercbd",
  linkedinUrl: "https://linkedin.com/company/vercbd",
  youtubeUrl: "https://youtube.com/vercbd",
  totalDonationAmount: "৳ 1,620,000,000",
  donorsCount: 420,
  registrationNumber: "FD/R-348",
  ngoAffairsBureauReg: "NGOAB-00348-1989"
};

const defaultDashboardMetrics: CharityDashboardMetric = {
  beneficiaries: { value: "5.24M+", label: "Beneficiaries Reached", period: "Cumulative Since Inception", percentage: 88 },
  donationsMobilized: { value: "৳ 1.62B", label: "Grants & Donations", period: "Fiscal Year 2023-2024", percentage: 92 },
  activePrograms: { value: 5, label: "Core Thematic Programs", period: "31 Districts & 106 Upazilas", percentage: 100 },
  microfinanceMembers: { value: "112,437", label: "Active Group Members", period: "99.10% Recovery Rate", percentage: 99 },
  topFundedProgram: {
    title: "Water, Sanitation & Hygiene (WaSH)",
    beneficiaries: "2.8 Million People",
    fundsAllocated: "৳ 42.5 Crore ($3.8M)",
    imageUrl: "/assets/wash_hero.png",
    leadPartner: "UNICEF & Water.org"
  },
  thematicDistribution: [
    { thematicArea: "WaSH & Sanitation", percentage: 42.5, color: "#004B8D" },
    { thematicArea: "Non-Formal Education", percentage: 24.8, color: "#00AEEF" },
    { thematicArea: "Health & Nutrition", percentage: 18.2, color: "#F56565" },
    { thematicArea: "Microfinance & Livelihoods", percentage: 14.5, color: "#FFA756" }
  ],
  financialFlowData: [
    { month: "Jan", grantsInflow: 380, programExpenses: 340 },
    { month: "Feb", grantsInflow: 420, programExpenses: 390 },
    { month: "Mar", grantsInflow: 560, programExpenses: 480 },
    { month: "Apr", grantsInflow: 490, programExpenses: 430 },
    { month: "May", grantsInflow: 410, programExpenses: 380 },
    { month: "Jun", grantsInflow: 650, programExpenses: 590 },
    { month: "Jul", grantsInflow: 320, programExpenses: 310 },
    { month: "Aug", grantsInflow: 450, programExpenses: 400 },
    { month: "Sep", grantsInflow: 480, programExpenses: 440 },
    { month: "Oct", grantsInflow: 530, programExpenses: 490 },
    { month: "Nov", grantsInflow: 720, programExpenses: 660 },
    { month: "Dec", grantsInflow: 580, programExpenses: 520 }
  ]
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const STORAGE_KEY = "vercbd_charity_cms_v3";

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(defaultHeroSlides);
  const [impactStats, setImpactStats] = useState<ImpactStat[]>(defaultImpactStats);
  const [programs, setPrograms] = useState<ProgramItem[]>(defaultPrograms);
  const [news, setNews] = useState<NewsItem[]>(defaultNews);
  const [stories, setStories] = useState<SuccessStory[]>(defaultStories);
  const [microfinanceProducts, setMicrofinanceProducts] = useState<MicrofinanceProduct[]>(defaultMicrofinanceProducts);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(defaultTeamMembers);
  const [partners, setPartners] = useState<PartnerItem[]>(defaultPartners);
  const [gallery, setGallery] = useState<GalleryItem[]>(defaultGallery);
  const [branches, setBranches] = useState<BranchOffice[]>(defaultBranches);
  const [messages, setMessages] = useState<ContactMessage[]>(defaultMessages);
  const [subscribers, setSubscribers] = useState<Subscriber[]>(defaultSubscribers);
  const [donations, setDonations] = useState<DonationRecord[]>(defaultDonations);
  const [campaigns, setCampaigns] = useState<CharityCampaign[]>(defaultCampaigns);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [dashboardMetrics, setDashboardMetrics] = useState<CharityDashboardMetric>(defaultDashboardMetrics);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [primaryColor, setPrimaryColor] = useState<string>("#004B8D");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.heroSlides) setHeroSlides(parsed.heroSlides);
        if (parsed.impactStats) setImpactStats(parsed.impactStats);
        if (parsed.programs) setPrograms(parsed.programs);
        if (parsed.news) setNews(parsed.news);
        if (parsed.stories) setStories(parsed.stories);
        if (parsed.microfinanceProducts) setMicrofinanceProducts(parsed.microfinanceProducts);
        if (parsed.teamMembers) setTeamMembers(parsed.teamMembers);
        if (parsed.partners) setPartners(parsed.partners);
        if (parsed.gallery) setGallery(parsed.gallery);
        if (parsed.branches) setBranches(parsed.branches);
        if (parsed.messages) setMessages(parsed.messages);
        if (parsed.subscribers) setSubscribers(parsed.subscribers);
        if (parsed.donations) setDonations(parsed.donations);
        if (parsed.campaigns) setCampaigns(parsed.campaigns);
        if (parsed.siteSettings) setSiteSettings(parsed.siteSettings);
        if (parsed.dashboardMetrics) setDashboardMetrics(parsed.dashboardMetrics);
        if (parsed.theme) setTheme(parsed.theme);
        if (parsed.primaryColor) setPrimaryColor(parsed.primaryColor);
      }
    } catch (e) {
      console.warn("Could not load stored content from localStorage:", e);
    }
    setIsLoaded(true);
  }, []);

  // Sync theme with HTML document element for Tailwind class-based dark mode
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme]);

  // Sync dynamic theme colors with CSS variables across the whole app
  useEffect(() => {
    if (typeof document !== "undefined") {
      const primary = primaryColor || siteSettings.primaryColor || "#004B8D";
      const secondary = siteSettings.secondaryColor || "#00AEEF";
      document.documentElement.style.setProperty("--brand-primary", primary);
      document.documentElement.style.setProperty("--brand-secondary", secondary);
      document.documentElement.style.setProperty("--primary-color", primary);
    }
  }, [primaryColor, siteSettings.primaryColor, siteSettings.secondaryColor]);

  // Save to LocalStorage whenever content changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const payload = {
        heroSlides,
        impactStats,
        programs,
        news,
        stories,
        microfinanceProducts,
        teamMembers,
        partners,
        gallery,
        branches,
        messages,
        subscribers,
        donations,
        campaigns,
        siteSettings,
        dashboardMetrics,
        theme,
        primaryColor
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn("Could not save content to localStorage:", e);
    }
  }, [
    heroSlides,
    impactStats,
    programs,
    news,
    stories,
    microfinanceProducts,
    teamMembers,
    partners,
    gallery,
    branches,
    messages,
    subscribers,
    donations,
    campaigns,
    siteSettings,
    dashboardMetrics,
    theme,
    primaryColor,
    isLoaded
  ]);

  // CRUD Operations
  const addHeroSlide = (slide: Omit<HeroSlide, "id">) => {
    const newSlide = { ...slide, id: `hero-${Date.now()}` };
    setHeroSlides(prev => [...prev, newSlide]);
  };
  const updateHeroSlide = (id: string, slide: Partial<HeroSlide>) => {
    setHeroSlides(prev => prev.map(s => s.id === id ? { ...s, ...slide } : s));
  };
  const deleteHeroSlide = (id: string) => {
    setHeroSlides(prev => prev.filter(s => s.id !== id));
  };

  const updateImpactStat = (id: string, stat: Partial<ImpactStat>) => {
    setImpactStats(prev => prev.map(s => s.id === id ? { ...s, ...stat } : s));
  };
  const addImpactStat = (stat: Omit<ImpactStat, "id">) => {
    setImpactStats(prev => [...prev, { ...stat, id: `stat-${Date.now()}` }]);
  };
  const deleteImpactStat = (id: string) => {
    setImpactStats(prev => prev.filter(s => s.id !== id));
  };

  const addProgram = (program: Omit<ProgramItem, "id">) => {
    setPrograms(prev => [...prev, { ...program, id: `prog-${Date.now()}` }]);
  };
  const updateProgram = (id: string, program: Partial<ProgramItem>) => {
    setPrograms(prev => prev.map(p => p.id === id ? { ...p, ...program } : p));
  };
  const deleteProgram = (id: string) => {
    setPrograms(prev => prev.filter(p => p.id !== id));
  };

  const addNews = (item: Omit<NewsItem, "id">) => {
    setNews(prev => [ { ...item, id: `news-${Date.now()}` }, ...prev ]);
  };
  const updateNews = (id: string, item: Partial<NewsItem>) => {
    setNews(prev => prev.map(n => n.id === id ? { ...n, ...item } : n));
  };
  const deleteNews = (id: string) => {
    setNews(prev => prev.filter(n => n.id !== id));
  };

  const addStory = (story: Omit<SuccessStory, "id">) => {
    setStories(prev => [ { ...story, id: `story-${Date.now()}` }, ...prev ]);
  };
  const updateStory = (id: string, story: Partial<SuccessStory>) => {
    setStories(prev => prev.map(s => s.id === id ? { ...s, ...story } : s));
  };
  const deleteStory = (id: string) => {
    setStories(prev => prev.filter(s => s.id !== id));
  };

  const addMicrofinanceProduct = (product: Omit<MicrofinanceProduct, "id">) => {
    setMicrofinanceProducts(prev => [...prev, { ...product, id: `mf-${Date.now()}` }]);
  };
  const updateMicrofinanceProduct = (id: string, product: Partial<MicrofinanceProduct>) => {
    setMicrofinanceProducts(prev => prev.map(m => m.id === id ? { ...m, ...product } : m));
  };
  const deleteMicrofinanceProduct = (id: string) => {
    setMicrofinanceProducts(prev => prev.filter(m => m.id !== id));
  };

  const addTeamMember = (member: Omit<TeamMember, "id">) => {
    setTeamMembers(prev => [...prev, { ...member, id: `team-${Date.now()}` }]);
  };
  const updateTeamMember = (id: string, member: Partial<TeamMember>) => {
    setTeamMembers(prev => prev.map(t => t.id === id ? { ...t, ...member } : t));
  };
  const deleteTeamMember = (id: string) => {
    setTeamMembers(prev => prev.filter(t => t.id !== id));
  };

  const addPartner = (partner: Omit<PartnerItem, "id">) => {
    setPartners(prev => [...prev, { ...partner, id: `p-${Date.now()}` }]);
  };
  const updatePartner = (id: string, partner: Partial<PartnerItem>) => {
    setPartners(prev => prev.map(p => p.id === id ? { ...p, ...partner } : p));
  };
  const deletePartner = (id: string) => {
    setPartners(prev => prev.filter(p => p.id !== id));
  };

  const addGalleryItem = (item: Omit<GalleryItem, "id">) => {
    setGallery(prev => [ { ...item, id: `gal-${Date.now()}` }, ...prev ]);
  };
  const updateGalleryItem = (id: string, item: Partial<GalleryItem>) => {
    setGallery(prev => prev.map(g => g.id === id ? { ...g, ...item } : g));
  };
  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  const addBranch = (branch: Omit<BranchOffice, "id">) => {
    setBranches(prev => [...prev, { ...branch, id: `br-${Date.now()}` }]);
  };
  const updateBranch = (id: string, branch: Partial<BranchOffice>) => {
    setBranches(prev => prev.map(b => b.id === id ? { ...b, ...branch } : b));
  };
  const deleteBranch = (id: string) => {
    setBranches(prev => prev.filter(b => b.id !== id));
  };

  const addMessage = (msg: Omit<ContactMessage, "id" | "date" | "status">) => {
    const newMessage: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      date: new Date().toLocaleString(),
      status: "Unread"
    };
    setMessages(prev => [newMessage, ...prev]);
  };
  const updateMessageStatus = (id: string, status: ContactMessage["status"]) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
  };
  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const addSubscriber = (email: string) => {
    if (subscribers.some(s => s.email.toLowerCase() === email.toLowerCase())) return;
    const newSub: Subscriber = {
      id: `sub-${Date.now()}`,
      email,
      joinedDate: new Date().toISOString().split("T")[0],
      status: "Active"
    };
    setSubscribers(prev => [newSub, ...prev]);
  };
  const deleteSubscriber = (id: string) => {
    setSubscribers(prev => prev.filter(s => s.id !== id));
  };

  const addDonation = (donation: Omit<DonationRecord, "id">) => {
    const newDonation: DonationRecord = {
      ...donation,
      id: `don-${Date.now()}`
    };
    setDonations(prev => [newDonation, ...prev]);
  };
  const updateDonation = (id: string, donation: Partial<DonationRecord>) => {
    setDonations(prev => prev.map(d => d.id === id ? { ...d, ...donation } : d));
  };
  const deleteDonation = (id: string) => {
    setDonations(prev => prev.filter(d => d.id !== id));
  };

  const addCampaign = (campaign: Omit<CharityCampaign, "id">) => {
    const newCamp: CharityCampaign = {
      ...campaign,
      id: `camp-${Date.now()}`
    };
    setCampaigns(prev => [newCamp, ...prev]);
  };
  const updateCampaign = (id: string, campaign: Partial<CharityCampaign>) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...campaign } : c));
  };
  const deleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
  };

  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    setSiteSettings(prev => ({ ...prev, ...settings }));
  };

  const updateDashboardMetrics = (metrics: Partial<CharityDashboardMetric>) => {
    setDashboardMetrics(prev => ({ ...prev, ...metrics }));
  };

  const resetToDefaults = () => {
    setHeroSlides(defaultHeroSlides);
    setImpactStats(defaultImpactStats);
    setPrograms(defaultPrograms);
    setNews(defaultNews);
    setStories(defaultStories);
    setMicrofinanceProducts(defaultMicrofinanceProducts);
    setTeamMembers(defaultTeamMembers);
    setPartners(defaultPartners);
    setGallery(defaultGallery);
    setBranches(defaultBranches);
    setMessages(defaultMessages);
    setSubscribers(defaultSubscribers);
    setDonations(defaultDonations);
    setCampaigns(defaultCampaigns);
    setSiteSettings(defaultSiteSettings);
    setDashboardMetrics(defaultDashboardMetrics);
    setPrimaryColor("#004B8D");
    setTheme("light");
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ContentContext.Provider
      value={{
        heroSlides,
        impactStats,
        programs,
        news,
        stories,
        microfinanceProducts,
        teamMembers,
        partners,
        gallery,
        branches,
        messages,
        subscribers,
        donations,
        campaigns,
        siteSettings,
        dashboardMetrics,
        theme,
        setTheme,
        primaryColor,
        setPrimaryColor,
        addHeroSlide,
        updateHeroSlide,
        deleteHeroSlide,
        updateImpactStat,
        addImpactStat,
        deleteImpactStat,
        addProgram,
        updateProgram,
        deleteProgram,
        addNews,
        updateNews,
        deleteNews,
        addStory,
        updateStory,
        deleteStory,
        addMicrofinanceProduct,
        updateMicrofinanceProduct,
        deleteMicrofinanceProduct,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addPartner,
        updatePartner,
        deletePartner,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addBranch,
        updateBranch,
        deleteBranch,
        addMessage,
        updateMessageStatus,
        deleteMessage,
        addSubscriber,
        deleteSubscriber,
        addDonation,
        updateDonation,
        deleteDonation,
        addCampaign,
        updateCampaign,
        deleteCampaign,
        updateSiteSettings,
        updateDashboardMetrics,
        resetToDefaults
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};
