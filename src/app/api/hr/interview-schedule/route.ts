import { NextRequest, NextResponse } from 'next/server';

// Interview types
type InterviewType = 'phone' | 'video' | 'onsite' | 'technical' | 'panel' | 'final';

// Interview interface
interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  jobId: string;
  jobTitle: string;
  interviewType: InterviewType;
  scheduledDate: string;
  scheduledTime: string;
  duration: number; // in minutes
  interviewer: {
    id: string;
    name: string;
    email: string;
  };
  location?: string;
  meetingLink?: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled' | 'no-show';
  reminderSent: boolean;
  createdAt: string;
  updatedAt?: string;
}

// Time slot interface
interface TimeSlot {
  date: string;
  startTime: string;
  endTime: string;
  available: boolean;
  interviewerId?: string;
  interviewerName?: string;
}

// Myanmar business hours (typically 9 AM - 5 PM)
const businessHours = {
  start: 9,
  end: 17,
  lunchStart: 12,
  lunchEnd: 13,
};

// Interview duration options
const durationOptions = [30, 45, 60, 90, 120];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      candidateId,
      candidateName,
      candidateEmail,
      jobId,
      jobTitle,
      interviewType,
      scheduledDate,
      scheduledTime,
      duration,
      interviewerId,
      interviewerName,
      interviewerEmail,
      location,
      notes,
    } = body;

    // Validate required fields
    if (!candidateId || !candidateName || !scheduledDate || !scheduledTime || !interviewerId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate interview ID
    const interviewId = `INT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create interview object
    const interview: Interview = {
      id: interviewId,
      candidateId,
      candidateName,
      candidateEmail,
      jobId,
      jobTitle,
      interviewType,
      scheduledDate,
      scheduledTime,
      duration: duration || 60,
      interviewer: {
        id: interviewerId,
        name: interviewerName || 'Interviewer',
        email: interviewerEmail,
      },
      location,
      meetingLink: interviewType === 'video' ? generateMeetingLink() : undefined,
      notes,
      status: 'scheduled',
      reminderSent: false,
      createdAt: new Date().toISOString(),
    };

    // In production, save to database and send notifications

    return NextResponse.json({
      success: true,
      interview,
      message: 'Interview scheduled successfully',
      calendarInvite: generateCalendarInvite(interview),
    });
  } catch (error) {
    console.error('Schedule interview error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to schedule interview' },
      { status: 500 }
    );
  }
}

// GET endpoint for available time slots
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get('startDate') || new Date().toISOString().split('T')[0];
  const endDate = searchParams.get('endDate') || getDateNDaysLater(14);
  const interviewerId = searchParams.get('interviewerId');
  const duration = parseInt(searchParams.get('duration') || '60');

  // Generate available time slots
  const slots = generateAvailableSlots(startDate, endDate, duration, interviewerId);

  return NextResponse.json({
    success: true,
    slots,
    businessHours,
    durationOptions: durationOptions.map(d => ({
      value: d,
      label: `${d} minutes`,
    })),
    interviewTypes: [
      { value: 'phone', label: 'Phone Screen', duration: 30 },
      { value: 'video', label: 'Video Call', duration: 45 },
      { value: 'technical', label: 'Technical Interview', duration: 90 },
      { value: 'onsite', label: 'On-site Interview', duration: 120 },
      { value: 'panel', label: 'Panel Interview', duration: 90 },
      { value: 'final', label: 'Final Interview', duration: 60 },
    ],
    myanmarTips: [
      'Schedule interviews between 9:30 AM - 11:30 AM or 2:00 PM - 4:30 PM',
      'Avoid scheduling during lunch hours (12 PM - 1 PM)',
      'Consider traffic conditions in Yangon for on-site interviews',
      'Allow extra time for candidates traveling from outside Yangon',
    ],
  });
}

// PUT endpoint for updating interview
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { interviewId, action, newDate, newTime, notes, cancellationReason } = body;

    let response: { status: string; message: string };

    switch (action) {
      case 'reschedule':
        response = {
          status: 'rescheduled',
          message: `Interview rescheduled to ${newDate} at ${newTime}`,
        };
        break;
      case 'cancel':
        response = {
          status: 'cancelled',
          message: `Interview cancelled: ${cancellationReason || 'No reason provided'}`,
        };
        break;
      case 'complete':
        response = {
          status: 'completed',
          message: 'Interview marked as completed',
        };
        break;
      case 'no-show':
        response = {
          status: 'no-show',
          message: 'Candidate did not show up for the interview',
        };
        break;
      default:
        response = {
          status: 'updated',
          message: 'Interview updated successfully',
        };
    }

    return NextResponse.json({
      success: true,
      interviewId,
      ...response,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Update interview error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update interview' },
      { status: 500 }
    );
  }
}

// Helper functions
function generateAvailableSlots(
  startDate: string,
  endDate: string,
  duration: number,
  _interviewerId?: string
): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Iterate through each day
  for (let day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
    // Skip weekends (0 = Sunday, 6 = Saturday)
    if (day.getDay() === 0 || day.getDay() === 6) continue;

    const dateStr = day.toISOString().split('T')[0];
    
    // Generate slots for morning (before lunch)
    for (let hour = businessHours.start; hour < businessHours.lunchStart; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
        
        // Simulate some slots being unavailable
        const available = Math.random() > 0.3;
        
        slots.push({
          date: dateStr,
          startTime: timeStr,
          endTime: addMinutes(timeStr, duration),
          available,
          interviewerId: available ? 'int-1' : undefined,
          interviewerName: available ? 'HR Manager' : undefined,
        });
      }
    }
    
    // Generate slots for afternoon (after lunch)
    for (let hour = businessHours.lunchEnd; hour < businessHours.end; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
        
        const available = Math.random() > 0.3;
        
        slots.push({
          date: dateStr,
          startTime: timeStr,
          endTime: addMinutes(timeStr, duration),
          available,
          interviewerId: available ? 'int-1' : undefined,
          interviewerName: available ? 'HR Manager' : undefined,
        });
      }
    }
  }

  return slots;
}

function addMinutes(time: string, minutes: number): string {
  const [hours, mins] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + mins + minutes;
  const newHours = Math.floor(totalMinutes / 60);
  const newMins = totalMinutes % 60;
  return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`;
}

function getDateNDaysLater(n: number): string {
  const date = new Date();
  date.setDate(date.getDate() + n);
  return date.toISOString().split('T')[0];
}

function generateMeetingLink(): string {
  // In production, integrate with Zoom, Google Meet, or Microsoft Teams
  const meetingId = Math.random().toString(36).substr(2, 10);
  return `https://meet.refertrm.com/${meetingId}`;
}

function generateCalendarInvite(interview: Interview): {
  title: string;
  description: string;
  start: string;
  end: string;
  location: string;
} {
  const startTime = new Date(`${interview.scheduledDate}T${interview.scheduledTime}`);
  const endTime = new Date(startTime.getTime() + interview.duration * 60000);

  return {
    title: `Interview: ${interview.candidateName} - ${interview.jobTitle}`,
    description: `Interview Type: ${interview.interviewType}\n${interview.notes || ''}`,
    start: startTime.toISOString(),
    end: endTime.toISOString(),
    location: interview.location || interview.meetingLink || 'Virtual',
  };
}
