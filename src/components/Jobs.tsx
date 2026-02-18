'use client';

import { motion } from 'framer-motion';
import { MapPin, Banknote, Send, Clock, Building2, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Job {
  id: string;
  title: string;
  titleMm?: string;
  company: string;
  location: string;
  locationMm?: string;
  salary: string;
  salaryMm?: string;
  reward: number;
  skills: string[];
  type: string;
  urgent: boolean;
}

// Real job data from Urgent Positions For January.xlsx
const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Supervisor',
    company: 'RK Yangon Steel',
    location: 'Thanlyin',
    salary: '7.5 - 10 Lakhs',
    reward: 300,
    skills: ['Leadership', 'Manufacturing', 'Team Management'],
    type: 'Full-time',
    urgent: true,
  },
  {
    id: '2',
    title: 'Warehouse Supervisor',
    company: 'Universal Energy',
    location: 'Thingangyun',
    salary: 'Negotiable',
    reward: 200,
    skills: ['Inventory', 'Logistics', 'Operations'],
    type: 'Full-time',
    urgent: false,
  },
  {
    id: '3',
    title: 'Content & Script Writer',
    company: 'Shwe Taung Htun',
    location: 'Mingalar Taung Nyunt',
    salary: '4 - 6 Lakhs',
    reward: 150,
    skills: ['Content Writing', 'Creative', 'Marketing'],
    type: 'Full-time',
    urgent: false,
  },
  {
    id: '4',
    title: 'Site Engineer',
    company: 'Sun Myat Tun',
    location: 'Botahtaung',
    salary: '7.5 Lakhs',
    reward: 250,
    skills: ['Engineering', 'Construction', 'Project Management'],
    type: 'Full-time',
    urgent: true,
  },
  {
    id: '5',
    title: 'Data Collector',
    company: 'NielsenIQ Myanmar',
    location: 'Mdy, Sagaing, Meikhtila',
    salary: '3.5 Lakhs',
    reward: 100,
    skills: ['Data Entry', 'Research', 'Field Work'],
    type: 'Full-time',
    urgent: false,
  },
  {
    id: '6',
    title: 'Loan Officer',
    company: 'Real Aid Microfinance',
    location: 'Ayeyarwady',
    salary: '4 - 5 Lakhs',
    reward: 150,
    skills: ['Finance', 'Customer Service', 'Sales'],
    type: 'Full-time',
    urgent: false,
  },
  {
    id: '7',
    title: 'Brand Executive',
    company: 'Unicharm Myanmar',
    location: 'Yankin',
    salary: '7 - 9 Lakhs',
    reward: 200,
    skills: ['Branding', 'Marketing', 'FMCG'],
    type: 'Full-time',
    urgent: false,
  },
  {
    id: '8',
    title: 'Assistant Brand Manager',
    company: 'Unicharm Myanmar',
    location: 'Yankin',
    salary: '15 - 17 Lakhs',
    reward: 400,
    skills: ['Brand Management', 'Marketing Strategy', 'Team Leadership'],
    type: 'Full-time',
    urgent: true,
  },
  {
    id: '9',
    title: 'Graphic Designer',
    company: 'WOW Sport',
    location: 'Kamaryut',
    salary: 'Around 10 Lakhs',
    reward: 200,
    skills: ['Adobe Suite', 'Creative Design', 'Visual Arts'],
    type: 'Full-time',
    urgent: false,
  },
  {
    id: '10',
    title: 'Senior Sales Executive',
    company: 'WOW Sport',
    location: 'Kamaryut',
    salary: '10 Lakhs',
    reward: 250,
    skills: ['Sales', 'B2B', 'Negotiation'],
    type: 'Full-time',
    urgent: true,
  },
  {
    id: '11',
    title: 'IT Supervisor',
    company: 'Wave Plus',
    location: 'Mingalardon',
    salary: '6 Lakhs',
    reward: 180,
    skills: ['IT Support', 'Networking', 'Troubleshooting'],
    type: 'Full-time',
    urgent: false,
  },
  {
    id: '12',
    title: 'Interior Designer',
    company: 'Delight Amatat',
    location: 'Thingangyun',
    salary: '10 - 15 Lakhs',
    reward: 350,
    skills: ['Interior Design', 'AutoCAD', 'Creative'],
    type: 'Full-time',
    urgent: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Jobs() {
  const handleRefer = (job: Job) => {
    const message = encodeURIComponent(
      `Hello! I want to refer a candidate for: ${job.title} at ${job.company}\n\nJob ID: ${job.id}`
    );
    window.open(`https://t.me/ReferTRM?text=${message}`, '_blank');
  };

  return (
    <section id="jobs" className="py-16 px-4 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-gradient-teal">Urgent Positions</span>
          </h2>
          <p className="text-lg text-slate-400 mb-1">January 2025 Openings</p>
          <p className="text-slate-500 burmese-text">ဇန်နဝါရီ ၂၀၂၅ အလုပ်နေရာများ</p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          <div className="glass-card px-6 py-3 text-center">
            <div className="text-2xl font-bold text-teal-400">{jobs.length}</div>
            <div className="text-sm text-slate-400">Open Positions</div>
          </div>
          <div className="glass-card px-6 py-3 text-center">
            <div className="text-2xl font-bold text-amber-400">{jobs.filter(j => j.urgent).length}</div>
            <div className="text-sm text-slate-400">Urgent</div>
          </div>
          <div className="glass-card px-6 py-3 text-center">
            <div className="text-2xl font-bold text-green-400">50K</div>
            <div className="text-sm text-slate-400">Success Fee</div>
          </div>
        </motion.div>

        {/* Jobs Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {jobs.map((job) => (
            <motion.div key={job.id} variants={itemVariants}>
              <Card className="glass-card-hover h-full group">
                <CardContent className="p-5">
                  {/* Job Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors">
                          {job.title}
                        </h3>
                        {job.urgent && (
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                            <Flame className="h-3 w-3 mr-1" />
                            Urgent
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Badge variant="outline" className="border-teal-500/50 text-teal-400">
                      {job.type}
                    </Badge>
                  </div>

                  {/* Company */}
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <Building2 className="h-4 w-4" />
                    <span>{job.company}</span>
                  </div>

                  {/* Location & Salary */}
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <MapPin className="h-3.5 w-3.5 text-teal-400" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <Banknote className="h-3.5 w-3.5 text-amber-400" />
                      <span>{job.salary} MMK</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {job.skills.slice(0, 2).map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-slate-800 text-slate-300 text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {job.skills.length > 2 && (
                      <Badge variant="secondary" className="bg-slate-800 text-slate-400 text-xs">
                        +{job.skills.length - 2}
                      </Badge>
                    )}
                  </div>

                  {/* Reward */}
                  <div className="mb-3 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <div className="text-amber-400 font-bold">
                      Refer & Earn {job.reward}K MMK
                    </div>
                    <div className="text-slate-500 text-xs">
                      Company pays 50K success fee
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    className="w-full btn-teal text-sm"
                    onClick={() => handleRefer(job)}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Refer via Telegram
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Button variant="outline" className="btn-outline-teal">
            View All Positions
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
