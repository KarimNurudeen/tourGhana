type StaticPageProps = {
  title: string;
  children: React.ReactNode;
};

export function StaticPage({ title, children }: StaticPageProps) {
  return (
    <main id="main" className="w-full">
      <div className="mx-auto max-w-feed px-3 py-6 sm:px-4">
        <article className="rounded-xl bg-white p-5 shadow-card sm:p-8">
          <h1 className="text-[30px] font-black leading-tight tracking-tight text-ink sm:text-[38px]">
            {title}
          </h1>
          <div className="mt-5 max-w-2xl space-y-5 text-[16px] leading-relaxed text-neutral-700">
            {children}
          </div>
        </article>
      </div>
    </main>
  );
}
