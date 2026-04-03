import Link from "next/link";

export const metadata = {
  title: "CosmoOS",
};

export default function CosmoOSPage() {
  const externalCosmoUrl = process.env.NEXT_PUBLIC_COSMOOS_URL || "";

  return (
    <main className="min-h-screen bg-[#f4efe6] px-6 py-28 text-[#2b2722]">
      <div className="mx-auto max-w-3xl rounded-3xl border border-[#d8d0c5] bg-[#fbf8f2] p-8 shadow-[0_20px_50px_rgba(60,40,20,0.08)]">
        <p className="text-xs uppercase tracking-[0.16em] text-[#7a6d61]">OpenCosmo</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">CosmoOS</h1>
        <p className="mt-4 text-base leading-relaxed text-[#5e544b]">
          CosmoOS is available as a separate application module. This page is now wired, so the navbar link no longer 404s.
        </p>

        {externalCosmoUrl ? (
          <a
            href={externalCosmoUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center rounded-xl bg-[#7b2532] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#671e29]"
          >
            Open CosmoOS
          </a>
        ) : (
          <div className="mt-8 rounded-2xl border border-[#dacdbd] bg-[#f5eee4] p-4 text-sm text-[#66584d]">
            Set <code>NEXT_PUBLIC_COSMOOS_URL</code> to the deployed CosmoOS app URL if you want this button to deep-link there.
          </div>
        )}

        <div className="mt-6">
          <Link href="/" className="text-sm font-medium text-[#7b2532] hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
