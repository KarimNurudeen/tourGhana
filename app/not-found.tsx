import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main" className="w-full bg-black">
      <div className="mx-auto max-w-page px-4 py-24 text-center">
        <p className="text-[13px] font-bold uppercase tracking-wide text-flagRed">
          Page not found
        </p>
        <h1 className="mt-3 text-[36px] font-black tracking-tight text-white">
          We could not find that destination
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[17px] text-neutral-300">
          The page may have moved. Browse the full list of attractions,
          heritage sites and festivals instead.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block bg-flagRed px-6 py-3 text-[14px] font-bold uppercase tracking-wide text-white hover:bg-[#700000]">
          Back to Tour Ghana
        </Link>
      </div>
    </main>
  );
}
