type RegionTagProps = {
  region?: string;
  dark?: boolean;
};

export function RegionTag({ region, dark = false }: RegionTagProps) {
  if (!region) return null;

  return (
    <p
      className={`mt-2 text-[12px] font-bold uppercase tracking-wide ${
        dark ? 'text-white/60' : 'text-neutral-500'
      }`}>
      {region}
    </p>
  );
}
