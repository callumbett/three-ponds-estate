"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, type MouseEvent } from "react";

export type LightboxImage = { src: string; alt: string };

type Props = {
  images: LightboxImage[];
  /** -1 = closed; otherwise the active image index */
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
};

/**
 * Full-screen photo lightbox.
 *
 * Behaviour:
 *   - Backdrop click → close.
 *   - Esc → close.
 *   - Left / Right arrow keys → navigate.
 *   - Click left/right chevrons → navigate.
 *   - Body scroll-lock while open.
 *   - Animations honour `useReducedMotion()`.
 *
 * The component is "controlled" by its parent — parent owns `index`
 * and `onChange` so it can persist gallery position across navigation.
 *
 * Per composition-patterns: the parent decides what to do with each
 * action, this component just emits them. No boolean flags inside.
 */
export default function Lightbox({ images, index, onClose, onChange }: Props) {
  const reduceMotion = useReducedMotion() ?? false;
  const open = index >= 0 && index < images.length;
  const containerRef = useRef<HTMLDivElement>(null);

  const goPrev = useCallback(() => {
    if (images.length === 0) return;
    onChange((index - 1 + images.length) % images.length);
  }, [images.length, index, onChange]);

  const goNext = useCallback(() => {
    if (images.length === 0) return;
    onChange((index + 1) % images.length);
  }, [images.length, index, onChange]);

  // Esc / arrow-key bindings + Tab focus trap (dialog pattern: focus
  // must not escape into the page behind the modal while it's open).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          goPrev();
          break;
        case "ArrowRight":
          goNext();
          break;
        case "Tab": {
          const root = containerRef.current;
          if (!root) return;
          const focusables = root.querySelectorAll<HTMLElement>(
            'button, [href], [tabindex]:not([tabindex="-1"])',
          );
          if (focusables.length === 0) {
            e.preventDefault();
            return;
          }
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          const active = document.activeElement;
          if (e.shiftKey && (active === first || active === root)) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && active === last) {
            e.preventDefault();
            first.focus();
          }
          break;
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, goPrev, goNext]);

  // Focus management: move focus into the dialog on open, restore it to
  // the trigger (gallery thumbnail) on close so keyboard users don't get
  // dropped back at the top of the page.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    containerRef.current?.focus();
    return () => {
      previouslyFocused?.focus?.();
    };
  }, [open]);

  // Body scroll-lock while open.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  if (!open) return null;
  const current = images[index];
  const fadeDuration = reduceMotion ? 0 : 0.4;

  // Stop chevron / counter clicks bubbling to the backdrop click handler.
  const stop = (e: MouseEvent) => e.stopPropagation();

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox"
        ref={containerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={`Image ${index + 1} of ${images.length}: ${current.alt}`}
        className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/95 outline-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.25 }}
        onClick={onClose}
      >
        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`lb-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: fadeDuration, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full"
            onClick={stop}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="100vw"
              quality={90}
              priority
              className="object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {/* Top bar — counter + close */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-5 sm:p-8"
          onClick={stop}
        >
          <p
            className="metadata pointer-events-auto text-parchment/85 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]"
          >
            {String(index + 1).padStart(2, "0")} <span className="text-parchment/55">/ {String(images.length).padStart(2, "0")}</span>
          </p>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="pointer-events-auto rounded-full p-2 text-parchment transition-opacity duration-150 ease-out hover:opacity-80 focus-visible:outline focus-visible:outline-1 focus-visible:outline-parchment focus-visible:outline-offset-4 [filter:drop-shadow(0_1px_4px_rgba(0,0,0,0.55))]"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Prev / next chevrons */}
        {images.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                stop(e);
                goPrev();
              }}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full p-3 text-parchment transition-opacity duration-150 ease-out hover:opacity-80 focus-visible:outline focus-visible:outline-1 focus-visible:outline-parchment focus-visible:outline-offset-4 sm:left-8 [filter:drop-shadow(0_1px_4px_rgba(0,0,0,0.55))]"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path
                  d="M15 18L9 12L15 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                stop(e);
                goNext();
              }}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full p-3 text-parchment transition-opacity duration-150 ease-out hover:opacity-80 focus-visible:outline focus-visible:outline-1 focus-visible:outline-parchment focus-visible:outline-offset-4 sm:right-8 [filter:drop-shadow(0_1px_4px_rgba(0,0,0,0.55))]"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path
                  d="M9 18L15 12L9 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        ) : null}

        {/* Caption */}
        <p
          className="absolute inset-x-0 bottom-0 mx-auto max-w-2xl px-6 pb-6 text-center text-sm leading-relaxed text-parchment/85 sm:pb-8 [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]"
          onClick={stop}
        >
          {current.alt}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
