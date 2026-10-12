import React from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Share2 } from "lucide-react";

// In a real app, this would be fetched from the NestJS API
const getStoryData = (slug: string) => {
  const stories: Record<string, any> = {
    "nilima-success": {
      title: "Nilima's Journey to Self-Reliance",
      location: "Kaliakoir Upazila",
      date: "October 2023",
      image: "https://images.unsplash.com/photo-1531050170041-f88d748579f6?q=80&w=2070&auto=format&fit=crop",
      content: `
        Nilima got married at a very early age to a blind day laborer. Life was a constant struggle for survival. 
        Through VERC's Livelihood Development Project, she received training in small-scale poultry farming 
        and a micro-loan to start her venture.

        Today, Nilima is not only supporting her blind husband and children's education but has also become 
        a role model for other women in Kaliakoir. She has expanded her farm and now provides fresh produce 
        to local markets. Her story is a testament to the power of community-led economic empowerment.
      `,
    },
    "combat-arsenic": {
      title: "Combat with Arsenic",
      location: "Monoharganj Upazila",
      date: "March 2024",
      image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=2069&auto=format&fit=crop",
      content: `
        Faruk observed black spots on his body in 2005. It was the beginning of arsenicosis. 
        VERC’s WASH project helped him and his community access safe water through deep tube wells 
        and taught them how to manage skin diseases.

        The project transformed Monoharganj from an arsenic-hit area to a resilient community 
        with 100% access to safe drinking water.
      `,
    },
  };

  return stories[slug] || stories["nilima-success"];
};

export default function ImpactStoryPage({ params }: { params: { slug: string } }) {
  const story = getStoryData(params.slug);

  return (
    <div className="bg-white pb-24">
      {/* Cover Image */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img src={story.image} alt={story.title} className="object-cover w-full h-full" />
        
        <div className="container-custom relative z-20 h-full flex flex-col justify-end pb-12 text-white">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-200 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Impact Stories
          </Link>
          <div className="flex items-center gap-6 text-sm mb-4">
            <span className="flex items-center gap-2"><MapPin size={16} /> {story.location}</span>
            <span className="flex items-center gap-2"><Calendar size={16} /> {story.date}</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold max-w-3xl">{story.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-12 py-6 border-y border-gray-100">
            <div className="text-gray-500 text-sm italic">Sharing the success of community empowerment</div>
            <button className="flex items-center gap-2 text-brand-primary font-semibold hover:underline">
              <Share2 size={18} /> Share Story
            </button>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            {story.content.split('\n\n').map((para: string, i: number) => (
              <p key={i}>{para.trim()}</p>
            ))}
          </div>

          <div className="mt-16 bg-brand-light p-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-4">Support More Stories Like This</h3>
            <p className="text-gray-600 mb-6">Your contribution helps VERC reach more people like Nilima and Faruk.</p>
            <Link href="/donate" className="btn-primary inline-block">
              Donate to VERC
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
