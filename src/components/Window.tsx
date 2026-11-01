"use client";
import { PointerEvent, useEffect, useState } from "react";
import { useOS, WinState } from "@/context/OSContext";
import { APPS, AppId } from "@/lib/apps";
import About from "./apps/About";
import Projects from "./apps/Projects";
import Terminal from "./apps/Terminal";
import Snake from "./apps/Snake";
import Contact from "./apps/Contact";
import Settings from "./apps/Settings";

function View({ id }: { id: AppId }) {
  switch (id) {
    case "about": return <About />;
    case "projects": return <Projects />;
    case "terminal": return <Terminal />;
    case "snake": return <Snake />;
    case "contact": return <Contact />;
    case "settings": return <Settings />;
  }
}

export default function Window({ win, active }: { win: WinState; active: boolean }) {
  const { dispatch } = useOS();
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const f = () => setMobile(window.innerWidth < 768);
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);

  const full = win.maximized || mobile;
  const meta = APPS[win.id];

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    dispatch({ type: "focus", id: win.id });
    if (full) return;
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
    const ox = e.clientX - win.x, oy = e.clientY - win.y;
    const move = (ev: globalThis.PointerEvent) =>
      dispatch({ type: "move", id: win.id, x: ev.clientX - ox, y: Math.max(0, ev.clientY - oy) });
    const up = () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerup", up); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
  };

  const style = full
    ? { left: 0, top: 0, width: "100%", height: "calc(100% - 48px)", zIndex: win.z }
    : { left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z };

  const btn = "h-6 w-6 rounded-full text-xs text-white/80 hover:bg-white/15";

  return (
    <div
      style={style}
      onPointerDown={() => dispatch({ type: "focus", id: win.id })}
      className={`animate-win-in absolute flex flex-col overflow-hidden border bg-[#14152b]/95 shadow-2xl backdrop-blur-xl transition-[opacity,transform] duration-200 ${full ? "rounded-none" : "rounded-xl"} ${active ? "border-amber-300/40" : "border-white/10"} ${win.minimized ? "pointer-events-none translate-y-6 scale-90 opacity-0" : "opacity-100"}`}
    >
      <div onPointerDown={onDown} onDoubleClick={() => dispatch({ type: "toggleMax", id: win.id })}
        className="flex h-10 shrink-0 cursor-grab touch-none select-none items-center justify-between border-b border-white/10 bg-white/5 px-3 active:cursor-grabbing">
        <span className="text-sm text-white/90">{meta.icon} {meta.title}</span>
        <div className="flex gap-1" onPointerDown={(e) => e.stopPropagation()}>
          <button aria-label="Minimize" className={btn} onClick={() => dispatch({ type: "minimize", id: win.id })}>–</button>
          <button aria-label="Maximize" className={btn} onClick={() => dispatch({ type: "toggleMax", id: win.id })}>▢</button>
          <button aria-label="Close" className={`${btn} hover:!bg-red-500/80`} onClick={() => dispatch({ type: "close", id: win.id })}>✕</button>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-auto text-white/85"><View id={win.id} /></div>
    </div>
  );
}
