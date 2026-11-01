"use client";
import { useOS } from "@/context/OSContext";
import { WALLPAPERS } from "@/lib/apps";

export default function Settings() {
  const { state, dispatch } = useOS();
  return (
    <div className="p-6">
      <h2 className="mb-3 font-semibold text-white">Wallpaper</h2>
      <div className="grid grid-cols-2 gap-3">
        {WALLPAPERS.map((w, i) => (
          <button key={w.name} onClick={() => dispatch({ type: "wallpaper", i })}
            className={`h-24 rounded-xl border-2 text-sm font-medium text-white drop-shadow ${state.wallpaper === i ? "border-amber-300" : "border-transparent"}`}
            style={{ background: w.css }}>{w.name}</button>
        ))}
      </div>
    </div>
  );
}
