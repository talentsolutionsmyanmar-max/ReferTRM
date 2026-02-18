// Real Job Listings from Excel Files (January & February 2026)
// Source: Urgent Positions For January.xlsx, Urgent Positions For February 2026.xlsx

export interface Job {
  id: string;
  title: string;
  titleMm?: string;
  company: string;
  location: string;
  salary: string;
  salaryMin?: number;
  salaryMax?: number;
  reward: number; // Referral reward in thousands (MMK)
  skills: string[];
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  level: 'Entry' | 'Mid' | 'Senior' | 'Lead';
  urgent: boolean;
  posted: string;
  description?: string;
}

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Supervisor',
    company: 'RK Yangon Steel',
    location: 'Thanlyin',
    salary: '7.5 - 10 Lakhs',
    salaryMin: 750000,
    salaryMax: 1000000,
    reward: 300,
    skills: ['Leadership', 'Manufacturing', 'Management', 'Quality Control'],
    type: 'Full-time',
    level: 'Senior',
    urgent: true,
    posted: '2 days ago',
    description: 'Lead manufacturing operations and supervise production teams at our steel plant.'
  },
  {
    id: '2',
    title: 'Warehouse Supervisor',
    company: 'Universal Energy',
    location: 'Thingangyun',
    salary: 'Negotiable',
    reward: 200,
    skills: ['Inventory Management', 'Logistics', 'Team Leadership', 'SAP'],
    type: 'Full-time',
    level: 'Mid',
    urgent: false,
    posted: '1 day ago',
    description: 'Oversee warehouse operations, inventory control, and logistics coordination.'
  },
  {
    id: '3',
    title: 'Content & Script Writer',
    company: 'Shwe Taung Htun',
    location: 'Mingalar Taung Nyunt',
    salary: '4 - 6 Lakhs',
    salaryMin: 400000,
    salaryMax: 600000,
    reward: 150,
    skills: ['Content Writing', 'Creative Writing', 'Burmese', 'Social Media'],
    type: 'Full-time',
    level: 'Mid',
    urgent: false,
    posted: '3 days ago',
    description: 'Create engaging content and scripts for marketing campaigns and social media.'
  },
  {
    id: '4',
    title: 'Site Engineer',
    company: 'Sun Myat Tun',
    location: 'Botahtaung',
    salary: '7.5 Lakhs',
    salaryMin: 750000,
    salaryMax: 750000,
    reward: 250,
    skills: ['Civil Engineering', 'Construction', 'AutoCAD', 'Project Management'],
    type: 'Full-time',
    level: 'Senior',
    urgent: true,
    posted: '1 day ago',
    description: 'Manage construction site operations and ensure quality standards.'
  },
  {
    id: '5',
    title: 'Data Collector',
    company: 'NielsenIQ Myanmar',
    location: 'Mandalay, Sagaing, Meikhtila',
    salary: '3.5 Lakhs',
    salaryMin: 350000,
    salaryMax: 350000,
    reward: 100,
    skills: ['Data Collection', 'Research', 'Communication', 'Mobile Apps'],
    type: 'Full-time',
    level: 'Entry',
    urgent: false,
    posted: '4 days ago',
    description: 'Collect market research data across multiple regions in Myanmar.'
  },
  {
    id: '6',
    title: 'Loan Officer',
    company: 'Real Aid Microfinance',
    location: 'Ayeyarwady',
    salary: '4 - 5 Lakhs',
    salaryMin: 400000,
    salaryMax: 500000,
    reward: 150,
    skills: ['Finance', 'Customer Service', 'Sales', 'Risk Assessment'],
    type: 'Full-time',
    level: 'Mid',
    urgent: false,
    posted: '3 days ago',
    description: 'Process loan applications and manage client relationships in the Ayeyarwady region.'
  },
  {
    id: '7',
    title: 'Cashier',
    company: 'Real Aid Microfinance',
    location: 'Ayeyarwady',
    salary: 'Above 3 Lakhs',
    salaryMin: 300000,
    salaryMax: 400000,
    reward: 80,
    skills: ['Cash Handling', 'Customer Service', 'Basic Accounting', 'Excel'],
    type: 'Full-time',
    level: 'Entry',
    urgent: false,
    posted: '5 days ago',
    description: 'Handle cash transactions and maintain accurate financial records.'
  },
  {
    id: '8',
    title: 'Brand Executive',
    company: 'Unicharm Myanmar',
    location: 'Yankin',
    salary: '7 - 9 Lakhs',
    salaryMin: 700000,
    salaryMax: 900000,
    reward: 250,
    skills: ['Brand Management', 'Marketing', 'FMCG', 'Market Analysis'],
    type: 'Full-time',
    level: 'Mid',
    urgent: true,
    posted: '2 days ago',
    description: 'Execute brand strategies and manage product portfolios for FMCG products.'
  },
  {
    id: '9',
    title: 'Assistant Brand Manager',
    company: 'Unicharm Myanmar',
    location: 'Yankin',
    salary: '15 - 17 Lakhs',
    salaryMin: 1500000,
    salaryMax: 1700000,
    reward: 400,
    skills: ['Brand Strategy', 'Marketing', 'Team Leadership', 'Budget Management'],
    type: 'Full-time',
    level: 'Senior',
    urgent: true,
    posted: '1 day ago',
    description: 'Lead brand development initiatives and manage marketing campaigns.'
  },
  {
    id: '10',
    title: 'Receptionist',
    company: 'Myanmar Information Technology',
    location: 'Insein',
    salary: '3 - 4 Lakhs',
    salaryMin: 300000,
    salaryMax: 400000,
    reward: 80,
    skills: ['Communication', 'Microsoft Office', 'Customer Service', 'Phone Etiquette'],
    type: 'Full-time',
    level: 'Entry',
    urgent: false,
    posted: '1 week ago',
    description: 'Manage front desk operations and provide administrative support.'
  },
  {
    id: '11',
    title: 'Assistant Accountant',
    company: 'KBZ Life Insurance',
    location: 'Bahan',
    salary: '4 - 5 Lakhs',
    salaryMin: 400000,
    salaryMax: 500000,
    reward: 150,
    skills: ['Accounting', 'Excel', 'Financial Reporting', 'Attention to Detail'],
    type: 'Full-time',
    level: 'Entry',
    urgent: false,
    posted: '4 days ago',
    description: 'Support accounting operations and prepare financial documents.'
  },
  {
    id: '12',
    title: 'Accountant',
    company: 'Universal Energy',
    location: 'Thingangyun',
    salary: '6 - 7 Lakhs',
    salaryMin: 600000,
    salaryMax: 700000,
    reward: 200,
    skills: ['Accounting', 'Tax', 'Financial Analysis', 'SAP'],
    type: 'Full-time',
    level: 'Mid',
    urgent: false,
    posted: '3 days ago',
    description: 'Manage financial records, prepare reports, and ensure compliance.'
  },
  {
    id: '13',
    title: 'Online Sale Executive',
    company: 'Salpyar',
    location: 'North Dagon',
    salary: '2.4 Lakhs',
    salaryMin: 240000,
    salaryMax: 240000,
    reward: 60,
    skills: ['E-commerce', 'Sales', 'Social Media', 'Customer Service'],
    type: 'Full-time',
    level: 'Entry',
    urgent: false,
    posted: '1 week ago',
    description: 'Manage online sales channels and customer inquiries.'
  },
  {
    id: '14',
    title: 'Graphic Designer',
    company: 'WOW Sport',
    location: 'Kamaryut',
    salary: 'Around 10 Lakhs',
    salaryMin: 1000000,
    salaryMax: 1000000,
    reward: 250,
    skills: ['Adobe Creative Suite', 'Design', 'Illustration', 'Social Media Graphics'],
    type: 'Full-time',
    level: 'Mid',
    urgent: false,
    posted: '5 days ago',
    description: 'Create visual designs for marketing materials and social media.'
  },
  {
    id: '15',
    title: 'Senior Sales Executive',
    company: 'WOW Sport',
    location: 'Kamaryut',
    salary: '10 Lakhs',
    salaryMin: 1000000,
    salaryMax: 1000000,
    reward: 280,
    skills: ['Sales', 'Negotiation', 'Retail', 'Customer Relationship'],
    type: 'Full-time',
    level: 'Senior',
    urgent: true,
    posted: '2 days ago',
    description: 'Drive sales growth and manage key customer relationships.'
  },
  {
    id: '16',
    title: 'Senior Agency Sales Representative',
    company: 'AMI',
    location: 'Kamaryut',
    salary: '5 - 6.5 Lakhs',
    salaryMin: 500000,
    salaryMax: 650000,
    reward: 180,
    skills: ['Sales', 'Insurance', 'Relationship Building', 'Presentation'],
    type: 'Full-time',
    level: 'Mid',
    urgent: false,
    posted: '4 days ago',
    description: 'Develop and manage insurance agency partnerships.'
  },
  {
    id: '17',
    title: 'Admin Supervisor',
    company: 'TOMO',
    location: 'South Dagon',
    salary: '5 - 6 Lakhs',
    salaryMin: 500000,
    salaryMax: 600000,
    reward: 170,
    skills: ['Administration', 'Team Management', 'MS Office', 'Organization'],
    type: 'Full-time',
    level: 'Mid',
    urgent: false,
    posted: '3 days ago',
    description: 'Supervise administrative operations and support team coordination.'
  },
  {
    id: '18',
    title: 'IT Supervisor',
    company: 'Wave Plus',
    location: 'Mingalardon',
    salary: '6 Lakhs',
    salaryMin: 600000,
    salaryMax: 600000,
    reward: 200,
    skills: ['IT Support', 'Network Administration', 'Troubleshooting', 'Hardware'],
    type: 'Full-time',
    level: 'Mid',
    urgent: true,
    posted: '1 day ago',
    description: 'Manage IT infrastructure and provide technical support.'
  },
  {
    id: '19',
    title: 'Sales Staff',
    company: 'Yangoods',
    location: 'Pyin Oo Lwin',
    salary: '2.04 Lakhs',
    salaryMin: 204000,
    salaryMax: 204000,
    reward: 50,
    skills: ['Sales', 'Customer Service', 'Retail', 'Product Knowledge'],
    type: 'Full-time',
    level: 'Entry',
    urgent: false,
    posted: '1 week ago',
    description: 'Assist customers and drive sales in retail environment.'
  },
  {
    id: '20',
    title: 'Senior Page Admin',
    company: 'TOMO',
    location: 'Tamwe',
    salary: 'Negotiable',
    reward: 200,
    skills: ['Social Media Management', 'Content Creation', 'Analytics', 'Marketing'],
    type: 'Full-time',
    level: 'Senior',
    urgent: false,
    posted: '3 days ago',
    description: 'Manage social media pages and develop content strategies.'
  },
  {
    id: '21',
    title: 'Junior Page Admin',
    company: 'TOMO',
    location: 'Tamwe',
    salary: '3 - 3.5 Lakhs',
    salaryMin: 300000,
    salaryMax: 350000,
    reward: 90,
    skills: ['Social Media', 'Content Creation', 'Canva', 'Communication'],
    type: 'Full-time',
    level: 'Entry',
    urgent: false,
    posted: '4 days ago',
    description: 'Support social media management and content creation.'
  },
  {
    id: '22',
    title: 'Junior Accountant',
    company: 'Unicharm Myanmar',
    location: 'Yankin',
    salary: '3.5 - 4 Lakhs',
    salaryMin: 350000,
    salaryMax: 400000,
    reward: 100,
    skills: ['Accounting', 'Excel', 'Data Entry', 'Financial Records'],
    type: 'Full-time',
    level: 'Entry',
    urgent: false,
    posted: '5 days ago',
    description: 'Support accounting team with daily financial operations.'
  },
  {
    id: '23',
    title: 'Accountant',
    company: 'GK International Company',
    location: 'Kamaryut',
    salary: '6.5 - 8 Lakhs',
    salaryMin: 650000,
    salaryMax: 800000,
    reward: 220,
    skills: ['Accounting', 'Tax', 'Financial Reports', 'ERP'],
    type: 'Full-time',
    level: 'Mid',
    urgent: false,
    posted: '2 days ago',
    description: 'Manage financial accounting and reporting functions.'
  },
  {
    id: '24',
    title: 'Assistant Project Coordinator',
    company: 'GK International Company',
    location: 'Kamaryut',
    salary: '3.5 - 5 Lakhs',
    salaryMin: 350000,
    salaryMax: 500000,
    reward: 130,
    skills: ['Project Management', 'Coordination', 'Communication', 'Documentation'],
    type: 'Full-time',
    level: 'Entry',
    urgent: false,
    posted: '4 days ago',
    description: 'Support project coordination and documentation.'
  },
  {
    id: '25',
    title: 'Interior Designer',
    company: 'Delight Amatat',
    location: 'Thingangyun',
    salary: '10 - 15 Lakhs',
    salaryMin: 1000000,
    salaryMax: 1500000,
    reward: 350,
    skills: ['Interior Design', 'AutoCAD', '3D Modeling', 'SketchUp'],
    type: 'Full-time',
    level: 'Senior',
    urgent: true,
    posted: '1 day ago',
    description: 'Design interior spaces and create detailed drawings.'
  },
  {
    id: '26',
    title: 'Quantity Surveyor',
    company: 'Delight Amatat',
    location: 'Thingangyun',
    salary: '10 - 15 Lakhs',
    salaryMin: 1000000,
    salaryMax: 1500000,
    reward: 350,
    skills: ['Quantity Surveying', 'Construction', 'Cost Estimation', 'Measurement'],
    type: 'Full-time',
    level: 'Senior',
    urgent: true,
    posted: '1 day ago',
    description: 'Prepare cost estimates and manage construction quantities.'
  }
];

// Helper functions
export function getJobsByLevel(level: Job['level']): Job[] {
  return jobs.filter(job => job.level === level);
}

export function getJobsByCompany(company: string): Job[] {
  return jobs.filter(job => job.company.toLowerCase().includes(company.toLowerCase()));
}

export function getUrgentJobs(): Job[] {
  return jobs.filter(job => job.urgent);
}

export function getJobsByLocation(location: string): Job[] {
  return jobs.filter(job => job.location.toLowerCase().includes(location.toLowerCase()));
}

export function getTotalRewards(): number {
  return jobs.reduce((sum, job) => sum + job.reward, 0);
}

export function getJobStats() {
  return {
    total: jobs.length,
    urgent: jobs.filter(j => j.urgent).length,
    totalRewards: getTotalRewards(),
    byLevel: {
      Entry: jobs.filter(j => j.level === 'Entry').length,
      Mid: jobs.filter(j => j.level === 'Mid').length,
      Senior: jobs.filter(j => j.level === 'Senior').length,
    },
    companies: [...new Set(jobs.map(j => j.company))].length,
  };
}
