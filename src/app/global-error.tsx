"use client";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-white text-black">
        <div className="text-center p-4">
          <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
          <p className="mb-4">{error.message}</p>
          <button onClick={() => reset()} className="px-4 py-2 bg-black text-white rounded">
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
