"use client";

import { useActionState, useRef, useTransition, useEffect, useState } from "react";
import { joinWhatsAppList, type JoinFormState } from "./actions";
import { CheckCircle2, Send, Loader2 } from "lucide-react";
import Script from "next/script";

const initialState: JoinFormState = { status: "idle", message: "" };

const STORAGE_KEY_COUNT = "psc_submitted_count";
const STORAGE_KEY_DONE = "psc_form_already_submitted";
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export default function JoinForm() {
  const [state, formAction] = useActionState(joinWhatsAppList, initialState);
  const [pending, startTransition] = useTransition();
  const [isAlreadySubmitted, setIsAlreadySubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Check for existing submission on mount
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY_DONE)) {
      setIsAlreadySubmitted(true);
    }
  }, []);

  // Handle success side effects
  useEffect(() => {
    if (state.status === "success") {
      // Set submission flag
      localStorage.setItem(STORAGE_KEY_DONE, "true");
      
      // Increment global counter
      const stored = localStorage.getItem(STORAGE_KEY_COUNT);
      const current = stored ? parseInt(stored, 10) : 87;
      const next = isNaN(current) ? 88 : current + 1;
      localStorage.setItem(STORAGE_KEY_COUNT, String(next));
      window.dispatchEvent(new Event("storage"));
    }
  }, [state.status]);

  if (isAlreadySubmitted || state.status === "success") {
    return (
      <div className="flex flex-col items-center gap-5 rounded-2xl border border-psc-100 bg-psc-50/40 p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-hero text-white shadow-card">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-psc-900">
            {isAlreadySubmitted ? "നിങ്ങൾ നേരത്തെ രജിസ്റ്റർ ചെയ്തിട്ടുണ്ട്!" : "രജിസ്ട്രേഷൻ വിജയകരം!"}
          </h3>
          <p className="text-base font-medium text-psc-800">
            {isAlreadySubmitted 
              ? "ഞങ്ങൾ നിങ്ങളെ ഉടൻ ബന്ധപ്പെടും."
              : state.message || "ഞങ്ങൾ നിങ്ങളെ ഉടൻ ബന്ധപ്പെടും."}
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (formData: FormData) => {
    if (typeof window !== "undefined" && window.grecaptcha) {
      try {
        const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
          action: "submit",
        });
        formData.append("recaptchaToken", token);
      } catch (err) {
        console.error("reCAPTCHA execution failed", err);
      }
    }
    startTransition(() => formAction(formData));
  };

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
      />
      <form
        ref={formRef}
        action={handleSubmit}
        className="flex flex-col gap-6"
        noValidate
      >
        <div className="mb-2 text-center">
          <h2 className="text-2xl font-black text-psc-900 sm:text-3xl">ഇപ്പോൾ തന്നെ ഫോം പൂരിപ്പിക്കുക</h2>
          <p className="mt-3 font-medium text-psc-600">1 മാസത്തെ സൗജന്യ ട്രയൽ ഉറപ്പിക്കൂ</p>
        </div>
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-black text-psc-900 ml-1">
            പൂർണ്ണ നാമം
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="നിങ്ങളുടെ പേര്"
            className="w-full rounded-2xl border border-psc-100 bg-psc-50/50 px-5 py-4 text-base font-medium outline-none transition focus:border-psc-500 focus:bg-white focus:ring-4 focus:ring-psc-500/10 placeholder:text-neutral-400"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-black text-psc-900 ml-1">
            വാട്സാപ്പ് നമ്പർ
          </label>
          <div className="flex gap-2">
            <span className="inline-flex items-center justify-center rounded-2xl bg-psc-100/40 px-5 py-4 text-base font-black text-psc-700">
              +91
            </span>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              inputMode="numeric"
              autoComplete="tel"
              placeholder="10 അക്ക നമ്പർ"
              className="w-full rounded-2xl border border-psc-100 bg-psc-50/50 px-5 py-4 text-base font-black tracking-widest outline-none transition focus:border-psc-500 focus:bg-white focus:ring-4 focus:ring-psc-500/10 placeholder:text-neutral-400 placeholder:tracking-normal"
            />
          </div>
        </div>

        {state.status === "error" && !pending && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-bold text-red-600 animate-in shake-1">
            {state.message}
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-hero py-4.5 text-lg font-black text-white shadow-elegant transition-all hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
          {pending ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <>
              <span>ഇപ്പോൾ ചേരുക — സൗജന്യം</span>
              <Send className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </>
          )}
        </button>

        <p className="flex items-center justify-center gap-2 text-center text-xs font-bold text-neutral-500">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-psc-50 text-[10px]">🔒</span>
          നിങ്ങളുടെ വിവരങ്ങൾ സുരക്ഷിതം. സ്പാം ഇല്ല.
        </p>
      </form>
    </>
  );
}
