"use client";
import { useEffect, useState } from "react";

const LINES = [
  "MurselOS BIOS v1.0",
  "Checking memory ............ ok",
  "Loading TypeScript ......... ok",
  "Mounting /projects ......... ok",
  "Starting window manager .... ok",
  "Welcome.",
];

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);
  const [out, setOut] = useState(false);

  useEffect(() => {
    if (n < LINES.length) {
      const t = setTimeout(() => setN(n + 1), 380);
      return () => clearTimeout(t);
    }
    const t1 = setTimeout(() => setOut(true), 500);
    const t2 = setTimeout(onDone, 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [n, onDone]);

  return (
    <div className={`fixed inset-0 z-[9999] bg-black p-8 font-mono text-sm text-amber-300 transition-opacity duration-500 ${out ? "opacity-0" : "opacity-100"}`}>
      {LINES.slice(0, n).map((l) => <div key={l}>{l}</div>)}
      <span className="caret inline-block h-4 w-2 bg-amber-300 align-middle" />
    </div>
  );
}
