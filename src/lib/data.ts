// EDIT YOUR CONTENT HERE
export const PROFILE = {
  name: "Mursel",
  role: "Full-stack developer",
  company: "Microsol",
  bio: "I build web products end to end: interfaces people enjoy using and backends that stay up. This whole site is an operating system, so poke around.",
  skills: ["TypeScript", "React", "Next.js", "NestJS", "Tailwind CSS", "PostgreSQL", "SignalR", "Docker"],
  links: [
    { label: "Website", href: "https://mursal.dev" },
    { label: "Microsol", href: "https://microsol.az" },
    { label: "GitHub", href: "https://github.com/your-username" },
    { label: "LinkedIn", href: "https://linkedin.com/in/your-username" },
  ],
  email: "your@email.com",
};

export interface Project {
  name: string;
  icon: string;
  desc: string;
  tags: string[];
  href?: string;
}

export const PROJECTS: Project[] = [
  { name: "Hiri", icon: "💼", desc: "Job platform connecting seekers and employers, with real-time messaging.", tags: ["Next.js", "SignalR"], href: "https://hiri.az" },
  { name: "Storo", icon: "🏬", desc: "Multi-tenant wholesale catalog platform for B2B2C storefronts.", tags: ["NestJS", "Multi-tenant"] },
  { name: "MorninX", icon: "✉️", desc: "Animated UI components: letter opening, countdown timers and more.", tags: ["React", "Animation"] },
];
