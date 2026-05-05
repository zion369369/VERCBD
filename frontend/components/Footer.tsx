import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">
              VERC<span className="text-brand-secondary">.</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Village Education Resource Center (VERC) is a non-governmental development organization
              working since 1977 for community empowerment in Bangladesh.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-brand-secondary transition-colors"><Facebook size={20} /></Link>
              <Link href="#" className="hover:text-brand-secondary transition-colors"><Twitter size={20} /></Link>
              <Link href="#" className="hover:text-brand-secondary transition-colors"><Linkedin size={20} /></Link>
              <Link href="#" className="hover:text-brand-secondary transition-colors"><Youtube size={20} /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white">About VERC</Link></li>
              <li><Link href="/impact" className="hover:text-white">Impact</Link></li>
              <li><Link href="/resources" className="hover:text-white">Resources</Link></li>
              <li><Link href="/career" className="hover:text-white">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Solutions</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/solutions/education" className="hover:text-white">Non-Formal Education</Link></li>
              <li><Link href="/solutions/health" className="hover:text-white">Health Programs</Link></li>
              <li><Link href="/solutions/wash" className="hover:text-white">Water & Sanitation</Link></li>
              <li><Link href="/solutions/microfinance" className="hover:text-white">Microfinance</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>B30, Ekhlas Uddin Khan Road, Savar, Dhaka</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="flex-shrink-0" />
                <span>+88 02223371216</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="flex-shrink-0" />
                <span>info@vercbd.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Village Education Resource Center (VERC). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
