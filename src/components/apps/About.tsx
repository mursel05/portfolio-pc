import { PROFILE } from "@/lib/data";

export default function About() {
  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-300 text-3xl font-bold text-black">{PROFILE.name[0]}</div>
        <div>
          <h1 className="text-2xl font-semibold text-white">{PROFILE.name}</h1>
          <p className="text-sm text-white/60">{PROFILE.role} at {PROFILE.company}</p>
        </div>
      </div>
      <p className="max-w-prose leading-relaxed">{PROFILE.bio}</p>
      <div className="flex flex-wrap gap-2">
        {PROFILE.skills.map((s) => <span key={s} className="rounded-full border border-white/15 px-3 py-1 text-xs">{s}</span>)}
      </div>
      <p className="text-sm text-white/50">Tip: open the Terminal and type help.</p>
    </div>
  );
}
