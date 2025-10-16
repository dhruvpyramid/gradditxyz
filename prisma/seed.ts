import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Add admin user
  await prisma.admin.create({
    data: {
      email: 'dhruv@example.com',
    },
  })

  // Add test colleges
  const colleges = [
    {
      name: 'IIT Delhi',
      email: 'info@iitd.ac.in',
      website: 'https://home.iitd.ac.in',
      description: 'Premier engineering institute in Delhi',
      category: 'Engineering',
      city: 'New Delhi',
      state: 'Delhi',
    },
    {
      name: 'IIT Bombay',
      email: 'info@iitb.ac.in',
      website: 'https://www.iitb.ac.in',
      description: 'Leading technical university in Mumbai',
      category: 'Engineering',
      city: 'Mumbai',
      state: 'Maharashtra',
    },
    {
      name: 'AIIMS Delhi',
      email: 'info@aiims.edu',
      website: 'https://www.aiims.edu',
      description: 'Top medical institute in India',
      category: 'Medical',
      city: 'New Delhi',
      state: 'Delhi',
    },
    {
      name: 'St. Stephens College',
      email: 'principal@ststephens.edu',
      website: 'https://www.ststephens.edu',
      description: 'Premier arts and science college',
      category: 'Arts',
      city: 'New Delhi',
      state: 'Delhi',
    },
    {
      name: 'BITS Pilani',
      email: 'info@bits-pilani.ac.in',
      website: 'https://www.bits-pilani.ac.in',
      description: 'Renowned private engineering institute',
      category: 'Engineering',
      city: 'Pilani',
      state: 'Rajasthan',
    },
    {
      name: 'IIM Ahmedabad',
      email: 'info@iima.ac.in',
      website: 'https://www.iima.ac.in',
      description: 'Top management institute in India',
      category: 'Management',
      city: 'Ahmedabad',
      state: 'Gujarat',
    },
    {
      name: 'Delhi University',
      email: 'info@du.ac.in',
      website: 'https://www.du.ac.in',
      description: 'Central university with multiple colleges',
      category: 'Arts',
      city: 'New Delhi',
      state: 'Delhi',
    },
    {
      name: 'IIT Madras',
      email: 'info@iitm.ac.in',
      website: 'https://www.iitm.ac.in',
      description: 'Top ranked IIT in Chennai',
      category: 'Engineering',
      city: 'Chennai',
      state: 'Tamil Nadu',
    },
    {
      name: 'NIT Trichy',
      email: 'info@nitt.edu',
      website: 'https://www.nitt.edu',
      description: 'National Institute of Technology',
      category: 'Engineering',
      city: 'Tiruchirappalli',
      state: 'Tamil Nadu',
    },
    {
      name: 'Jadavpur University',
      email: 'info@jadavpuruniversity.in',
      website: 'https://www.jadavpuruniversity.in',
      description: 'Premier state university in Kolkata',
      category: 'Engineering',
      city: 'Kolkata',
      state: 'West Bengal',
    },
  ]

  for (const college of colleges) {
    await prisma.college.create({
      data: college,
    })
  }

  console.log('✅ Seeded 1 admin and 10 colleges')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
