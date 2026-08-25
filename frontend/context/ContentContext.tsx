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
}

export interface DashboardMetric {
  customers: { value: number; period: string; percentage: number };
  orders: { value: number; period: string; percentage: number };
  cancel: { value: number; period: string; percentage: number };
  profitIncrease: number;
  todayBestSale: {
    title: string;
    sales: number;
    price: string;
    imageUrl: string;
  };
  recentOrders: Array<{
    id: string;
    title: string;
    timeAgo: string;
    price: string;
    imageUrl: string;
  }>;
  trendingItems: Array<{
    id: string;
    title: string;
    rating: number;
    stock: string;
    price: string;
    imageUrl: string;
  }>;
  currentVisits: Array<{
    region: string;
    percentage: number;
    color: string;
  }>;
  revenueData: Array<{
    month: string;
    earning: number;
    expenses: number;
  }>;
  latestCustomers: Array<{
    id: string;
    name: string;
    purchases: number;
    likes: number;
    avatarUrl: string;
    email: string;
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
  siteSettings: SiteSettings;
  dashboardMetrics: DashboardMetric;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  // CRUD operations
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

  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  updateDashboardMetrics: (metrics: Partial<DashboardMetric>) => void;
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
  { id: "stat-1", key: "lives", label: "Lives Transformed", value: "2M+", subText: "Across all 64 districts", category: "General", iconName: "Users" },
  { id: "stat-2", key: "districts", label: "Districts Covered", value: "30+", subText: "Active field presence", category: "General", iconName: "Globe" },
  { id: "stat-3", key: "leaders", label: "Community Leaders", value: "1,500+", subText: "Empowered grassroot champions", category: "General", iconName: "UserCheck" },
  { id: "stat-4", key: "legacy", label: "Legacy Years", value: "50+", subText: "Founded in 1977", category: "General", iconName: "History" },
  { id: "stat-5", key: "branches", label: "Branch Offices", value: "136", subText: "Operating across 25 areas", category: "Microfinance", iconName: "MapPin" },
  { id: "stat-6", key: "microfinance_amt", label: "Outstanding Microfinance", value: "Tk. 620 Crore+", subText: "Tk. 620,69,29,412 outstanding portfolio", category: "Microfinance", iconName: "Banknote" },
  { id: "stat-7", key: "learning_centers", label: "Learning Centers", value: "300", subText: "Active community schools", category: "Education", iconName: "BookOpen" },
  { id: "stat-8", key: "students", label: "Students Supported", value: "222", subText: "Higher education stipend recipients", category: "Education", iconName: "GraduationCap" },
  { id: "stat-9", key: "rohingya", label: "Rohingya Response", value: "Camp 8W", subText: "Humanitarian assistance program", category: "Emergency", iconName: "HeartHandshake" }
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
    reach: "450K+",
    status: "Active",
    color: "bg-blue-50"
  },
  {
    id: "prog-2",
    title: "Health & WaSH",
    slug: "wash",
    category: "Health & WASH",
    description: "Pioneering Community-Led Total Sanitation (CLTS) globally and delivering arsenic-safe drinking water and hospital care.",
    imageUrl: "/assets/wash_hero.png",
    features: [
      "Community Led Total Sanitation (CLTS)",
      "Mother & Child Specialized Hospitals",
      "Arsenic Mitigation & Water Safety",
      "School Hygiene & Menstrual Health"
    ],
    reach: "1.2M+",
    status: "Active",
    color: "bg-emerald-50"
  },
  {
    id: "prog-3",
    title: "Livelihood & Empowerment",
    slug: "livelihood",
    category: "Livelihood",
    description: "Building resilient futures through vocational training, women's empowerment, and agro-based income generation.",
    imageUrl: "/assets/impact_hero.png",
    features: [
      "Skill & Vocational Training",
      "Women Entrepreneurship Incubation",
      "Climate Resilient Agriculture",
      "Market Linkage Development"
    ],
    reach: "300K+",
    status: "Active",
    color: "bg-rose-50"
  },
  {
    id: "prog-4",
    title: "Capacity Building & Training",
    slug: "capacity",
    category: "Capacity Building",
    description: "Strengthening local institutions, local government bodies, and youth leadership through training and research.",
    imageUrl: "/assets/capacity_building_hero.png",
    features: [
      "Training Institute at Savar",
      "Local Governance Empowerment",
      "Participatory Action Research",
      "Disaster Risk Reduction Training"
    ],
    reach: "150K+",
    status: "Active",
    color: "bg-amber-50"
  },
  {
    id: "prog-5",
    title: "Microfinance (Jagoron & Agrosor)",
    slug: "microfinance",
    category: "Economic Development",
    description: "Inclusive financial services empowering micro-entrepreneurs and marginalized women across Bangladesh.",
    imageUrl: "/assets/microfinance_hero.png",
    features: [
      "Jagoron Rural Micro-Credit",
      "Agrosor Enterprise Financing",
      "Buniad Ultra-Poor Assistance",
      "Water & Sanitation Concession Loans"
    ],
    reach: "200K+",
    status: "Active",
    color: "bg-indigo-50"
  }
];

const defaultNews: NewsItem[] = [
  {
    id: "news-1",
    title: "World Bank Delegation Visits VERC Mother & Child Hospital",
    slug: "world-bank-delegation-visit",
    category: "Health",
    summary: "Senior representatives appreciated VERC's community-driven maternal healthcare initiatives and state-of-the-art neonatal wards.",
    content: "A high-level World Bank delegation visited the VERC Mother & Child Hospital in Savar. They reviewed ongoing clinical operations, emergency obstetric services, and praised the community insurance model enabling affordable healthcare for ultra-poor families.",
    imageUrl: "/assets/home_official_1.jpg",
    date: "2024-04-15",
    author: "Executive Secretariat",
    status: "Published"
  },
  {
    id: "news-2",
    title: "VERC Celebrates 50+ Years of Sanitation Innovation & CLTS",
    slug: "sanitation-innovation-anniversary",
    category: "Sanitation",
    summary: "International development partners joined VERC in Dhaka to celebrate the enduring legacy of Community Led Total Sanitation.",
    content: "VERC's groundbreaking CLTS methodology pioneered in 2000 has transformed sanitation practices across 50+ countries. The milestone seminar brought together policymakers, UNICEF, WaterAid, and grassroot leaders.",
    imageUrl: "/assets/wash_hero.png",
    date: "2024-03-22",
    author: "Communications Team",
    status: "Published"
  },
  {
    id: "news-3",
    title: "New Catch-Up Education Learning Centers Launched in Rajshahi",
    slug: "rajshahi-learning-centers",
    category: "Education",
    summary: "Expanding community learning centers to support out-of-school and disadvantaged children in northern Bangladesh.",
    content: "30 new community learning centers have been officially commissioned in Rajshahi division to deliver accelerated primary education with digital learning aids.",
    imageUrl: "/assets/edu_2.png",
    date: "2024-02-10",
    author: "Education Wing",
    status: "Published"
  }
];

const defaultStories: SuccessStory[] = [
  {
    id: "story-1",
    title: "Nilima's Journey to Financial Independence",
    slug: "nilima-success-story",
    beneficiaryName: "Nilima Begum",
    location: "Kaliakoir, Gazipur",
    story: "Married at an early age to a blind day laborer, Nilima faced extreme poverty. With VERC's livelihood training and microcredit support, she set up a small dairy farm and now pays for her children's college education.",
    imageUrl: "/assets/microfinance_woman_hero.png",
    date: "2024-01-18"
  },
  {
    id: "story-2",
    title: "Overcoming Arsenic with Clean Community Water",
    slug: "overcoming-arsenic",
    beneficiaryName: "Md. Faruk Hossain",
    location: "Monoharganj, Cumilla",
    story: "Faruk's village suffered from severe arsenic poisoning for decades. Through VERC's deep-tube well project and WaSH awareness committee, his entire community now enjoys 100% safe drinking water.",
    imageUrl: "/assets/wash_hero.png",
    date: "2024-02-05"
  }
];

const defaultMicrofinanceProducts: MicrofinanceProduct[] = [
  {
    id: "mf-1",
    title: "Jagoron (Rural Microcredit)",
    category: "Core Microcredit",
    loanLimit: "Tk. 10,000 – 1,00,000",
    interestRate: "Declining Balance (MRA Approved)",
    tenure: "12 Months (Weekly / Monthly)",
    description: "Designed for smallholders, rural women, and marginal households to fund income-generating activities.",
    eligibility: [
      "Permanent resident of operational area",
      "Age between 18 and 60 years",
      "Member of a VERC community group"
    ],
    features: ["No collateral required", "Flexible weekly repayment", "Free financial literacy orientation"],
    imageUrl: "/assets/microfinance_hero.png"
  },
  {
    id: "mf-2",
    title: "Agrosor (Micro-Enterprise Loan)",
    category: "Enterprise",
    loanLimit: "Tk. 1,00,000 – 15,00,000",
    interestRate: "Competitive Semi-annual rate",
    tenure: "12 – 36 Months",
    description: "Tailored to established entrepreneurs seeking expansion capital for shops, agro-farms, and manufacturing units.",
    eligibility: [
      "Minimum 2 years profitable business track record",
      "Valid trade license / local verification",
      "Viable cash flow forecast"
    ],
    features: ["Higher credit ceiling", "Doorstep advisory", "Grace period options for agriculture"],
    imageUrl: "/assets/microfinance_woman_hero.png"
  },
  {
    id: "mf-3",
    title: "Buniad (Ultra Poor Program)",
    category: "Social Protection",
    loanLimit: "Tk. 5,00,000 – 30,000",
    interestRate: "Highly Subsidized / Special",
    tenure: "12 Months flexible",
    description: "Dedicated financing and livelihood mentorship for extremely disadvantaged households to escape poverty.",
    eligibility: [
      "Landless or asset-poor households",
      "Female-headed vulnerable families"
    ],
    features: ["Asset transfer linkage", "Healthcare vouchers", "Zero registration fees"],
    imageUrl: "/assets/impact_hero.png"
  },
  {
    id: "mf-4",
    title: "Sufolon (Seasonal Agricultural Loan)",
    category: "Agriculture",
    loanLimit: "Tk. 20,000 – 1,50,000",
    interestRate: "Seasonal Flat/Declining",
    tenure: "Harvest Cycle (4 – 9 Months)",
    description: "Supports farmers with seasonal crop inputs, fertilizer, modern seeds, irrigation, and livestock fattening.",
    eligibility: ["Cultivator or tenant farmer", "Crop calendar alignment"],
    features: ["Bullet repayment after crop harvest", "Weather advisory updates", "Input procurement discount links"],
    imageUrl: "/assets/home_official_1.jpg"
  }
];

const defaultTeamMembers: TeamMember[] = [
  {
    id: "team-1",
    name: "Md. Yakub Hossain",
    role: "Executive Director",
    email: "yakub@vercbd.org",
    department: "Executive Management",
    bio: "Leading VERC's strategic expansion, partnerships, and high-impact participatory development models nationwide.",
    imageUrl: "/assets/education_official.jpg",
    phone: "+880 2 7745041"
  },
  {
    id: "team-2",
    name: "Md. Masud Hassan",
    role: "Deputy Executive Director",
    email: "masudhassan@vercbd.org",
    department: "Operations & Governance",
    bio: "Overseeing nationwide field operations, institutional capacity building, and donor program compliance.",
    imageUrl: "/assets/education_official_2.jpg",
    phone: "+880 2 7745042"
  },
  {
    id: "team-3",
    name: "Ranada Prasad Saha",
    role: "Director, Microfinance & Climate Change",
    email: "ranada@vercbd.org",
    department: "Microfinance",
    bio: "Managing 136 microfinance branches and climate adaptation funds empowering over 200,000 active members.",
    imageUrl: "/assets/about_official.jpg",
    phone: "+880 2 7745043"
  },
  {
    id: "team-4",
    name: "Mustafizur Rashid Mridha",
    role: "Director, Human Resource & Administration",
    email: "mrashid@vercbd.org",
    department: "Administration",
    bio: "Steering human resources, talent development, procurement, and institutional risk management.",
    imageUrl: "/assets/education_1.jpg",
    phone: "+880 2 7745044"
  },
  {
    id: "team-5",
    name: "Md. Masud Royhan",
    role: "Director, Finance & Accounts",
    email: "royhan@vercbd.org",
    department: "Finance",
    bio: "Ensuring highest fiscal transparency, external statutory audits, and financial governance.",
    imageUrl: "/assets/education_2.jpg",
    phone: "+880 2 7745045"
  }
];

const defaultPartners: PartnerItem[] = [
  { id: "p-1", name: "Government of Bangladesh (GoB)", category: "Government", logoUrl: "/assets/gob_logo.png", websiteUrl: "https://bangladesh.gov.bd" },
  { id: "p-2", name: "PKSF (Palli Karma-Sahayak Foundation)", category: "Government", logoUrl: "/assets/pksf_logo.png", websiteUrl: "https://pksf.org.bd" },
  { id: "p-3", name: "Microcredit Regulatory Authority (MRA)", category: "Government", logoUrl: "/assets/mra_logo.png", websiteUrl: "https://mra.gov.bd" },
  { id: "p-4", name: "UNICEF Bangladesh", category: "UN Agencies", logoUrl: "/assets/unicef_logo.png", websiteUrl: "https://unicef.org/bangladesh" },
  { id: "p-5", name: "World Bank Group", category: "International NGO", logoUrl: "/assets/worldbank_logo.png", websiteUrl: "https://worldbank.org" },
  { id: "p-6", name: "WaterAid Bangladesh", category: "International NGO", logoUrl: "/assets/wateraid_logo.png", websiteUrl: "https://wateraid.org/bd" },
  { id: "p-7", name: "Save the Children", category: "International NGO", logoUrl: "/assets/savethechildren_logo.png", websiteUrl: "https://bangladesh.savethechildren.net" },
  { id: "p-8", name: "USAID", category: "International NGO", logoUrl: "/assets/usaid_logo.png", websiteUrl: "https://usaid.gov/bangladesh" },
  { id: "p-9", name: "CARE Bangladesh", category: "International NGO", logoUrl: "/assets/care_logo.png", websiteUrl: "https://carebangladesh.org" },
  { id: "p-10", name: "Swisscontact", category: "International NGO", logoUrl: "/assets/swisscontact_logo.jpg", websiteUrl: "https://swisscontact.org" },
  { id: "p-11", name: "Winrock International", category: "International NGO", logoUrl: "/assets/winrock_logo.png", websiteUrl: "https://winrock.org" }
];

const defaultGallery: GalleryItem[] = [
  { id: "gal-1", title: "Child-Centered Joyful Learning Session", category: "Education", imageUrl: "/assets/edu_1.png", description: "Students participating in interactive numeracy activities at Savar learning center.", date: "2024-03-15" },
  { id: "gal-2", title: "Community Total Sanitation Declaration", category: "WASH", imageUrl: "/assets/wash_hero.png", description: "Village leaders celebrating 100% open-defecation-free status in Rajshahi.", date: "2024-02-28" },
  { id: "gal-3", title: "Women Entrepreneurship Fair", category: "Livelihood", imageUrl: "/assets/microfinance_woman_hero.png", description: "Handicrafts and organic agro products displayed by VERC microfinance beneficiaries.", date: "2024-01-20" },
  { id: "gal-4", title: "Annual Development Conference 2024", category: "Events", imageUrl: "/assets/home_official_1.jpg", description: "Keynote addresses and national partner recognition banquet.", date: "2024-04-02" },
  { id: "gal-5", title: "Early Childhood Development (ECD) Class", category: "Education", imageUrl: "/assets/edu_2.png", description: "Preschool children engaging in sensory learning and rhymes.", date: "2024-02-12" },
  { id: "gal-6", title: "Arsenic-Free Deep Tubewell Installation", category: "WASH", imageUrl: "/assets/impact_hero.png", description: "Commissioning safe drinking water source for 500 households.", date: "2024-03-08" }
];

const defaultBranches: BranchOffice[] = [
  { id: "br-1", name: "Savar Head Office & Training Institute", district: "Dhaka", division: "Dhaka", address: "B-30, Ekhlas Uddin Khan Road, Anandapur, Savar, Dhaka-1340", phone: "+880 2 7745041", email: "savar@vercbd.org", manager: "Md. Masud Hassan", lat: 23.8488, lng: 90.2585 },
  { id: "br-2", name: "Rajshahi Regional Office", district: "Rajshahi", division: "Rajshahi", address: "House 45, Terokhadia, Rajshahi Sadar", phone: "+880 721 771234", email: "rajshahi@vercbd.org", manager: "Shahadat Hossain", lat: 24.3745, lng: 88.6042 },
  { id: "br-3", name: "Chattogram & Mirsarai Center", district: "Chattogram", division: "Chattogram", address: "Mirsarai Hospital Road, Mirsarai, Chattogram", phone: "+880 31 654321", email: "ctg@vercbd.org", manager: "Kamrul Islam", lat: 22.7758, lng: 91.5746 },
  { id: "br-4", name: "Rangpur Field Office", district: "Rangpur", division: "Rangpur", address: "Dhap Engineer Para, Rangpur City", phone: "+880 521 63980", email: "rangpur@vercbd.org", manager: "Aminul Islam", lat: 25.7439, lng: 89.2752 },
  { id: "br-5", name: "Cox's Bazar Emergency Hub", district: "Cox's Bazar", division: "Chattogram", address: "Kolatoli Road, Cox's Bazar", phone: "+880 341 62100", email: "coxsbazar@vercbd.org", manager: "Farzana Akter", lat: 21.4272, lng: 91.9846 }
];

const defaultMessages: ContactMessage[] = [
  { id: "msg-1", name: "Sarah Jenkins", email: "sarah.j@globalaid.org", phone: "+1 415 890 1234", subject: "Partnership Inquiry: WASH Scalability", message: "We would like to explore collaborative funding for CLTS programs in underserved coastal belts. Could we schedule an introductory call?", date: "2024-04-20 10:30 AM", status: "Unread" },
  { id: "msg-2", name: "Tariqul Islam", email: "tariqul.dhaka@gmail.com", phone: "+880 1711 002233", subject: "Donation Confirmation & Tax Receipt", message: "I made an online donation of Tk 50,000 for the child education stipend program. Kindly provide the formal acknowledgement.", date: "2024-04-18 04:15 PM", status: "Read" },
  { id: "msg-3", name: "Anika Rahman", email: "anika.r@univ.edu.bd", subject: "Research Access Request on CLTS Data", message: "I am a PhD researcher conducting a study on community sanitation models. I would like permission to review historical field documentation.", date: "2024-04-12 02:40 PM", status: "Replied" }
];

const defaultSubscribers: Subscriber[] = [
  { id: "sub-1", email: "rahim.khan@example.com", joinedDate: "2024-04-20", status: "Active" },
  { id: "sub-2", email: "sarah.j@impact.org", joinedDate: "2024-04-18", status: "Active" },
  { id: "sub-3", email: "community.lead@vercbd.org", joinedDate: "2024-04-10", status: "Active" },
  { id: "sub-4", email: "donor.relations@aidfund.org", joinedDate: "2024-03-28", status: "Active" },
  { id: "sub-5", email: "tanvir.ahmed@dhaka.net", joinedDate: "2024-03-15", status: "Pending" }
];

const defaultSiteSettings: SiteSettings = {
  siteTitle: "VERC | Village Education Resource Center",
  tagline: "Transforming Destinies Through Community Empowerment Since 1977",
  logoUrl: "/assets/logo.png",
  primaryColor: "#004B8D",
  secondaryColor: "#00AEEF",
  email: "info@vercbd.org",
  supportEmail: "support@vercbd.org",
  phone: "+880 2 7745041",
  hotline: "+880 1711 556677",
  address: "B-30, Ekhlas Uddin Khan Road, Anandapur, Savar, Dhaka-1340, Bangladesh",
  facebookUrl: "https://facebook.com/vercbd",
  twitterUrl: "https://twitter.com/vercbd",
  linkedinUrl: "https://linkedin.com/company/vercbd",
  youtubeUrl: "https://youtube.com/vercbd",
  totalDonationAmount: "$45,200",
  donorsCount: 320
};

const defaultDashboardMetrics: DashboardMetric = {
  customers: { value: 320, period: "During 2 Month", percentage: 75 },
  orders: { value: 500, period: "During 1 Month", percentage: 65 },
  cancel: { value: 20, period: "During 3 Month", percentage: 35 },
  profitIncrease: 70,
  todayBestSale: {
    title: "Diamond T-Shirt",
    sales: 120,
    price: "$45",
    imageUrl: "/assets/home_official_1.jpg"
  },
  recentOrders: [
    { id: "ord-1", title: "Smart Watch", timeAgo: "2 minutes ago", price: "$50", imageUrl: "/assets/edu_1.png" },
    { id: "ord-2", title: "Phone Lenses", timeAgo: "3 minutes ago", price: "$30", imageUrl: "/assets/wash_hero.png" },
    { id: "ord-3", title: "Minimalist Wallet", timeAgo: "8 minutes ago", price: "$28", imageUrl: "/assets/impact_hero.png" },
    { id: "ord-4", title: "Car vacume", timeAgo: "15 minutes ago", price: "$90", imageUrl: "/assets/capacity_building_hero.png" }
  ],
  trendingItems: [
    { id: "trend-1", title: "Laptop Batteries", rating: 4, stock: "In stock > 500", price: "$40", imageUrl: "/assets/microfinance_hero.png" },
    { id: "trend-2", title: "Wireless Charger", rating: 4, stock: "In stock < 100", price: "$30", imageUrl: "/assets/edu_3.png" }
  ],
  currentVisits: [
    { region: "America", percentage: 28.4, color: "#FFA756" },
    { region: "Africa", percentage: 9.2, color: "#4FD1C5" },
    { region: "Europe", percentage: 34.7, color: "#F56565" },
    { region: "Asia", percentage: 27.7, color: "#6C5DD3" }
  ],
  revenueData: [
    { month: "Jan", earning: 180, expenses: -90 },
    { month: "Feb", earning: 230, expenses: -130 },
    { month: "Mar", earning: 310, expenses: -190 },
    { month: "April", earning: 190, expenses: -110 },
    { month: "May", earning: 130, expenses: -80 },
    { month: "Jun", earning: 260, expenses: -170 },
    { month: "Jul", earning: 120, expenses: -70 },
    { month: "Aug", earning: 150, expenses: -90 },
    { month: "Sep", earning: 160, expenses: -100 },
    { month: "Oct", earning: 220, expenses: -140 },
    { month: "Nov", earning: 330, expenses: -200 },
    { month: "Dec", earning: 180, expenses: -110 }
  ],
  latestCustomers: [
    { id: "c-1", name: "Harry Joe", purchases: 20, likes: 120, avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80", email: "harry@example.com" },
    { id: "c-2", name: "Martha June", purchases: 10, likes: 140, avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80", email: "martha@example.com" },
    { id: "c-3", name: "Michal Clerk", purchases: 30, likes: 160, avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80", email: "michal@example.com" }
  ]
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const STORAGE_KEY = "vercbd_cms_content_v2";

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
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [dashboardMetrics, setDashboardMetrics] = useState<DashboardMetric>(defaultDashboardMetrics);
  const [theme, setTheme] = useState<"light" | "dark">("light");
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
        if (parsed.siteSettings) setSiteSettings(parsed.siteSettings);
        if (parsed.dashboardMetrics) setDashboardMetrics(parsed.dashboardMetrics);
        if (parsed.theme) setTheme(parsed.theme);
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
      const primary = siteSettings.primaryColor || "#004B8D";
      const secondary = siteSettings.secondaryColor || "#00AEEF";
      document.documentElement.style.setProperty("--brand-primary", primary);
      document.documentElement.style.setProperty("--brand-secondary", secondary);
      document.documentElement.style.setProperty("--primary-color", primary);
    }
  }, [siteSettings.primaryColor, siteSettings.secondaryColor]);

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
        siteSettings,
        dashboardMetrics,
        theme
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
    siteSettings,
    dashboardMetrics,
    theme,
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
    setMicrofinanceProducts(prev => prev.map(p => p.id === id ? { ...p, ...product } : p));
  };
  const deleteMicrofinanceProduct = (id: string) => {
    setMicrofinanceProducts(prev => prev.filter(p => p.id !== id));
  };

  const addTeamMember = (member: Omit<TeamMember, "id">) => {
    setTeamMembers(prev => [...prev, { ...member, id: `team-${Date.now()}` }]);
  };
  const updateTeamMember = (id: string, member: Partial<TeamMember>) => {
    setTeamMembers(prev => prev.map(m => m.id === id ? { ...m, ...member } : m));
  };
  const deleteTeamMember = (id: string) => {
    setTeamMembers(prev => prev.filter(m => m.id !== id));
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
    const dateStr = new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      date: dateStr,
      status: "Unread"
    };
    setMessages(prev => [newMsg, ...prev]);
  };
  const updateMessageStatus = (id: string, status: ContactMessage["status"]) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
  };
  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const addSubscriber = (email: string) => {
    const existing = subscribers.find(s => s.email.toLowerCase() === email.toLowerCase());
    if (!existing) {
      const today = new Date().toISOString().split("T")[0];
      setSubscribers(prev => [{ id: `sub-${Date.now()}`, email, joinedDate: today, status: "Active" }, ...prev]);
    }
  };
  const deleteSubscriber = (id: string) => {
    setSubscribers(prev => prev.filter(s => s.id !== id));
  };

  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    setSiteSettings(prev => ({ ...prev, ...settings }));
  };

  const updateDashboardMetrics = (metrics: Partial<DashboardMetric>) => {
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
    setSiteSettings(defaultSiteSettings);
    setDashboardMetrics(defaultDashboardMetrics);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
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
        siteSettings,
        dashboardMetrics,
        theme,
        setTheme,
        primaryColor: siteSettings.primaryColor || "#004B8D",
        setPrimaryColor: (color: string) => {
          setSiteSettings(prev => ({ ...prev, primaryColor: color }));
        },
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
