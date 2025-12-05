import { prisma } from '@lib/db/prisma';
import { getAdminSession } from '@lib/auth/session';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const session = await getAdminSession();
  if (!session.adminId || session.mustChangePassword) {
    redirect('/admin');
  }

  const settings = await prisma.setting.findMany();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-semibold text-white">Settings</h1>
      <p className="mt-2 text-sm text-white/60">Configure shipping, taxes, analytics, and operational alerts.</p>
      <div className="mt-8 space-y-4">
        {settings.map((setting) => (
          <div key={setting.key} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">{setting.key}</p>
            <pre className="mt-2 whitespace-pre-wrap text-xs text-white/60">
              {JSON.stringify(setting.value, null, 2)}
            </pre>
          </div>
        ))}
      </div>
      <div className="mt-10 rounded-3xl border border-accent-violet/50 bg-accent-violet/10 p-6 text-sm text-white">
        <p className="text-xs uppercase tracking-[0.3em]">Setup Checklist</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Add STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET to environment variables.</li>
          <li>Set webhook signing secret in STRIPE_WEBHOOK_SECRET via DeepAgent logs.</li>
          <li>Configure SMTP credentials to enable customer notifications.</li>
          <li>Paste Plausible domain or GA4 measurement ID to enable analytics.</li>
        </ul>
      </div>
    </div>
  );
}
