import { NextResponse } from 'next/server';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, reason } = body;

    if (!name || !email || !reason) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (reason.length < 20) {
      return NextResponse.json(
        { error: 'Please provide more details about your interest (minimum 20 characters)' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/tbl5Au2idW5uP6DH5`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            Name: name,
            Email: email,
            'Why Interested': reason,
            'Submitted At': new Date().toISOString().split('T')[0],
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.json();
      console.error('Airtable error:', err);
      throw new Error('Airtable submission failed');
    }

    return NextResponse.json({ success: true, message: 'Beta application received' }, { status: 200 });
  } catch (error) {
    console.error('Beta application error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
