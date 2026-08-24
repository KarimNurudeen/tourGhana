import { ChamferedCard } from './ChamferedCard';

type FeaturePanelProps = {
  children: React.ReactNode;
  className?: string;
};

export function FeaturePanel({ children, className = '' }: FeaturePanelProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-flagGreen bg-flagGreen p-3 shadow-sm">
      <ChamferedCard
        cut={28}
        pointRadius={10}
        className={`card-swing-hover bg-[#0b1220] shadow-[0_8px_24px_rgba(0,0,0,0.45)] ring-1 ring-black/40 ${className}`}>
        {children}
      </ChamferedCard>
    </div>
  );
}
