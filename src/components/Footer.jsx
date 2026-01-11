import React from 'react';
import { Globe, ChevronDown } from 'lucide-react';

const Footer = () => {
  const links = [
    "FAQ", "Help Centre", "Account", "Media Centre",
    "Investor Relations", "Jobs", "Ways to Watch", "Terms of Use",
    "Privacy", "Cookie Preferences", "Corporate Information", "Contact Us",
    "Speed Test", "Legal Notices", "Only on Netflix"
  ];

  return (
    <footer className="bg-black py-16  text-[#b3b3b3] text-[0.9rem]">
      {/* Container: Aligns with TrendingNow (max-w-[1240px] px-12) */}
      <div className="max-w-[1240px] mx-auto px-12">
        
        {/* Top Text */}
        <p className="mb-6">
          Questions? Call <a href="#" className="underline">000-800-919-1743</a>
        </p>

        {/* Link Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-4 mb-8">
          {links.map((link, index) => (
            <a 
              key={index} 
              href="#" 
              className="underline hover:text-white transition-colors duration-200 block mb-1"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Language Selector */}
        <div className="relative inline-block mb-6">
          <div className="flex items-center gap-2 bg-[#111] border border-[#555] px-4 py-1.5 rounded-[4px] text-white cursor-pointer hover:bg-[#222] transition-colors">
            <Globe size={16} />
            <span className="text-sm font-medium">English</span>
            <ChevronDown size={14} className="ml-1" />
          </div>
          {/* Hidden select for functionality if needed later */}
          <select className="absolute inset-0 opacity-0 cursor-pointer">
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>

        {/* Bottom Text */}
        <p className="text-[0.9rem]">Netflix India</p>

      </div>
    </footer>
  );
};

export default Footer;