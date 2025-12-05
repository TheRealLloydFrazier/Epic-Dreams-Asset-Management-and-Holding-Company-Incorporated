export const metadata = {
  title: 'Privacy Policy | Epic Dreams Entertainment',
  description: 'How we collect, use, and protect your personal information.'
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold text-white">Privacy Policy</h1>
      <p className="mt-2 text-sm text-white/60">Last updated: December 2024</p>

      <div className="prose prose-invert mt-8 max-w-none space-y-6 text-white/80">
        <section>
          <h2 className="text-xl font-semibold text-white">Information We Collect</h2>
          <p>When you make a purchase or interact with our store, we collect:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Contact information (name, email address)</li>
            <li>Shipping and billing addresses</li>
            <li>Payment information (processed securely by Stripe)</li>
            <li>Order history and preferences</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Process and fulfill your orders</li>
            <li>Send order confirmations and shipping updates</li>
            <li>Respond to customer service requests</li>
            <li>Send promotional emails (with your consent)</li>
            <li>Improve our products and services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Payment Security</h2>
          <p>
            All payment processing is handled by Stripe, a PCI-DSS compliant payment processor.
            We never store your complete credit card information on our servers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Cookies & Analytics</h2>
          <p>
            We use cookies to enhance your browsing experience and analyze site traffic.
            You can control cookie preferences through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Third-Party Services</h2>
          <p>We may share your information with:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Stripe (payment processing)</li>
            <li>Shipping carriers (to deliver your orders)</li>
            <li>Email service providers (for order notifications)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt out of marketing communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Contact Us</h2>
          <p>
            For privacy-related inquiries, please contact us at{' '}
            <a href="mailto:support@epicdreamsent.com" className="text-accent-teal hover:underline">
              support@epicdreamsent.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
