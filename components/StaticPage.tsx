type StaticPageProps = {
  title: string;
  children: React.ReactNode;
};

export function StaticPage({ title, children }: StaticPageProps) {
  return (
    <main id="main" className="w-full bg-white">
      <div className="mx-auto max-w-page px-4 py-10">
        <h1 className="text-[38px] font-black tracking-tight text-ink sm:text-[46px]">
          {title}
        </h1>
        <div className="mt-6 max-w-2xl space-y-5 text-[16px] leading-relaxed text-neutral-600">
          {children}
        </div>
      </div>
    </main>
  );
}
