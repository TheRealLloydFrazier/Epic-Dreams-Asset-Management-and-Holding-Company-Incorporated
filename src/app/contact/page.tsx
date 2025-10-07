'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { displayClass } from '@lib/utils/fonts';

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<{ email: string; message: string }>();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (values: { email: string; message: string }) => {
    setError(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, type: 'contact' })
      });
      if (!response.ok) {
        setError('Unable to send message.');
        return;
      }
      setSubmitted(true);
    } catch (err) {
      setError('Unexpected error.');
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-accent-teal">Contact</p>
      <h1 className={`${displayClass} mt-3 text-4xl`}>Get in Touch</h1>
      <p className="mt-4 text-sm text-white/70">
        Reach our team for merch questions, order support, or collaborations. We typically respond within 2 business days.
      </p>
      {submitted ? (
        <p className="mt-8 text-sm text-accent-teal">Thanks! We received your message.</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
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
            <label className="text-xs uppercase tracking-[0.3em] text-white/60">Message</label>
            <textarea
              rows={5}
              className="w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white focus:border-accent-teal focus:outline-none"
              {...register('message', { required: 'Message is required' })}
            />
            {errors.message && <p className="text-xs text-red-400">{errors.message.message}</p>}
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button
            type="submit"
            className="rounded-full bg-accent-teal px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-white"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
