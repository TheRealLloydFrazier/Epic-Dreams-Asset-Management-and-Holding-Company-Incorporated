'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function EmailCapture() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<{ email: string }>({
    defaultValues: { email: '' }
  });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (values: { email: string }) => {
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'email_capture',
          email: values.email
        })
      });
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (submitted) {
    return <p className="text-sm text-accent-teal">Thanks! You’re on the list.</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
      <input
        type="email"
        placeholder="Email address"
        className="flex-1 rounded-full border border-white/20 bg-black/40 px-6 py-3 text-sm text-white placeholder:text-white/40 focus:border-accent-teal focus:outline-none"
        {...register('email', { required: 'Email is required' })}
      />
      <button
        type="submit"
        className="rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-accent-teal"
      >
        Join
      </button>
      {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
    </form>
  );
}
