"use client";
import { createContext, ReactNode, useContext, useReducer } from "react";
import { APPS, AppId } from "@/lib/apps";

export interface WinState {
  id: AppId; z: number; minimized: boolean; maximized: boolean;
  x: number; y: number; w: number; h: number;
}
interface State { windows: WinState[]; topZ: number; wallpaper: number }
type Action =
  | { type: "open" | "close" | "focus" | "minimize" | "toggleMax"; id: AppId }
  | { type: "move"; id: AppId; x: number; y: number }
  | { type: "wallpaper"; i: number };

function reducer(s: State, a: Action): State {
  const upd = (id: AppId, f: (w: WinState) => Partial<WinState>) =>
    s.windows.map((w) => (w.id === id ? { ...w, ...f(w) } : w));
  switch (a.type) {
    case "open": {
      const z = s.topZ + 1;
      if (s.windows.some((w) => w.id === a.id))
        return { ...s, topZ: z, windows: upd(a.id, () => ({ minimized: false, z })) };
      const n = s.windows.length;
      const m = APPS[a.id];
      return { ...s, topZ: z, windows: [...s.windows, { id: a.id, z, minimized: false, maximized: false, x: 90 + n * 32, y: 30 + n * 32, w: m.w, h: m.h }] };
    }
    case "close": return { ...s, windows: s.windows.filter((w) => w.id !== a.id) };
    case "focus": return { ...s, topZ: s.topZ + 1, windows: upd(a.id, () => ({ z: s.topZ + 1 })) };
    case "minimize": return { ...s, windows: upd(a.id, () => ({ minimized: true })) };
    case "toggleMax": return { ...s, windows: upd(a.id, (w) => ({ maximized: !w.maximized })) };
    case "move": return { ...s, windows: upd(a.id, () => ({ x: a.x, y: a.y })) };
    case "wallpaper": return { ...s, wallpaper: a.i };
  }
}

const Ctx = createContext<{ state: State; dispatch: React.Dispatch<Action> } | null>(null);

export function OSProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { windows: [], topZ: 1, wallpaper: 0 });
  return <Ctx.Provider value={{ state, dispatch }}>{children}</Ctx.Provider>;
}

export function useOS() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useOS must be used inside OSProvider");
  return c;
}
