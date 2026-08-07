import type { Metadata } from 'next';
import { travelTips } from '@/data/stories';

export const metadata: Metadata = {
  title: 'Travel Tips',
  description: 'Practical travel tips for visiting Ghana.',
};

export default function TravelTipsPage() {
  return (
    <main id="main" className="w-full bg-black">
      <div className="mx-auto max-w-page px-4 py-10">
        <h1 className="text-[38px] font-black tracking-tight text-white sm:text-[46px]">
          Travel Tips
        </h1>
        <p className="mt-3 max-w-2xl text-[16px] text-neutral-300">
          Practical guidance to help plan a smooth trip to Ghana.
        </p>

        <ul className="mt-10 grid max-w-3xl gap-4 border-4 border-flagRed bg-flagGreen/25 p-6 backdrop-blur-md sm:grid-cols-2">
          {travelTips.map((tip) => (
            <li key={tip.label} className="border-l-4 border-flagGold bg-flagGold/10 p-5">
              <p className="text-[17px] font-bold text-white">{tip.label}</p>
              <p className="mt-1 text-[15px] leading-relaxed text-neutral-300">{tip.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
