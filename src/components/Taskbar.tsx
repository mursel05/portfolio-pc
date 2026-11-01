"use client";
import { useEffect, useState } from "react";
import { useOS } from "@/context/OSContext";
import { APPS, APP_IDS } from "@/lib/apps";

export default function Taskbar({ activeId }: { activeId?: string }) {
  const { state, dispatch } = useOS();
  const [menu, setMenu] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const f = () => setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    f();
    const t = setInterval(f, 15000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {menu && <div className="fixed inset-0 z-[9000]" onClick={() => setMenu(false)} />}
      {menu && (
        <div className="animate-win-in absolute bottom-14 left-2 z-[9001] w-60 rounded-xl border border-white/10 bg-[#14152b]/95 p-2 shadow-2xl backdrop-blur-xl">
          {APP_IDS.map((id) => (
            <button key={id} onClick={() => { dispatch({ type: "open", id }); setMenu(false); }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-white/90 hover:bg-white/10">
              <span className="text-lg">{APPS[id].icon}</span>{APPS[id].title}
            </button>
          ))}
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 z-[9002] flex h-12 items-center gap-2 border-t border-white/10 bg-black/50 px-2 backdrop-blur-xl">
        <button onClick={() => setMenu((m) => !m)} className="rounded-lg bg-amber-300 px-3 py-1.5 text-sm font-semibold text-black hover:bg-amber-200">M OS</button>
        <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
          {state.windows.map((w) => (
            <button key={w.id}
              onClick={() => dispatch({ type: "open", id: w.id })}
              className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm text-white/90 hover:bg-white/10 ${activeId === w.id ? "bg-white/15" : ""}`}>
              {APPS[w.id].icon} <span className="hidden sm:inline">{APPS[w.id].title}</span>
            </button>
          ))}
        </div>
        <div className="px-3 text-sm tabular-nums text-white/80">{time}</div>
      </div>
    </>
  );
}
