"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

/**
 * Helper — return today + n days as `YYYY-MM-DD` (the format
 * SiteMinder accepts in URL params).
 */
function todayPlus(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

/**
 * Date-driven booking shortcut. Two date inputs and a submit button —
 * on submit the user navigates to /book with the dates as query params,
 * which the SiteMinder embed automatically reads and pre-fills.
 *
 * Defaults to "next weekend" (today + 7 → today + 9) so the form
 * never starts in an obviously-impossible state.
 *
 * Visually intentionally restrained — hairline-bordered inputs,
 * parchment fill, corten submit, all matched to the editorial
 * language of the rest of the site (no "rates engine" SaaS look).
 */
export default function AvailabilitySearch() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState(() => todayPlus(7));
  const [checkOut, setCheckOut] = useState(() => todayPlus(9));

  const minCheckIn = todayPlus(0);
  // Check-out must be at least one day after check-in.
  const minCheckOut = (() => {
    const d = new Date(checkIn);
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  })();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams({
      check_in_date: checkIn,
      check_out_date: checkOut,
      number_adults: "2",
    });
    router.push(`/book?${params.toString()}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-3 rounded-sm border border-line bg-parchment p-3 shadow-sm sm:grid-cols-[1fr_1fr_auto] sm:gap-2 sm:p-2.5"
      aria-label="Check availability"
    >
      <Field
        label="Check in"
        id="availability-checkin"
        value={checkIn}
        min={minCheckIn}
        onChange={(v) => {
          setCheckIn(v);
          // If new check-in pushes past check-out, auto-bump check-out.
          if (v >= checkOut) {
            const d = new Date(v);
            d.setDate(d.getDate() + 1);
            setCheckOut(d.toISOString().slice(0, 10));
          }
        }}
      />
      <Field
        label="Check out"
        id="availability-checkout"
        value={checkOut}
        min={minCheckOut}
        onChange={setCheckOut}
      />
      <button
        type="submit"
        className="group inline-flex items-center justify-center rounded-sm bg-corten px-6 py-3 text-sm font-medium tracking-wide text-parchment transition-colors duration-150 ease-out hover:bg-corten-deep focus-visible:outline focus-visible:outline-1 focus-visible:outline-corten focus-visible:outline-offset-4 sm:py-0"
      >
        Check availability
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
          className="ml-2 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
        >
          <path
            d="M5 12h14M13 6l6 6-6 6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </form>
  );
}

function Field({
  label,
  id,
  value,
  min,
  onChange,
}: {
  label: string;
  id: string;
  value: string;
  min: string;
  onChange: (v: string) => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex flex-col gap-0.5 rounded-sm bg-parchment px-3 py-2 text-charcoal transition-colors duration-150 ease-out hover:bg-parchment-deep/40 sm:px-4"
    >
      <span className="metadata text-charcoal-soft">{label}</span>
      <input
        id={id}
        type="date"
        value={value}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        required
        className="border-0 bg-transparent p-0 text-base font-medium tracking-tight text-charcoal placeholder:text-charcoal-soft/50 focus:outline-none"
      />
    </label>
  );
}
