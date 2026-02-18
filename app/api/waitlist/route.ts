import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone } = body;

    // Validate required fields
    if (!fullName || !email) {
      return NextResponse.json(
        { error: 'Full name and email are required' },
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

    // In a production app, you would:
    // 1. Store this in a database (e.g., PostgreSQL, MongoDB)
    // 2. Send to an email marketing service (e.g., Mailchimp, ConvertKit)
    // 3. Send confirmation email to the user
    // 4. Log to analytics

    // For now, we'll just log it and return success
    console.log('Waitlist submission:', {
      fullName,
      email,
      phone: phone || 'Not provided',
      timestamp: new Date().toISOString(),
    });

    // Simulate a brief delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully added to waitlist',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
