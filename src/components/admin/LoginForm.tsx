'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<{ email: string; password: string }>();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Unable to sign in');
        return;
      }
      router.refresh();
    } catch (err) {
      setError('Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.3em] text-white/60">Email</label>
        <input
          type="email"
          className="w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white focus:border-accent-teal focus:outline-none"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.3em] text-white/60">Password</label>
        <input
          type="password"
          className="w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white focus:border-accent-teal focus:outline-none"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-accent-teal px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  );
}
