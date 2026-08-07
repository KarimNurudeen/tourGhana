type StaticPageProps = {
  title: string;
  children: React.ReactNode;
};

export function StaticPage({ title, children }: StaticPageProps) {
  return (
    <main id="main" className="w-full bg-black">
      <div className="mx-auto max-w-page px-4 py-10">
        <h1 className="text-[38px] font-black tracking-tight text-white sm:text-[46px]">
          {title}
        </h1>
        <div className="mt-6 max-w-2xl space-y-5 text-[16px] leading-relaxed text-neutral-300">
          {children}
        </div>
      </div>
    </main>
  );
}
