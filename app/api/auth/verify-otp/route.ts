import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const { email, otp } = await request.json();
  const supabase = await createClient();

  if (!email || !otp) {
    return NextResponse.json(
      { error: 'Email and OTP are required' },
      { status: 400 }
    );
  }

  const { error } = await supabase.auth.verifyOtp({
    type: 'email',
    email,
    token: otp
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
