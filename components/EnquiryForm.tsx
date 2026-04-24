"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "sent" | "error";

export default function EnquiryForm() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    // No backend wired yet — pretend-await so the UI feels real for design review.
    await new Promise((r) => setTimeout(r, 700));
    setState("sent");
    (e.target as HTMLFormElement).reset();
  }

  if (state === "sent") {
    return (
      <div className="rounded-sm border border-line bg-parchment-deep p-8">
        <p className="eyebrow">Thank you</p>
        <h3 className="mt-3 font-serif text-2xl">We&apos;ll be in touch shortly.</h3>
        <p className="mt-3 text-sm text-charcoal-soft">
          Mark or Gillian will reply, usually within the hour.
        </p>
        <button
          onClick={() => setState("idle")}
          className="mt-6 text-sm font-medium text-corten hover:underline"
        >
          Send another note
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Arrive" name="arrive" type="date" />
        <Field label="Depart" name="depart" type="date" />
      </div>
      <div>
        <label className="eyebrow block">Pod</label>
        <select
          name="pod"
          defaultValue=""
          className="mt-2 w-full border-b border-line bg-transparent py-2 text-base text-charcoal focus:border-corten focus:outline-none"
        >
          <option value="">No preference</option>
          <option value="the-ophir">The Ophir — 1 br</option>
          <option value="the-felix">The Felix — 2 br</option>
          <option value="the-uphaz">The Uphaz — 2 br</option>
        </select>
      </div>
      <div>
        <label className="eyebrow block">A note (optional)</label>
        <textarea
          name="message"
          rows={4}
          className="mt-2 w-full border-b border-line bg-transparent py-2 text-base text-charcoal focus:border-corten focus:outline-none"
          placeholder="Anything we should know?"
        />
      </div>

      <div className="mt-2">
        <button
          type="submit"
          disabled={state === "submitting"}
          className="inline-flex items-center justify-center rounded-full bg-corten px-7 py-3 text-sm font-medium tracking-wide text-parchment transition-all duration-300 hover:bg-corten-deep disabled:opacity-60"
        >
          {state === "submitting" ? "Sending…" : "Send enquiry"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full border-b border-line bg-transparent py-2 text-base text-charcoal focus:border-corten focus:outline-none"
      />
    </label>
  );
}
