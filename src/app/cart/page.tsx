import { CartClient } from '@components/store/CartClient';

export default function CartPage({ searchParams }: { searchParams: { success?: string; cancel?: string } }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <CartClient success={searchParams.success === '1'} cancel={searchParams.cancel === '1'} />
    </div>
  );
}
