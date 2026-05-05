import React from "react";
import { Users, Shield, Target, Award } from "lucide-react";

export default function AboutPage() {
  const values = [
    { title: "Transparency", desc: "We maintain absolute transparency in our financial and operational processes.", icon: Shield },
    { title: "Impact", desc: "Every project is designed for measurable and sustainable community impact.", icon: Target },
    { title: "Inclusion", desc: "We prioritize the most marginalized segments of society without bias.", icon: Users },
    { title: "Excellence", desc: "Committed to delivering high-quality education and healthcare services.", icon: Award },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-brand-primary py-24 text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Our Legacy of Change</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Since 1977, VERC has been dedicated to empowering communities and transforming lives 
            across Bangladesh through grassroots development.
          </p>
        </div>
      </section>

      {/* History */}
      <section className="py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-brand-primary">Our History</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  Village Education Resource Center (VERC) started its journey as a project of Save the Children 
                  (USA) in 1977. Since then, it has evolved into a leading national NGO, pioneering 
                  community-led approaches in education, health, and sanitation.
                </p>
                <p>
                  Our work in Water, Sanitation and Hygiene (WASH) is globally recognized for the 
                  Community Led Total Sanitation (CLTS) model, which was born in Rajshahi in 2000 
                  and has now been adopted in over 50 countries worldwide.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-3xl h-[400px] flex items-center justify-center text-gray-400 italic">
              [Image: VERC Historical Milestone]
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-brand-light">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-500">The principles that guide our daily operations and long-term vision.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div key={v.title} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-brand-primary mb-6"><v.icon size={32} /></div>
                <h3 className="text-xl font-bold mb-4">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
