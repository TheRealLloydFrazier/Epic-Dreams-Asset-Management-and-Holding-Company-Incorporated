export const metadata = {
  title: 'Returns & Refunds | Epic Dreams Entertainment',
  description: 'Our return policy, exchange process, and refund information.'
};

export default function ReturnsPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold text-white">Returns & Refunds</h1>
      <p className="mt-2 text-sm text-white/60">Last updated: December 2024</p>

      <div className="prose prose-invert mt-8 max-w-none space-y-6 text-white/80">
        <section>
          <h2 className="text-xl font-semibold text-white">Return Window</h2>
          <p>
            We accept returns within 30 days of delivery for most items. Items must be
            unworn, unwashed, and in their original condition with tags attached.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Non-Returnable Items</h2>
          <p>The following items cannot be returned:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Signed or autographed merchandise</li>
            <li>Limited edition items</li>
            <li>Items marked as final sale</li>
            <li>Stickers and other consumable items</li>
            <li>Items that have been worn, washed, or altered</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">How to Request a Return</h2>
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              Email us at{' '}
              <a href="mailto:support@epicdreamsent.com" className="text-accent-teal hover:underline">
                support@epicdreamsent.com
              </a>{' '}
              with your order number and reason for return
            </li>
            <li>Wait for approval and return instructions</li>
            <li>Ship the item back using the provided instructions</li>
            <li>Receive your refund within 5-7 business days of us receiving the item</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Refund Process</h2>
          <p>
            Once we receive and inspect your return, we will process your refund to the
            original payment method. Please allow 5-10 business days for the refund to
            appear in your account, depending on your bank.
          </p>
          <p className="mt-2">
            <strong className="text-white">Note:</strong> Original shipping costs are non-refundable.
            Return shipping costs are the responsibility of the customer unless the item
            arrived damaged or defective.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Exchanges</h2>
          <p>
            We do not offer direct exchanges. If you need a different size or variant,
            please return your item for a refund and place a new order.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Damaged or Defective Items</h2>
          <p>
            If your item arrives damaged or defective, please contact us within 7 days
            of delivery with photos of the damage. We will provide a prepaid return label
            and send a replacement or issue a full refund.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Questions?</h2>
          <p>
            Contact our support team at{' '}
            <a href="mailto:support@epicdreamsent.com" className="text-accent-teal hover:underline">
              support@epicdreamsent.com
            </a>{' '}
            for any questions about returns or refunds.
          </p>
        </section>
      </div>
    </div>
  );
}
