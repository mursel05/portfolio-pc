import { PROJECTS } from "@/lib/data";

export default function Projects() {
  return (
    <div className="grid gap-3 p-4 sm:grid-cols-2">
      {PROJECTS.map((p) => (
        <div key={p.name} className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:border-amber-300/50">
          <div className="mb-2 text-3xl">{p.icon}</div>
          <h2 className="font-semibold text-white">{p.name}</h2>
          <p className="my-2 text-sm text-white/70">{p.desc}</p>
          <div className="mb-3 flex flex-wrap gap-1">
            {p.tags.map((t) => <span key={t} className="rounded bg-white/10 px-2 py-0.5 text-xs">{t}</span>)}
          </div>
          {p.href && <a href={p.href} target="_blank" rel="noreferrer" className="text-sm text-amber-300 hover:underline">Visit site</a>}
        </div>
      ))}
    </div>
  );
}
