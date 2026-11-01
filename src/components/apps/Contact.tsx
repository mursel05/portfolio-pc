import { PROFILE } from "@/lib/data";

export default function Contact() {
  return (
    <div className="space-y-4 p-6">
      <h2 className="text-xl font-semibold text-white">Say hello</h2>
      <a href={`mailto:${PROFILE.email}`} className="block rounded-xl bg-amber-300 px-4 py-3 text-center font-semibold text-black hover:bg-amber-200">{PROFILE.email}</a>
      <div className="grid gap-2">
        {PROFILE.links.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:border-amber-300/50 hover:bg-white/5">{l.label}</a>
        ))}
      </div>
    </div>
  );
}
