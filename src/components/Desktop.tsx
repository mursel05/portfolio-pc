"use client";
import { useState } from "react";
import { useOS } from "@/context/OSContext";
import { APPS, APP_IDS, WALLPAPERS } from "@/lib/apps";
import Window from "./Window";
import Taskbar from "./Taskbar";

export default function Desktop() {
  const { state, dispatch } = useOS();
  const [sel, setSel] = useState<string | null>(null);

  const visible = state.windows.filter((w) => !w.minimized);
  const activeId = visible.length ? visible.reduce((a, b) => (a.z > b.z ? a : b)).id : undefined;

  const click = (id: (typeof APP_IDS)[number]) => {
    if (window.innerWidth < 768) dispatch({ type: "open", id });
    else setSel(id);
  };

  return (
    <div className="relative h-dvh w-screen overflow-hidden" style={{ background: WALLPAPERS[state.wallpaper].css }} onPointerDown={() => setSel(null)}>
      <div className="absolute left-3 top-3 z-0 flex flex-col flex-wrap gap-1" style={{ height: "calc(100% - 72px)" }}>
        {APP_IDS.map((id) => (
          <button key={id}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => click(id)}
            onDoubleClick={() => dispatch({ type: "open", id })}
            className={`flex w-24 flex-col items-center gap-1 rounded-lg p-2 text-xs text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300 ${sel === id ? "bg-white/20" : "hover:bg-white/10"}`}>
            <span className="text-4xl drop-shadow">{APPS[id].icon}</span>
            <span className="drop-shadow">{APPS[id].title}</span>
          </button>
        ))}
      </div>
      {state.windows.map((w) => <Window key={w.id} win={w} active={w.id === activeId} />)}
      <Taskbar activeId={activeId} />
    </div>
  );
}
