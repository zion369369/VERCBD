"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight, 
  Globe,
  Heart
} from "lucide-react";
import logo from "@/app/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Organization",
      links: [
        { name: "About VERC", href: "/about" },
        { name: "Our History", href: "/about#history" },
        { name: "Vision & Mission", href: "/about" },
        { name: "Organogram", href: "/about/organogram" },
        { name: "Leadership", href: "/about/staff" },
      ]
    },
    {
      title: "Social Programs",
      links: [
        { name: "Education", href: "/programs/education" },
        { name: "Health & WASH", href: "/programs/wash" },
        { name: "Livelihood", href: "/programs/livelihood" },
        { name: "Capacity Building", href: "/programs/capacity" },
        { name: "Partnerships", href: "/partners" },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Annual Reports", href: "/about/annual-report" },
        { name: "Policies", href: "/about/legal" },
        { name: "Photo Gallery", href: "/resources/gallery" },
        { name: "Notices", href: "/resources/notices" },
        { name: "Contact Us", href: "/contact" },
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white pt-32 pb-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-primary/5 blur-[120px] -mr-40 mt-20"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-10">
            <Link href="/" className="inline-block">
              <Image 
                src={logo} 
                alt="VERC Logo" 
                width={100} 
                height={100} 
                className="opacity-100 object-contain"
              />
            </Link>
            <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-md">
              A self-reliant and enlightened society based on justice, equity and sustainability where every human being has equal opportunity.
            </p>
            <div className="flex gap-5">
              {[
                { icon: <Facebook size={20} />, href: "https://facebook.com" },
                { icon: <Twitter size={20} />, href: "https://twitter.com" },
                { icon: <Linkedin size={20} />, href: "https://linkedin.com" },
                { icon: <Youtube size={20} />, href: "https://youtube.com" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all duration-300 border border-white/10"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            {footerLinks.map((group, i) => (
              <div key={i} className="space-y-8">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-brand-secondary">{group.title}</h4>
                <ul className="space-y-5">
                  {group.links.map((link, j) => (
                    <li key={j}>
                      <Link 
                        href={link.href} 
                        className="text-gray-400 hover:text-white transition-colors font-medium flex items-center group gap-1"
                      >
                        {link.name}
                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y border-white/10 mb-12">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-brand-secondary"><MapPin size={24} /></div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Visit Us</p>
                <p className="text-sm font-bold">B-30, Ekhlaspur, Savar, Dhaka</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-brand-secondary"><Mail size={24} /></div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Email Us</p>
                <p className="text-sm font-bold">info@vercbd.org</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-brand-secondary"><Phone size={24} /></div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Call Us</p>
                <p className="text-sm font-bold">+880-2-224441511</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-gray-500 font-bold text-xs uppercase tracking-widest">
            <div className="flex items-center gap-2">
                <span>© {currentYear} VERC Bangladesh</span>
                <span className="hidden md:inline">•</span>
                <span>All Rights Reserved</span>
            </div>
            <div className="flex items-center gap-6">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
                <div className="flex items-center gap-2 text-brand-secondary">
                    <Globe size={14} />
                    <span>English (US)</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                Built with <Heart size={14} className="text-brand-secondary fill-brand-secondary" /> for Impact
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
