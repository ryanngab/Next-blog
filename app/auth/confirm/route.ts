import { createClient } from '@/utils/supabase/server';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const otp = searchParams.get('otp');
  const email = searchParams.get('email');
  const next = '/account';

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;

  if (otp && email) {
    const supabase = await createClient();

    // Verifikasi OTP
    const { error } = await supabase.auth.verifyOtp({
      type: 'email',
      email,
      token: otp
    });

    if (!error) {
      return NextResponse.redirect(redirectTo);
    } else {
      console.error('Error verifying OTP:', error.message); // Log error untuk debugging
    }
  }

  redirectTo.pathname = '/error';
  redirectTo.searchParams.set('error', 'invalid_or_expired_otp');
  return NextResponse.redirect(redirectTo);
}
