export type AppId = "about" | "projects" | "terminal" | "snake" | "contact" | "settings";

export const APPS: Record<AppId, { title: string; icon: string; w: number; h: number }> = {
  about: { title: "About me", icon: "🧑‍💻", w: 520, h: 420 },
  projects: { title: "Projects", icon: "🗂️", w: 600, h: 440 },
  terminal: { title: "Terminal", icon: "⌨️", w: 560, h: 380 },
  snake: { title: "Snake", icon: "🐍", w: 400, h: 500 },
  contact: { title: "Contact", icon: "📬", w: 440, h: 380 },
  settings: { title: "Settings", icon: "⚙️", w: 460, h: 360 },
};

export const APP_IDS = Object.keys(APPS) as AppId[];

export const WALLPAPERS = [
  { name: "Dusk", css: "radial-gradient(circle at 20% 20%, #4b3b8f 0%, transparent 45%), radial-gradient(circle at 80% 70%, #0f6b78 0%, transparent 50%), #12132b" },
  { name: "Ember", css: "radial-gradient(circle at 70% 25%, #b4532a 0%, transparent 45%), radial-gradient(circle at 15% 80%, #5a1f4a 0%, transparent 55%), #1a1018" },
  { name: "Forest", css: "radial-gradient(circle at 30% 30%, #1f6b4a 0%, transparent 50%), radial-gradient(circle at 85% 85%, #274c77 0%, transparent 50%), #0b1a17" },
  { name: "Paper", css: "linear-gradient(135deg, #d9d4c7, #b9c4cf)" },
];
