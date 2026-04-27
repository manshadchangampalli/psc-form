import JoinForm from "./JoinForm";
import RegistrationCounter from "./RegistrationCounter";
import { Trophy, MessageCircle, Sparkles, CheckCircle2 } from "lucide-react";

const FEATURES = [
  { icon: MessageCircle, text: "ദിവസവും 10 ചോദ്യങ്ങൾ" },
  { icon: Trophy, text: "വിദഗ്ധർ തയ്യാറാക്കിയത്" },
  { icon: CheckCircle2, text: "സൗജന്യ 1 മാസ ട്രയൽ" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-soft select-none">
      <header className="sticky top-0 z-50 border-b border-psc-200 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero text-white shadow-card">
              <Trophy className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-psc-900">PSC വിജയം</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-psc-50 px-4 py-1.5 text-sm font-bold text-psc-500">
            <Sparkles className="h-4 w-4" />
            <span>ഫ്രീ ട്രയൽ</span>
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-12 p-4 lg:grid-cols-2 lg:gap-16 lg:py-10">
        <section className="flex flex-col gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-psc-200 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-accent-amber-dark">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-psc-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-psc-500"></span>
            </span>
            ആദ്യ 100 പേർക്ക് ഒരു മാസം സൗജന്യം.
          </div>

          <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-psc-900 sm:text-5xl lg:text-[3.8rem]">
            നിങ്ങൾ <span className="text-gradient-hero">PSC പരീക്ഷയ്ക്ക്</span> തയ്യാറെടുക്കുന്നുണ്ടോ?
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-psc-800/90 sm:text-xl">
            ദിവസവും{" "}
            <strong className="font-bold text-psc-900 underline decoration-psc-500/30 decoration-4 underline-offset-4">
              10 ട്രെൻഡിങ് PSC ചോദ്യങ്ങൾ
            </strong>{" "}
            നേരിട്ട് നിങ്ങളുടെ വാട്സാപ്പിൽ കിട്ടിയാലോ? വിജയത്തിലേക്കുള്ള ആദ്യ ചുവട് ഇന്നുതന്നെ വെക്കാം!
          </p>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {FEATURES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-4 rounded-2xl border border-psc-200 bg-white p-2 shadow-card hover:border-psc-300 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-psc-50 text-psc-500">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-bold text-psc-900">{text}</span>
              </div>
            ))}
          </div>

          <RegistrationCounter />
        </section>

        <section className="relative">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-psc-500/5 blur-2xl" />
          <div className="relative rounded-3xl border border-psc-200 bg-white p-4 shadow-elegant sm:p-4">
            <JoinForm />
          </div>
        </section>
      </main>
    </div>
  );
}
