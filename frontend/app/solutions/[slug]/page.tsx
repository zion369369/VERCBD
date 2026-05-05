import React from "react";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

// In a real app, this would be fetched from the NestJS API
const getProgramData = (slug: string) => {
  const programs: Record<string, any> = {
    "education": {
      title: "Non-Formal Education",
      category: "Education",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
      description: "VERC is one of the pioneering NGOs in Bangladesh in the field of children’s education program which has later been adapted and replicated by many other development organizations. We focus on community-run schools and adult education models.",
      features: [
        "Community-run school models",
        "Adult literacy and functional education",
        "Child-centered learning materials",
        "Pre-primary and primary education support",
      ],
    },
    "wash": {
      title: "Water, Sanitation & Hygiene (WaSH)",
      category: "WASH",
      image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=2069&auto=format&fit=crop",
      description: "VERC introduced the Community Led Total Sanitation (CLTS) approach in February 2000 as a pioneering organization in Bangladesh. We believe community participation is key to preventing water-borne diseases.",
      features: [
        "100% Sanitation coverage initiatives",
        "Safe water access (Arsenic mitigation)",
        "School-based hygiene education",
        "Menstrual hygiene management",
      ],
    },
  };

  return programs[slug] || programs["education"];
};

export default function ProgramPage({ params }: { params: { slug: string } }) {
  const program = getProgramData(params.slug);

  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="bg-brand-primary py-20 text-white">
        <div className="container-custom">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="text-brand-secondary font-bold text-sm uppercase tracking-widest mb-4">
            Our Solutions / {program.category}
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold">{program.title}</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6">Overview</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-8">
              {program.description}
            </p>
            
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {program.features.map((feature: string) => (
                <li key={feature} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 size={20} className="text-brand-secondary flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-brand-light p-8 rounded-2xl sticky top-28">
              <h3 className="text-xl font-bold mb-6 text-brand-primary">How you can help</h3>
              <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                Your support directly impacts the lives of thousands of people in rural Bangladesh. 
                Partner with us to create a lasting change.
              </p>
              <button className="w-full btn-primary mb-4">Donate Now</button>
              <button className="w-full px-6 py-2 border-2 border-brand-primary text-brand-primary rounded-md font-semibold hover:bg-brand-primary hover:text-white transition-all">
                Partner With Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Image */}
      <div className="container-custom pb-20">
        <div className="relative h-[400px] w-full rounded-2xl overflow-hidden">
          <img 
            src={program.image} 
            alt={program.title} 
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
