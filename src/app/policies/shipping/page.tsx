export const metadata = {
  title: 'Shipping Policy | Epic Dreams Entertainment',
  description: 'Shipping rates, delivery times, and international shipping information.'
};

export default function ShippingPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold text-white">Shipping Policy</h1>
      <p className="mt-2 text-sm text-white/60">Last updated: December 2024</p>

      <div className="prose prose-invert mt-8 max-w-none space-y-6 text-white/80">
        <section>
          <h2 className="text-xl font-semibold text-white">Processing Time</h2>
          <p>
            Orders are typically processed within 1-3 business days. Signed editions and
            limited items may require additional processing time of 3-5 business days.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Domestic Shipping (United States)</h2>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-2 text-left font-medium text-white">Method</th>
                  <th className="pb-2 text-left font-medium text-white">Delivery Time</th>
                  <th className="pb-2 text-right font-medium text-white">Cost</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr>
                  <td className="py-2">US Standard</td>
                  <td>5-7 business days</td>
                  <td className="text-right">$5.00</td>
                </tr>
                <tr>
                  <td className="py-2">US Expedited</td>
                  <td>2-3 business days</td>
                  <td className="text-right">$15.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">International Shipping</h2>
          <p>We ship to Canada, United Kingdom, and Australia.</p>
          <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-2 text-left font-medium text-white">Region</th>
                  <th className="pb-2 text-left font-medium text-white">Delivery Time</th>
                  <th className="pb-2 text-right font-medium text-white">Cost</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr>
                  <td className="py-2">International Flat Rate</td>
                  <td>10-21 business days</td>
                  <td className="text-right">$25.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-white/60">
            International orders may be subject to customs duties and taxes, which are the
            responsibility of the recipient.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Order Tracking</h2>
          <p>
            Once your order ships, you will receive a confirmation email with tracking
            information. You can track your package using the link provided.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Lost or Damaged Packages</h2>
          <p>
            If your package is lost or arrives damaged, please contact us within 14 days of
            the expected delivery date at{' '}
            <a href="mailto:support@epicdreamsent.com" className="text-accent-teal hover:underline">
              support@epicdreamsent.com
            </a>
            . We will work with you to resolve the issue.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Address Accuracy</h2>
          <p>
            Please ensure your shipping address is accurate. We are not responsible for
            packages delivered to incorrect addresses provided by the customer.
          </p>
        </section>
      </div>
    </div>
  );
}
