'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OtpPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, otp })
      });

      if (response.ok) {
        router.push('/account');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to verify OTP. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div>
      <h1>Verify Your OTP</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleVerifyOtp}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="otp">OTP:</label>
        <input
          id="otp"
          name="otp"
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
}
