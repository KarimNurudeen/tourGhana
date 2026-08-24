'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';

type VideoLightboxProps = {
  youtubeId: string | null;
  title: string;
  tourHref?: string;
  onClose: () => void;
};

export function VideoLightbox({ youtubeId, title, tourHref, onClose }: VideoLightboxProps) {
  useEffect(() => {
    if (!youtubeId) return;

    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [youtubeId, onClose]);

  return (
    <AnimatePresence>
      {youtubeId && (
        <motion.div
          key="video-lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20">
            <XIcon className="h-6 w-6" />
          </button>

          <motion.div
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl overflow-hidden rounded-2xl bg-neutral-900 shadow-2xl ring-1 ring-white/10">
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <p className="text-[15px] font-semibold text-white">{title}</p>
              {tourHref && (
                <Link
                  href={tourHref}
                  className="shrink-0 text-[13px] font-bold uppercase tracking-wide text-flagGold hover:text-white">
                  Read the full guide
                </Link>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
