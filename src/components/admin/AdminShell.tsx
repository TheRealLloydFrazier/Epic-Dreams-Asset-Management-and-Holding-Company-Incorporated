import Link from 'next/link';
import { LoginForm } from '@components/admin/LoginForm';
import { ChangePasswordForm } from '@components/admin/ChangePasswordForm';

export const AdminShell = {
  ChangePassword: function ChangePassword() {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-20">
        <h1 className="text-2xl font-semibold text-white">Change Password Required</h1>
        <p className="mt-2 text-sm text-white/60">
          For security, you must change your password before accessing the admin console.
        </p>
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <ChangePasswordForm />
        </div>
      </div>
    );
  },
  Unauthenticated: function Unauthenticated() {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-20">
        <h1 className="text-2xl font-semibold text-white">Admin Console</h1>
        <p className="mt-2 text-sm text-white/60">Sign in with your Epic Dreams admin credentials.</p>
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <LoginForm />
        </div>
        <p className="mt-6 text-xs text-white/50">
          Need help? Email <a href="mailto:support@epicdreamsent.com" className="underline">support@epicdreamsent.com</a>
        </p>
      </div>
    );
  },
  Dashboard: function Dashboard({ stats }: { stats: { products: number; orders: number } }) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-white">Admin Dashboard</h1>
          <form action="/api/admin/logout" method="post">
            <button className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70 hover:border-accent-teal hover:text-white">
              Sign Out
            </button>
          </form>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Products</p>
            <p className="mt-3 text-4xl font-semibold text-white">{stats.products}</p>
            <Link href="/admin/products" className="mt-6 inline-flex text-xs uppercase tracking-[0.3em] text-accent-teal">
              Manage Products →
            </Link>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Orders</p>
            <p className="mt-3 text-4xl font-semibold text-white">{stats.orders}</p>
            <Link href="/admin/orders" className="mt-6 inline-flex text-xs uppercase tracking-[0.3em] text-accent-teal">
              Manage Orders →
            </Link>
          </div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Link href="/admin/discounts" className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70 hover:border-accent-teal hover:text-white">
            Discount Codes
          </Link>
          <Link href="/admin/releases" className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70 hover:border-accent-teal hover:text-white">
            Releases & Drops
          </Link>
          <Link href="/admin/settings" className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70 hover:border-accent-teal hover:text-white">
            Settings
          </Link>
        </div>
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Setup Needed</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET</li>
            <li>Configure shipping rates in Settings → Shipping</li>
            <li>Connect analytics (Plausible or GA4)</li>
            <li>Update policy pages in CMS</li>
          </ul>
        </div>
      </div>
    );
  }
};
