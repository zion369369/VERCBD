"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Search, Globe } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "About VERC", href: "/about" },
    {
      name: "Solutions",
      href: "#",
      children: [
        { name: "Education", href: "/solutions/education" },
        { name: "Health", href: "/solutions/health" },
        { name: "WASH", href: "/solutions/wash" },
        { name: "Microfinance", href: "/solutions/microfinance" },
      ],
    },
    { name: "Impact", href: "/impact" },
    { name: "Get Involved", href: "/get-involved" },
    { name: "Resources", href: "/resources" },
  ];

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="container-custom">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-brand-primary tracking-tight">
              VERC<span className="text-brand-secondary">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="nav-link flex items-center gap-1"
                >
                  {item.name}
                  {item.children && <ChevronDown size={14} />}
                </Link>
                {item.children && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-light hover:text-brand-primary"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Utility Nav */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-brand-primary">
              <Search size={20} />
            </button>
            <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-brand-primary">
              <Globe size={18} />
              EN
            </button>
            <Link href="/donate" className="btn-primary">
              Donate
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
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
