import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mursel | Portfolio OS",
  description: "Full-stack developer portfolio, built as an operating system.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
