import Link from 'next/link';
import Image from 'next/image';
import { PlayIcon } from 'lucide-react';
import { mostWatchedLead, mostWatchedMore } from '@/data/stories';
import { SectionHeading } from './SectionHeading';
import { RegionTag } from './RegionTag';

export function MostWatched() {
  return (
    <section aria-labelledby="most-watched">
      <span id="most-watched" className="sr-only">
        Most watched films
      </span>
      <SectionHeading title="Most Watched Films" />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.55fr]">
        <div>
          <h3 className="text-[28px] font-black leading-[1.1] tracking-tight text-white">
            <Link
              href={`/tours/${mostWatchedLead.slug}`}
              className="hover:text-flagGold">
              {mostWatchedLead.title}
            </Link>
          </h3>
          <RegionTag region={mostWatchedLead.region} />

          <div className="mt-6 border-4 border-flagRed bg-flagGreen/25 p-4 backdrop-blur-md">
            <h4 className="text-[13px] font-bold uppercase tracking-wide text-white">
              Watch more
            </h4>
            <ul className="mt-4 space-y-5">
              {mostWatchedMore.map((story) => (
                <li key={story.slug} className="flex gap-4">
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/tours/${story.slug}`}
                      className="text-[18px] font-bold leading-snug text-white hover:text-flagGold">
                      {story.title}
                    </Link>
                    <RegionTag region={story.region} />
                  </div>
                  <Link href={`/tours/${story.slug}`} className="shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={story.image!}
                      alt=""
                      width={96}
                      height={64}
                      className="h-16 w-24 object-cover"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <figure className="relative">
          <Link href={`/tours/${mostWatchedLead.slug}`} className="group block">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={mostWatchedLead.image!}
                alt="Independence Arch and Black Star Square in Accra"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 62vw, 100vw"
              />
            </div>
            <span className="absolute bottom-5 left-5 flex h-14 w-14 items-center justify-center rounded-full bg-flagRed text-white transition group-hover:bg-[#700000]">
              <PlayIcon className="h-6 w-6 fill-white" />
            </span>
          </Link>
        </figure>
      </div>
    </section>
  );
}
