import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Users, Target, Heart } from "lucide-react";

export default function Home() {
  const stats = [
    { label: "Years of Experience", value: "45+" },
    { label: "People Reached", value: "2M+" },
    { label: "Upazilas Covered", value: "50+" },
    { label: "Dedicated Staff", value: "1,500+" },
  ];

  const solutions = [
    {
      title: "Non-Formal Education",
      desc: "Innovative models of community-run schools and adult education.",
      href: "/solutions/education",
      icon: <CheckCircle2 className="text-brand-secondary" />,
    },
    {
      title: "WASH (Water & Sanitation)",
      desc: "Pioneering Community Led Total Sanitation (CLTS) since 2000.",
      href: "/solutions/wash",
      icon: <Target className="text-brand-secondary" />,
    },
    {
      title: "Health Program",
      desc: "Mother & Child hospitals and community-based health services.",
      href: "/solutions/health",
      icon: <Heart className="text-brand-secondary" />,
    },
    {
      title: "Microfinance",
      desc: "Empowering marginalized communities through economic self-reliance.",
      href: "/solutions/microfinance",
      icon: <Users className="text-brand-secondary" />,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center bg-brand-primary overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        {/* Placeholder for Hero Image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        
        <div className="container-custom relative z-20 text-white">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Empowering Communities for a Sustainable Future
            </h1>
            <p className="text-lg text-gray-200 mb-8 leading-relaxed">
              Village Education Resource Center (VERC) is transforming the lives of marginalized 
              communities in Bangladesh through education, health, and economic empowerment.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/about" className="btn-primary !bg-brand-secondary hover:!bg-brand-secondary/90">
                Learn Our Story
              </Link>
              <Link href="/get-involved" className="px-6 py-2 border-2 border-white rounded-md hover:bg-white hover:text-brand-primary transition-all font-semibold">
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl lg:text-4xl font-bold text-brand-primary mb-2">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-24 bg-brand-light">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Core Solutions</h2>
            <p className="text-gray-600">
              We address the most critical needs of rural and marginalized urban communities 
              through integrated development approaches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.map((item) => (
              <div key={item.title} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-brand-primary transition-colors">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  {item.desc}
                </p>
                <Link href={item.href} className="text-brand-primary font-semibold text-sm flex items-center gap-2">
                  View Program <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Story Section (Highlighting scraped content) */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="text-brand-secondary font-bold text-sm uppercase tracking-widest mb-4">Impact Story</div>
              <h2 className="text-4xl font-bold mb-6">Nilima's Journey to Self-Reliance</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Nilima, like many in her community, struggled with extreme poverty. Through VERC's 
                livelihood project, she received training and support to start her own venture. 
                Today, she is not only supporting her family but also empowering other women in her village.
              </p>
              <Link href="/impact/nilima-success" className="btn-primary inline-flex items-center gap-2">
                Read Full Story <ArrowRight size={18} />
              </Link>
            </div>
            <div className="flex-1 w-full h-[400px] bg-gray-200 rounded-2xl overflow-hidden relative">
              <Image 
                src="https://images.unsplash.com/photo-1531050170041-f88d748579f6?q=80&w=2070&auto=format&fit=crop" 
                alt="Impact Story" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
