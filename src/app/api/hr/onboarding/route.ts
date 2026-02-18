import { NextRequest, NextResponse } from 'next/server';

// Onboarding task interface
interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  category: 'documentation' | 'setup' | 'training' | 'introduction' | 'compliance';
  required: boolean;
  dueInDays: number;
  assignee: 'hr' | 'manager' | 'employee' | 'it';
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  completedAt?: string;
  notes?: string;
}

// Onboarding template
interface OnboardingTemplate {
  id: string;
  name: string;
  role: string;
  department: string;
  tasks: OnboardingTask[];
}

// Default onboarding templates
const defaultTemplates: OnboardingTemplate[] = [
  {
    id: 'standard',
    name: 'Standard Onboarding',
    role: 'all',
    department: 'all',
    tasks: [
      // Pre-boarding (Before Day 1)
      {
        id: 'offer-letter',
        title: 'Sign Offer Letter',
        description: 'Employee signs and returns the offer letter',
        category: 'documentation',
        required: true,
        dueInDays: -7,
        assignee: 'employee',
        status: 'pending',
      },
      {
        id: 'background-check',
        title: 'Background Check',
        description: 'Complete background verification',
        category: 'compliance',
        required: true,
        dueInDays: -5,
        assignee: 'hr',
        status: 'pending',
      },
      {
        id: 'id-documents',
        title: 'Submit ID Documents',
        description: 'Submit copies of NRC, education certificates, and other required documents',
        category: 'documentation',
        required: true,
        dueInDays: -3,
        assignee: 'employee',
        status: 'pending',
      },
      // Day 1
      {
        id: 'welcome-kit',
        title: 'Welcome Kit Distribution',
        description: 'Provide welcome kit with company materials',
        category: 'setup',
        required: false,
        dueInDays: 0,
        assignee: 'hr',
        status: 'pending',
      },
      {
        id: 'id-badge',
        title: 'Issue ID Badge',
        description: 'Create and issue employee ID badge',
        category: 'setup',
        required: true,
        dueInDays: 0,
        assignee: 'hr',
        status: 'pending',
      },
      {
        id: 'email-setup',
        title: 'Email Account Setup',
        description: 'Create company email account',
        category: 'setup',
        required: true,
        dueInDays: 0,
        assignee: 'it',
        status: 'pending',
      },
      {
        id: 'system-access',
        title: 'System Access Setup',
        description: 'Grant access to required systems and tools',
        category: 'setup',
        required: true,
        dueInDays: 0,
        assignee: 'it',
        status: 'pending',
      },
      {
        id: 'office-tour',
        title: 'Office Tour',
        description: 'Show around the office facilities',
        category: 'introduction',
        required: true,
        dueInDays: 0,
        assignee: 'hr',
        status: 'pending',
      },
      {
        id: 'team-intro',
        title: 'Team Introduction',
        description: 'Introduce to team members',
        category: 'introduction',
        required: true,
        dueInDays: 0,
        assignee: 'manager',
        status: 'pending',
      },
      // Week 1
      {
        id: 'company-policies',
        title: 'Review Company Policies',
        description: 'Review and acknowledge company policies and handbook',
        category: 'compliance',
        required: true,
        dueInDays: 3,
        assignee: 'employee',
        status: 'pending',
      },
      {
        id: 'safety-training',
        title: 'Safety Training',
        description: 'Complete workplace safety training',
        category: 'training',
        required: true,
        dueInDays: 5,
        assignee: 'employee',
        status: 'pending',
      },
      {
        id: 'job-training',
        title: 'Job-Specific Training',
        description: 'Begin role-specific training',
        category: 'training',
        required: true,
        dueInDays: 5,
        assignee: 'manager',
        status: 'pending',
      },
      // Month 1
      {
        id: '30-day-checkin',
        title: '30-Day Check-in',
        description: 'First month progress review',
        category: 'introduction',
        required: true,
        dueInDays: 30,
        assignee: 'manager',
        status: 'pending',
      },
      {
        id: 'benefits-enrollment',
        title: 'Benefits Enrollment',
        description: 'Complete benefits enrollment forms',
        category: 'documentation',
        required: true,
        dueInDays: 14,
        assignee: 'employee',
        status: 'pending',
      },
      // Month 3
      {
        id: 'probation-review',
        title: 'Probation Period Review',
        description: 'End of probation period evaluation',
        category: 'compliance',
        required: true,
        dueInDays: 90,
        assignee: 'manager',
        status: 'pending',
      },
    ],
  },
  {
    id: 'remote',
    name: 'Remote Employee Onboarding',
    role: 'all',
    department: 'all',
    tasks: [
      {
        id: 'remote-setup',
        title: 'Remote Work Setup',
        description: 'Set up home office equipment and internet',
        category: 'setup',
        required: true,
        dueInDays: -3,
        assignee: 'it',
        status: 'pending',
      },
      {
        id: 'vpn-access',
        title: 'VPN Access',
        description: 'Configure VPN for secure remote access',
        category: 'setup',
        required: true,
        dueInDays: 0,
        assignee: 'it',
        status: 'pending',
      },
      {
        id: 'communication-tools',
        title: 'Communication Tools Setup',
        description: 'Set up Slack, Zoom, and other communication tools',
        category: 'setup',
        required: true,
        dueInDays: 0,
        assignee: 'it',
        status: 'pending',
      },
      {
        id: 'virtual-meeting',
        title: 'Virtual Team Meeting',
        description: 'First virtual meeting with team',
        category: 'introduction',
        required: true,
        dueInDays: 0,
        assignee: 'manager',
        status: 'pending',
      },
    ],
  },
  {
    id: 'tech-role',
    name: 'Technical Role Onboarding',
    role: 'technical',
    department: 'technology',
    tasks: [
      {
        id: 'dev-environment',
        title: 'Development Environment Setup',
        description: 'Set up IDE, Git, and development tools',
        category: 'setup',
        required: true,
        dueInDays: 1,
        assignee: 'it',
        status: 'pending',
      },
      {
        id: 'code-access',
        title: 'Code Repository Access',
        description: 'Grant access to code repositories',
        category: 'setup',
        required: true,
        dueInDays: 1,
        assignee: 'manager',
        status: 'pending',
      },
      {
        id: 'architecture-overview',
        title: 'System Architecture Overview',
        description: 'Overview of system architecture and tech stack',
        category: 'training',
        required: true,
        dueInDays: 3,
        assignee: 'manager',
        status: 'pending',
      },
      {
        id: 'first-task',
        title: 'First Development Task',
        description: 'Assign first development task',
        category: 'training',
        required: true,
        dueInDays: 5,
        assignee: 'manager',
        status: 'pending',
      },
    ],
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      employeeId,
      employeeName,
      startDate,
      templateId = 'standard',
      department,
      role,
      customTasks = [],
    } = body;

    // Find base template
    const baseTemplate = defaultTemplates.find(t => t.id === templateId) || defaultTemplates[0];
    
    // Combine with role-specific tasks
    let tasks = [...baseTemplate.tasks];
    
    // Add department-specific tasks
    const deptTemplate = defaultTemplates.find(t => 
      t.department === department || t.role === role
    );
    if (deptTemplate) {
      tasks = [...tasks, ...deptTemplate.tasks.filter(t => 
        !tasks.some(existing => existing.id === t.id)
      )];
    }
    
    // Add custom tasks
    tasks = [...tasks, ...customTasks];

    // Create onboarding record
    const onboardingRecord = {
      id: `ONB-${Date.now()}`,
      employeeId,
      employeeName,
      startDate,
      department,
      role,
      tasks: tasks.map(t => ({
        ...t,
        dueDate: calculateDueDate(startDate, t.dueInDays),
      })),
      progress: {
        total: tasks.length,
        completed: 0,
        inProgress: 0,
        pending: tasks.length,
      },
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      onboarding: onboardingRecord,
      message: 'Onboarding checklist created successfully',
    });
  } catch (error) {
    console.error('Create onboarding error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create onboarding checklist' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const templateId = searchParams.get('template');

  if (templateId) {
    const template = defaultTemplates.find(t => t.id === templateId);
    if (template) {
      return NextResponse.json({
        success: true,
        template,
      });
    }
  }

  return NextResponse.json({
    success: true,
    templates: defaultTemplates.map(t => ({
      id: t.id,
      name: t.name,
      role: t.role,
      department: t.department,
      taskCount: t.tasks.length,
    })),
    categories: [
      { id: 'documentation', name: 'Documentation', icon: 'FileText' },
      { id: 'setup', name: 'Setup & Access', icon: 'Settings' },
      { id: 'training', name: 'Training', icon: 'GraduationCap' },
      { id: 'introduction', name: 'Introductions', icon: 'Users' },
      { id: 'compliance', name: 'Compliance', icon: 'Shield' },
    ],
    assignees: [
      { id: 'hr', name: 'HR Team' },
      { id: 'manager', name: 'Direct Manager' },
      { id: 'employee', name: 'Employee' },
      { id: 'it', name: 'IT Team' },
    ],
    myanmarRequirements: [
      'NRC (National Registration Card) copy',
      'Education certificates',
      'Previous employment certificates',
      'Medical fitness certificate',
      'Passport size photos (6)',
      'Bank account details for salary',
    ],
  });
}

// PUT endpoint for updating task status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { onboardingId, taskId, status, notes } = body;

    // In production, update database
    // For now, return success response

    return NextResponse.json({
      success: true,
      onboardingId,
      taskId,
      status,
      notes,
      updatedAt: new Date().toISOString(),
      message: `Task marked as ${status}`,
    });
  } catch (error) {
    console.error('Update task error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

function calculateDueDate(startDate: string, daysOffset: number): string {
  const start = new Date(startDate);
  start.setDate(start.getDate() + daysOffset);
  return start.toISOString().split('T')[0];
}
