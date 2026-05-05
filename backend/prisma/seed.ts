const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  const programs = [
    {
      title: 'Non-Formal Education',
      slug: 'non-formal-education',
      category: 'Education',
      description: 'VERC is one of the pioneering NGOs in Bangladesh in the field of children’s education program. We initiate models of community-run schools and adult education including innovative materials.',
      features: 'Community-run schools, Adult literacy, Child-centered learning',
    },
    {
      title: 'Water, Sanitation & Hygiene (WaSH)',
      slug: 'wash',
      category: 'WASH',
      description: 'Pioneered Community Led Total Sanitation (CLTS) in 2000. We work to prevent water and excreta-borne diseases through community awareness and participation.',
      features: 'CLTS Approach, Arsenic Mitigation, Hygiene Promotion',
    },
    {
      title: 'Health Program',
      slug: 'health-program',
      category: 'Health',
      description: 'Focuses on mother and child health services with priority to marginal segments of population. Operating hospitals in Savar and Mirsarai.',
      features: 'Mother & Child Hospital, Community Clinics, Primary Healthcare',
    },
    {
      title: 'Microfinance',
      slug: 'microfinance',
      category: 'Economic Development',
      description: 'Empowering marginalized people through financial inclusion and livelihood support projects.',
      features: 'Jagoron Program, Agrosor Program, Water Credit',
    },
  ];

  for (const p of programs) {
    await prisma.program.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }

  const stories = [
    {
      title: "Nilima's Success Story",
      slug: 'nilima-success',
      content: 'Nilima got married at a very early age to a blind day labor. Through VERC livelihood project, she started a venture and now supports her family independently.',
      location: 'Kaliakoir Upazila',
    },
    {
      title: "Combat with Arsenic",
      slug: 'combat-arsenic',
      content: 'Faruk observed black spots in his body in 2005. VERC’s WASH project helped him and his community access safe water and manage skin diseases.',
      location: 'Monoharganj Upazila',
    },
  ];

  for (const s of stories) {
    await prisma.successStory.upsert({
      where: { slug: s.slug },
      update: {},
      create: s,
    });
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
