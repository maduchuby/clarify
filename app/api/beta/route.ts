import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, reason } = body;

    // Validate required fields
    if (!name || !email || !company || !reason) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate reason length
    if (reason.length < 20) {
      return NextResponse.json(
        { error: 'Please provide more details about your interest (minimum 20 characters)' },
        { status: 400 }
      );
    }

    // In a production app, you would:
    // 1. Store this in a database with a beta_applications table
    // 2. Send notification to the team (e.g., Slack, email)
    // 3. Send confirmation email to the applicant
    // 4. Trigger automated vetting workflow
    // 5. Log to analytics/CRM

    // For now, we'll just log it and return success
    console.log('Beta application submission:', {
      name,
      email,
      company,
      reason,
      timestamp: new Date().toISOString(),
    });

    // Simulate a brief delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json(
      {
        success: true,
        message: 'Beta application received',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Beta application error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
