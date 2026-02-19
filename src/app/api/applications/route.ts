import { NextRequest, NextResponse } from 'next/server';

// Application status timeline storage
interface StatusUpdate {
  id: string;
  applicationId: string;
  status: 'submitted' | 'viewed' | 'screening' | 'interview_scheduled' | 'interview_completed' | 'offer_sent' | 'hired' | 'rejected' | 'withdrawn';
  statusMy: string;
  message: string;
  messageMy: string;
  timestamp: string;
  actor?: {
    type: 'system' | 'hr' | 'candidate';
    name?: string;
  };
}

interface Application {
  id: string;
  candidateId: string;
  candidateName: string;
  jobId: string;
  jobTitle: string;
  company: string;
  status: StatusUpdate['status'];
  statusHistory: StatusUpdate[];
  referralId?: string;
  referrerId?: string;
  createdAt: string;
  updatedAt: string;
}

const applicationStore = new Map<string, Application>();

const statusTranslations: Record<string, { en: string; my: string }> = {
  submitted: { en: 'Application Submitted', my: 'လျှောက်လွှာ တင်သွင်းပြီးပါပြီ' },
  viewed: { en: 'Application Viewed', my: 'လျှောက်လွှာ ကြည့်ရှုပြီးပါပြီ' },
  screening: { en: 'Under Screening', my: 'စစ်ဆေးမှု လုပ်ဆောင်နေပါသည်' },
  interview_scheduled: { en: 'Interview Scheduled', my: 'အင်တာဗျူး စီစဉ်ပြီးပါပြီ' },
  interview_completed: { en: 'Interview Completed', my: 'အင်တာဗျူး ပြီးမြောက်ပါပြီ' },
  offer_sent: { en: 'Offer Letter Sent', my: 'အလုပ်ကမ်းလှမ်းစာ ပို့ပြီးပါပြီ' },
  hired: { en: 'Hired', my: 'အလုပ်ရရှိပါပြီ' },
  rejected: { en: 'Application Rejected', my: 'လျှောက်လွှာ ငြင်းပယ်ခံရပါသည်' },
  withdrawn: { en: 'Application Withdrawn', my: 'လျှောက်လွှာ ပြန်တင်သွင်းပြီးပါပြီ' },
};

// Sample applications
const sampleApplications: Application[] = [
  {
    id: 'app_001',
    candidateId: 'demo_user',
    candidateName: 'Demo User',
    jobId: 'job_001',
    jobTitle: 'Software Developer',
    company: 'KBZ Bank',
    status: 'interview_scheduled',
    statusHistory: [
      {
        id: 'status_001',
        applicationId: 'app_001',
        status: 'submitted',
        statusMy: statusTranslations.submitted.my,
        message: 'Application submitted successfully',
        messageMy: 'လျှောက်လွှာ အောင်မြင်စွာ တင်သွင်းပြီးပါပြီ',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
        actor: { type: 'candidate', name: 'Demo User' },
      },
      {
        id: 'status_002',
        applicationId: 'app_001',
        status: 'viewed',
        statusMy: statusTranslations.viewed.my,
        message: 'HR viewed your application',
        messageMy: 'HR သည် သင့်လျှောက်လွှာကို ကြည့်ရှုပြီးပါပြီ',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        actor: { type: 'hr', name: 'KBZ Bank HR' },
      },
      {
        id: 'status_003',
        applicationId: 'app_001',
        status: 'interview_scheduled',
        statusMy: statusTranslations.interview_scheduled.my,
        message: 'Interview scheduled for Feb 20, 2025 at 10:00 AM',
        messageMy: 'ဖေဖော်ဝါရီ ၂၀၊ ၂၀၂၅ မနက် ၁၀ နာရီတွင် အင်တာဗျူး စီစဉ်ထားပါသည်',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        actor: { type: 'hr', name: 'KBZ Bank HR' },
      },
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
];

sampleApplications.forEach(app => applicationStore.set(app.id, app));

function generateId(): string {
  return `status_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get('applicationId');
    const candidateId = searchParams.get('candidateId');
    const lastUpdate = searchParams.get('lastUpdate');

    if (applicationId) {
      const app = applicationStore.get(applicationId);
      if (!app) {
        return NextResponse.json({ success: false, error: 'Application not found' }, { status: 404 });
      }

      if (lastUpdate) {
        const lastUpdateTime = new Date(lastUpdate).getTime();
        const hasUpdates = app.statusHistory.some(s => new Date(s.timestamp).getTime() > lastUpdateTime);
        return NextResponse.json({ success: true, hasUpdates, application: app });
      }

      return NextResponse.json({ success: true, application: app });
    }

    let applications = Array.from(applicationStore.values());
    if (candidateId) {
      applications = applications.filter(a => a.candidateId === candidateId);
    }

    applications.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    return NextResponse.json({ success: true, applications });
  } catch (error) {
    console.error('Applications GET error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch applications' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { applicationId, newStatus, message, candidateId, jobId, jobTitle, company, candidateName } = body;

    if (applicationId && newStatus) {
      const app = applicationStore.get(applicationId);
      if (!app) {
        return NextResponse.json({ success: false, error: 'Application not found' }, { status: 404 });
      }

      const statusUpdate: StatusUpdate = {
        id: generateId(),
        applicationId,
        status: newStatus,
        statusMy: statusTranslations[newStatus]?.my || newStatus,
        message: message || `Status updated to ${statusTranslations[newStatus]?.en || newStatus}`,
        messageMy: statusTranslations[newStatus]?.my || newStatus,
        timestamp: new Date().toISOString(),
        actor: { type: 'hr' },
      };

      app.status = newStatus;
      app.statusHistory.push(statusUpdate);
      app.updatedAt = new Date().toISOString();

      return NextResponse.json({ success: true, application: app, newStatus: statusUpdate });
    }

    if (candidateId && jobId) {
      const newApplication: Application = {
        id: `app_${Date.now()}`,
        candidateId,
        candidateName: candidateName || 'Anonymous',
        jobId,
        jobTitle: jobTitle || 'Unknown Position',
        company: company || 'Unknown Company',
        status: 'submitted',
        statusHistory: [
          {
            id: generateId(),
            applicationId: `app_${Date.now()}`,
            status: 'submitted',
            statusMy: statusTranslations.submitted.my,
            message: 'Application submitted successfully',
            messageMy: 'လျှောက်လွှာ အောင်မြင်စွာ တင်သွင်းပြီးပါပြီ',
            timestamp: new Date().toISOString(),
            actor: { type: 'candidate', name: candidateName },
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      applicationStore.set(newApplication.id, newApplication);
      return NextResponse.json({ success: true, application: newApplication });
    }

    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  } catch (error) {
    console.error('Applications POST error:', error);
    return NextResponse.json({ success: false, error: 'Failed to process application' }, { status: 500 });
  }
}
