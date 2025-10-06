import { displayClass } from '@lib/utils/fonts';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-accent-teal">About</p>
      <h1 className={`${displayClass} mt-3 text-4xl`}>Epic Dreams Entertainment</h1>
      <div className="prose prose-invert mt-8 max-w-none space-y-4">
        <p>
          Epic Dreams Entertainment is a future-facing music label and creative studio, blending immersive storytelling with
          limited-edition merch drops. Our artists explore the edges of synthwave, R&B, and dream pop.
        </p>
        <p>
          This microstore showcases signature apparel, collectibles, and signed editions crafted in collaboration with our roster
          and community. Each release is designed to feel like a portal into the worlds our artists build.
        </p>
      </div>
    </div>
  );
}
