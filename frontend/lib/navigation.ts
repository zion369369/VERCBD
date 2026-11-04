export interface NavigationItem {
  name: string;
  href: string;
  children?: NavigationItem[];
}

export const aboutNavigation: NavigationItem[] = [
  { name: "Vision and Mission", href: "/about" },
  { name: "Governance & Leadership", href: "/about/organogram" },
  { name: "Board of Directors", href: "/about/board" },
  { name: "Senior Staff Members", href: "/about/staff" },
  { name: "Our Awards", href: "/about/awards" },
  { name: "Annual Reports", href: "/about/annual-report" },
  { name: "Legal Status", href: "/about/legal" },
];

export const programNavigation: NavigationItem[] = [
  { name: "Programs Overview", href: "/programs" },
  { name: "Life Skill Education", href: "/programs/education" },
  { name: "WASH (Water & Sanitation)", href: "/programs/wash" },
  { name: "Livelihood & Empowerment", href: "/programs/livelihood", children: [
    { name: "Microfinance Program", href: "/microfinance" },
    { name: "Loan & Savings Products", href: "/microfinance/products" },
  ] },
  { name: "Capacity Building", href: "/programs/capacity" },
];

export const publicNavigation: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about", children: aboutNavigation },
  { name: "Social Programs", href: "/programs", children: programNavigation },
  { name: "Impact & Partners", href: "/impact", children: [
    { name: "Impact Results", href: "/impact" },
    { name: "Development Partners", href: "/partners" },
  ] },
  { name: "Resources & Contact", href: "/contact", children: [
    { name: "Photo & Video Gallery", href: "/resources/gallery" },
    { name: "Branch Network", href: "/resources/branches" },
    { name: "Careers & Openings", href: "/careers" },
    { name: "Contact Us", href: "/contact" },
  ] },
];

export function isNavigationActive(item: NavigationItem, pathname: string): boolean {
  return pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`)) || !!item.children?.some(child => isNavigationActive(child, pathname));
}
