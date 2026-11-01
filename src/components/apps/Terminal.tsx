"use client";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useOS } from "@/context/OSContext";
import { APPS, APP_IDS, AppId } from "@/lib/apps";
import { PROFILE, PROJECTS } from "@/lib/data";

interface Line { cmd?: string; out?: string }

export default function Terminal() {
  const { dispatch } = useOS();
  const [lines, setLines] = useState<Line[]>([{ out: "MurselOS terminal. Type 'help' to see commands." }]);
  const [v, setV] = useState("");
  const end = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => { end.current?.scrollIntoView(); }, [lines]);
  useEffect(() => { input.current?.focus(); }, []);

  const run = (raw: string) => {
    const [c = "", ...a] = raw.trim().split(/\s+/);
    let out = "";
    switch (c.toLowerCase()) {
      case "": break;
      case "help": out = "about  skills  projects  contact  open <app>  apps  date  whoami  clear  sudo"; break;
      case "about": out = `${PROFILE.name}, ${PROFILE.role} at ${PROFILE.company}.\n${PROFILE.bio}`; break;
      case "skills": out = PROFILE.skills.join(", "); break;
      case "projects": out = PROJECTS.map((p) => `${p.icon} ${p.name}: ${p.desc}`).join("\n"); break;
      case "contact": out = `${PROFILE.email}\n${PROFILE.links.map((l) => l.href).join("\n")}`; break;
      case "apps": out = APP_IDS.join("  "); break;
      case "date": out = new Date().toString(); break;
      case "whoami": out = "visitor (welcome!)"; break;
      case "sudo": out = "Nice try. Permission denied."; break;
      case "clear": setLines([]); return;
      case "open": {
        const id = a[0] as AppId;
        if (id && APPS[id]) { dispatch({ type: "open", id }); out = `Opening ${id}...`; }
        else out = "Usage: open <app>. Type 'apps' for the list.";
        break;
      }
      default: out = `command not found: ${c}`;
    }
    setLines((l) => [...l, { cmd: raw }, ...(out ? [{ out }] : [])]);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { run(v); setV(""); }
  };

  return (
    <div className="h-full cursor-text bg-black/60 p-3 font-mono text-sm" onClick={() => input.current?.focus()}>
      {lines.map((l, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {l.cmd !== undefined ? <><span className="text-amber-300">visitor@mursel-os:~$ </span>{l.cmd}</> : <span className="text-white/75">{l.out}</span>}
        </div>
      ))}
      <div className="flex">
        <span className="text-amber-300">visitor@mursel-os:~$&nbsp;</span>
        <input ref={input} value={v} onChange={(e) => setV(e.target.value)} onKeyDown={onKey}
          className="flex-1 bg-transparent outline-none" autoCapitalize="off" autoCorrect="off" spellCheck={false} />
      </div>
      <div ref={end} />
    </div>
  );
}
