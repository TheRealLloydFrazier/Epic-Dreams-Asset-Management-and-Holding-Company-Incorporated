export const metadata = {
  title: 'Terms of Service | Epic Dreams Entertainment',
  description: 'Terms and conditions for using the Epic Dreams Entertainment store.'
};

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold text-white">Terms of Service</h1>
      <p className="mt-2 text-sm text-white/60">Last updated: December 2024</p>

      <div className="prose prose-invert mt-8 max-w-none space-y-6 text-white/80">
        <section>
          <h2 className="text-xl font-semibold text-white">Agreement to Terms</h2>
          <p>
            By accessing or using the Epic Dreams Entertainment store, you agree to be
            bound by these Terms of Service. If you do not agree with any part of these
            terms, you may not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Purchases</h2>
          <p>When you make a purchase, you agree that:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>You are authorized to use the payment method provided</li>
            <li>The information you provide is accurate and complete</li>
            <li>You will pay all charges at the prices in effect at the time of purchase</li>
            <li>All sales are subject to product availability</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Pricing & Availability</h2>
          <p>
            All prices are listed in USD. We reserve the right to modify prices at any
            time without notice. Product availability is subject to change, and we may
            limit quantities available for purchase.
          </p>
          <p className="mt-2">
            In the event of a pricing error, we reserve the right to cancel any orders
            placed at the incorrect price.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Intellectual Property</h2>
          <p>
            All content on this website, including but not limited to text, graphics,
            logos, images, and merchandise designs, is the property of Epic Dreams
            Entertainment or its licensors and is protected by copyright and trademark
            laws.
          </p>
          <p className="mt-2">
            You may not reproduce, distribute, or create derivative works from any
            content without our express written permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">User Conduct</h2>
          <p>You agree not to:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Use our services for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with the proper functioning of our website</li>
            <li>Submit false or misleading information</li>
            <li>Engage in any activity that could harm our business or reputation</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Epic Dreams Entertainment shall not
            be liable for any indirect, incidental, special, consequential, or punitive
            damages arising from your use of our services or products.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Disclaimer of Warranties</h2>
          <p>
            Our products and services are provided &quot;as is&quot; without warranties of any
            kind, either express or implied. We do not guarantee that our website will
            be error-free or uninterrupted.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with
            the laws of the United States, without regard to conflict of law principles.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Changes to Terms</h2>
          <p>
            We reserve the right to update these Terms of Service at any time. Changes
            will be effective immediately upon posting. Your continued use of our
            services constitutes acceptance of the modified terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Contact</h2>
          <p>
            For questions about these Terms of Service, please contact us at{' '}
            <a href="mailto:support@epicdreamsent.com" className="text-accent-teal hover:underline">
              support@epicdreamsent.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
