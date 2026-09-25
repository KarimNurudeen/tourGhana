import type { GuideSection } from '@/types/content';

const h2 =
  "flex items-center gap-2 text-[22px] font-black tracking-tight text-ink before:h-6 before:w-1.5 before:shrink-0 before:rounded-full before:bg-brand before:content-['']";

/** Paragraphs that start with "- " are list items in the source text. */
function Paragraphs({ paragraphs }: { paragraphs: string[] }) {
  const blocks: { list: boolean; items: string[] }[] = [];
  for (const p of paragraphs) {
    const isItem = p.startsWith('- ');
    const last = blocks[blocks.length - 1];
    if (last && last.list === isItem) last.items.push(isItem ? p.slice(2) : p);
    else blocks.push({ list: isItem, items: [isItem ? p.slice(2) : p] });
  }
  return (
    <>
      {blocks.map((block, i) =>
        block.list ? (
          <ul key={i} className="list-disc space-y-2 pl-6 text-[16px] leading-relaxed text-neutral-700">
            {block.items.map((item) => (
              <li key={item.slice(0, 40)}>{item}</li>
            ))}
          </ul>
        ) : (
          block.items.map((item) => (
            <p key={item.slice(0, 40)} className="text-[16px] leading-[1.75] text-neutral-700">
              {item}
            </p>
          ))
        )
      )}
    </>
  );
}

/** A guide page's sections, in the order they're edited in Strapi. */
export function GuideSections({ sections }: { sections: GuideSection[] }) {
  return (
    <div className="space-y-8">
      {sections.map((section, i) => (
        <section key={`${section.heading}-${i}`} className="space-y-3">
          {section.heading && <h2 className={h2}>{section.heading}</h2>}
          <Paragraphs paragraphs={section.paragraphs} />
        </section>
      ))}
    </div>
  );
}
