"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Search, Globe } from "lucide-react";
import logo from "@/app/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    {
      name: "About Us",
      href: "#",
      children: [
        { name: "Vision and Mission", href: "/about" },
        { name: "Governance & Leadership", href: "/about/organogram" },
        { name: "Senior Staff Members", href: "/about/staff" },
        { name: "Our Awards", href: "/about/awards" },
        { name: "Policies & Legal Status", href: "/about/legal" },
      ],
    },
    {
      name: "Social Programs",
      href: "#",
      children: [
        { name: "Education - Non Formal", href: "/programs/education" },
        { name: "Livelihood & Empowerment", href: "/programs/livelihood" },
        { name: "Capacity Building", href: "/programs/capacity" },
        { name: "Health, Water & Sanitation", href: "/programs/wash" },
      ],
    },
    {
      name: "Microfinance",
      href: "#",
      children: [
        { name: "About Microfinance", href: "/microfinance" },
        { name: "Loan & Savings Products", href: "/microfinance/products" },
        { name: "Eligibility & Process", href: "/microfinance/process" },
      ],
    },
    {
      name: "Impact & Partners",
      href: "#",
      children: [
        { name: "Impact Results", href: "/impact" },
        { name: "Transparency & Reporting", href: "/about/annual-report" },
        { name: "Development Partners", href: "/partners" },
      ],
    },
    {
      name: "Resources & Contact",
      href: "#",
      children: [
        { name: "Photo & Video Gallery", href: "/resources/gallery" },
        { name: "Notices & Vacancies", href: "/resources/notices" },
        { name: "Branch Network", href: "/resources/branches" },
        { name: "Contact Us", href: "/contact" },
      ],
    },
  ];

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100 h-24 flex items-center">
      <div className="container-custom w-full">
        <div className="flex items-center h-full">
          {/* Logo - Left aligned slot */}
          <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src={logo} 
                alt="VERC Logo" 
                width={75} 
                height={75} 
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Nav - Centered slot */}
          <div className="hidden lg:flex justify-center">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className="nav-link flex items-center gap-1 py-4"
                  >
                    {item.name}
                    {item.children && <ChevronDown size={14} />}
                  </Link>
                  {item.children && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-64 bg-white border border-gray-100 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 rounded-b-2xl overflow-hidden">
                      {item.children.map((child, idx) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={`block px-6 py-3 text-[13px] font-semibold text-gray-800 hover:bg-gray-50 hover:text-brand-primary transition-all ${idx !== item.children.length - 1 ? "border-b border-gray-50" : ""}`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Utility Nav - Right aligned slot */}
          <div className="flex-1 flex justify-end items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-brand-primary transition-colors">
                <Search size={20} />
              </button>
              <button className="flex items-center gap-1 text-sm font-bold text-gray-700 hover:text-brand-primary transition-colors">
                <Globe size={18} />
                EN
              </button>
              <Link href="/donate" className="btn-primary shadow-lg shadow-brand-primary/20">
                Donate
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-600 hover:text-brand-primary transition-colors"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-4">
          <div className="container-custom space-y-2">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block py-2 text-base font-medium text-gray-900"
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="pl-4 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block py-2 text-sm text-gray-600"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/donate" className="block text-center btn-primary mt-4">
              Donate
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
