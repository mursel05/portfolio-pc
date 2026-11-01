"use client";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

const N = 18, C = 20;
type P = { x: number; y: number };
const randFood = (snake: P[]): P => {
  let f: P;
  do { f = { x: Math.floor(Math.random() * N), y: Math.floor(Math.random() * N) }; }
  while (snake.some((p) => p.x === f.x && p.y === f.y));
  return f;
};
const fresh = () => ({ snake: [{ x: 9, y: 9 }] as P[], dir: { x: 1, y: 0 }, next: { x: 1, y: 0 }, food: { x: 4, y: 4 }, dead: false, score: 0 });

export default function Snake() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const g = useRef(fresh());
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [dead, setDead] = useState(false);

  const turn = (x: number, y: number) => {
    const c = g.current;
    if (c.dir.x === -x && c.dir.y === -y) return;
    c.next = { x, y };
  };
  const reset = () => { g.current = fresh(); setScore(0); setDead(false); wrap.current?.focus(); };

  useEffect(() => {
    wrap.current?.focus();
    const ctx = canvas.current!.getContext("2d")!;
    const draw = () => {
      const c = g.current;
      ctx.fillStyle = "#0b0c1c"; ctx.fillRect(0, 0, N * C, N * C);
      ctx.fillStyle = "#ff6b8b"; ctx.fillRect(c.food.x * C + 3, c.food.y * C + 3, C - 6, C - 6);
      c.snake.forEach((p, i) => { ctx.fillStyle = i === 0 ? "#ffd479" : "#ffb547"; ctx.fillRect(p.x * C + 1, p.y * C + 1, C - 2, C - 2); });
    };
    draw();
    const t = setInterval(() => {
      const c = g.current;
      if (c.dead) return;
      c.dir = c.next;
      const h = { x: c.snake[0].x + c.dir.x, y: c.snake[0].y + c.dir.y };
      if (h.x < 0 || h.y < 0 || h.x >= N || h.y >= N || c.snake.some((p) => p.x === h.x && p.y === h.y)) {
        c.dead = true; setDead(true); setBest((b) => Math.max(b, c.score)); return;
      }
      c.snake.unshift(h);
      if (h.x === c.food.x && h.y === c.food.y) { c.score++; setScore(c.score); c.food = randFood(c.snake); }
      else c.snake.pop();
      draw();
    }, 110);
    return () => clearInterval(t);
  }, []);

  const onKey = (e: KeyboardEvent) => {
    const m: Record<string, [number, number]> = { ArrowUp: [0, -1], w: [0, -1], ArrowDown: [0, 1], s: [0, 1], ArrowLeft: [-1, 0], a: [-1, 0], ArrowRight: [1, 0], d: [1, 0] };
    const d = m[e.key];
    if (d) { e.preventDefault(); turn(...d); }
  };

  const pad = "h-12 w-12 rounded-lg bg-white/10 text-lg active:bg-white/25";
  return (
    <div ref={wrap} tabIndex={0} onKeyDown={onKey} className="flex flex-col items-center gap-3 p-4 outline-none">
      <div className="flex w-full max-w-[360px] justify-between text-sm"><span>Score {score}</span><span>Best {best}</span></div>
      <div className="relative">
        <canvas ref={canvas} width={N * C} height={N * C} className="rounded-lg border border-white/10" />
        {dead && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-lg bg-black/70">
            <p className="text-lg font-semibold">Game over: {score}</p>
            <button onClick={reset} className="rounded-lg bg-amber-300 px-4 py-2 font-semibold text-black">Play again</button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-1">
        <span /><button className={pad} onClick={() => turn(0, -1)}>↑</button><span />
        <button className={pad} onClick={() => turn(-1, 0)}>←</button>
        <button className={pad} onClick={() => turn(0, 1)}>↓</button>
        <button className={pad} onClick={() => turn(1, 0)}>→</button>
      </div>
    </div>
  );
}
