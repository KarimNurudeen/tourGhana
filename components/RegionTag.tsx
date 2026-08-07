type RegionTagProps = {
  region?: string;
};

export function RegionTag({ region }: RegionTagProps) {
  if (!region) return null;

  return (
    <p className="mt-2 text-[12px] font-bold uppercase tracking-wide text-white/70">
      {region}
    </p>
  );
}
