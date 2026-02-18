import { NextRequest, NextResponse } from 'next/server';

// Analytics metrics interface
interface HRMetrics {
  hiring: {
    totalApplications: number;
    newApplications: number;
    screeningRate: number;
    interviewRate: number;
    offerRate: number;
    acceptanceRate: number;
    avgTimeToHire: number;
    avgCostPerHire: number;
  };
  employees: {
    total: number;
    newThisMonth: number;
    departuresThisMonth: number;
    turnoverRate: number;
    retentionRate: number;
    avgTenure: number;
  };
  diversity: {
    genderRatio: { male: number; female: number };
    ageGroups: Record<string, number>;
    departments: Record<string, number>;
  };
  recruitment: {
    sources: { source: string; count: number; conversionRate: number }[];
    topRoles: { role: string; applications: number; hires: number }[];
    bottlenecks: { stage: string; dropoff: number }[];
  };
  performance: {
    avgTimeToProductivity: number;
    trainingCompletionRate: number;
    employeeSatisfaction: number;
  };
}

// Mock data generator for demo
function generateMockMetrics(): HRMetrics {
  return {
    hiring: {
      totalApplications: 1247,
      newApplications: 156,
      screeningRate: 68.5,
      interviewRate: 32.4,
      offerRate: 18.2,
      acceptanceRate: 87.5,
      avgTimeToHire: 23,
      avgCostPerHire: 850000,
    },
    employees: {
      total: 156,
      newThisMonth: 8,
      departuresThisMonth: 3,
      turnoverRate: 12.5,
      retentionRate: 87.5,
      avgTenure: 2.3,
    },
    diversity: {
      genderRatio: { male: 62, female: 38 },
      ageGroups: {
        '18-25': 25,
        '26-35': 45,
        '36-45': 20,
        '46-55': 8,
        '55+': 2,
      },
      departments: {
        'Technology': 35,
        'Sales': 28,
        'Marketing': 18,
        'Operations': 32,
        'HR': 8,
        'Finance': 15,
        'Customer Service': 20,
      },
    },
    recruitment: {
      sources: [
        { source: 'ReferTRM Platform', count: 425, conversionRate: 28.5 },
        { source: 'LinkedIn', count: 312, conversionRate: 18.2 },
        { source: 'Job Portals', count: 280, conversionRate: 12.4 },
        { source: 'Employee Referrals', count: 156, conversionRate: 45.3 },
        { source: 'Career Fairs', count: 74, conversionRate: 22.1 },
      ],
      topRoles: [
        { role: 'Software Engineer', applications: 245, hires: 12 },
        { role: 'Sales Executive', applications: 189, hires: 8 },
        { role: 'Marketing Specialist', applications: 156, hires: 6 },
        { role: 'Customer Service', applications: 134, hires: 10 },
        { role: 'Operations Manager', applications: 98, hires: 4 },
      ],
      bottlenecks: [
        { stage: 'Application to Screening', dropoff: 31.5 },
        { stage: 'Screening to Interview', dropoff: 45.2 },
        { stage: 'Interview to Offer', dropoff: 65.8 },
        { stage: 'Offer to Acceptance', dropoff: 12.5 },
      ],
    },
    performance: {
      avgTimeToProductivity: 45,
      trainingCompletionRate: 92.3,
      employeeSatisfaction: 4.2,
    },
  };
}

// Time series data generator
function generateTimeSeriesData(months: number = 12) {
  const data = [];
  const now = new Date();
  
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    data.push({
      month: date.toLocaleString('en-US', { month: 'short', year: 'numeric' }),
      applications: Math.floor(Math.random() * 100) + 80,
      hires: Math.floor(Math.random() * 15) + 5,
      turnover: Math.random() * 5 + 1,
      satisfaction: Math.random() * 0.5 + 3.8,
    });
  }
  
  return data;
}

// Department performance data
function generateDepartmentData() {
  return [
    { department: 'Technology', headcount: 35, openRoles: 8, avgSalary: 1800000, satisfaction: 4.3 },
    { department: 'Sales', headcount: 28, openRoles: 5, avgSalary: 1200000, satisfaction: 4.0 },
    { department: 'Marketing', headcount: 18, openRoles: 3, avgSalary: 1100000, satisfaction: 4.2 },
    { department: 'Operations', headcount: 32, openRoles: 4, avgSalary: 950000, satisfaction: 3.9 },
    { department: 'Customer Service', headcount: 20, openRoles: 6, avgSalary: 550000, satisfaction: 4.1 },
    { department: 'Finance', headcount: 15, openRoles: 2, avgSalary: 1400000, satisfaction: 4.4 },
    { department: 'HR', headcount: 8, openRoles: 1, avgSalary: 1200000, satisfaction: 4.5 },
  ];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const period = searchParams.get('period') || 'month';
  const department = searchParams.get('department');

  const metrics = generateMockMetrics();
  const timeSeries = generateTimeSeriesData();
  const departmentData = generateDepartmentData();

  // Filter by department if specified
  let filteredDepartmentData = departmentData;
  if (department) {
    filteredDepartmentData = departmentData.filter(d => 
      d.department.toLowerCase() === department.toLowerCase()
    );
  }

  return NextResponse.json({
    success: true,
    metrics,
    timeSeries,
    departmentData: filteredDepartmentData,
    period,
    generatedAt: new Date().toISOString(),
    kpis: [
      {
        id: 'time-to-hire',
        name: 'Average Time to Hire',
        value: metrics.hiring.avgTimeToHire,
        unit: 'days',
        change: -5,
        trend: 'improving',
        target: 20,
      },
      {
        id: 'cost-per-hire',
        name: 'Cost per Hire',
        value: metrics.hiring.avgCostPerHire,
        unit: 'MMK',
        change: -3,
        trend: 'improving',
        target: 800000,
      },
      {
        id: 'turnover-rate',
        name: 'Turnover Rate',
        value: metrics.employees.turnoverRate,
        unit: '%',
        change: 1.2,
        trend: 'needs_attention',
        target: 10,
      },
      {
        id: 'retention-rate',
        name: 'Retention Rate',
        value: metrics.employees.retentionRate,
        unit: '%',
        change: -1.2,
        trend: 'stable',
        target: 90,
      },
      {
        id: 'acceptance-rate',
        name: 'Offer Acceptance Rate',
        value: metrics.hiring.acceptanceRate,
        unit: '%',
        change: 2.5,
        trend: 'improving',
        target: 85,
      },
      {
        id: 'employee-satisfaction',
        name: 'Employee Satisfaction',
        value: metrics.performance.employeeSatisfaction,
        unit: '/5',
        change: 0.1,
        trend: 'improving',
        target: 4.5,
      },
    ],
    recommendations: [
      {
        area: 'Recruitment Efficiency',
        suggestion: 'Consider reducing screening-to-interview dropoff rate by improving job descriptions',
        impact: 'high',
      },
      {
        area: 'Retention',
        suggestion: 'Implement stay interviews for employees with 2+ years tenure',
        impact: 'medium',
      },
      {
        area: 'Employee Referrals',
        suggestion: 'Increase referral bonus to leverage highest conversion source',
        impact: 'high',
      },
      {
        area: 'Training',
        suggestion: 'Focus on reducing time to productivity for new hires',
        impact: 'medium',
      },
    ],
    myanmarInsights: {
      topRecruitmentMonths: ['January', 'March', 'September'],
      commonNoticePeriod: '1 month',
      typicalWorkingHours: '9 AM - 5 PM',
      popularBenefits: ['Health Insurance', 'Transportation', 'Annual Bonus'],
    },
  });
}

// POST for custom analytics queries
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { startDate, endDate, departments, metrics: requestedMetrics } = body;

    // Generate custom analytics based on filters
    const customMetrics: Record<string, unknown> = {};
    
    if (requestedMetrics?.includes('hiring')) {
      customMetrics.hiring = {
        period: `${startDate} to ${endDate}`,
        applications: Math.floor(Math.random() * 500) + 200,
        hires: Math.floor(Math.random() * 30) + 10,
        avgTimeToHire: Math.floor(Math.random() * 10) + 18,
      };
    }

    if (requestedMetrics?.includes('turnover')) {
      customMetrics.turnover = {
        period: `${startDate} to ${endDate}`,
        voluntary: Math.floor(Math.random() * 5) + 2,
        involuntary: Math.floor(Math.random() * 3) + 1,
        rate: Math.random() * 5 + 8,
      };
    }

    return NextResponse.json({
      success: true,
      filters: { startDate, endDate, departments },
      metrics: customMetrics,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Custom analytics error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate custom analytics' },
      { status: 500 }
    );
  }
}
