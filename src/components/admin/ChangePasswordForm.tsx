'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type FormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const newPassword = watch('newPassword');

  const onSubmit = async (values: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword
        })
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Unable to change password');
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
        <label className="text-xs uppercase tracking-[0.3em] text-white/60">Current Password</label>
        <input
          type="password"
          className="w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white focus:border-accent-teal focus:outline-none"
          {...register('currentPassword', { required: 'Current password is required' })}
        />
        {errors.currentPassword && <p className="text-xs text-red-400">{errors.currentPassword.message}</p>}
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.3em] text-white/60">New Password</label>
        <input
          type="password"
          className="w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white focus:border-accent-teal focus:outline-none"
          {...register('newPassword', {
            required: 'New password is required',
            minLength: { value: 8, message: 'Password must be at least 8 characters' }
          })}
        />
        {errors.newPassword && <p className="text-xs text-red-400">{errors.newPassword.message}</p>}
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.3em] text-white/60">Confirm New Password</label>
        <input
          type="password"
          className="w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white focus:border-accent-teal focus:outline-none"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) => value === newPassword || 'Passwords do not match'
          })}
        />
        {errors.confirmPassword && <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-accent-teal px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Updating...' : 'Update Password'}
      </button>
    </form>
  );
}
