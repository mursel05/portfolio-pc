"use client";
import { useCallback, useState } from "react";
import { OSProvider } from "@/context/OSContext";
import BootScreen from "@/components/BootScreen";
import Desktop from "@/components/Desktop";

export default function Home() {
  const [booted, setBooted] = useState(false);
  const done = useCallback(() => setBooted(true), []);
  return (
    <OSProvider>
      <Desktop />
      {!booted && <BootScreen onDone={done} />}
    </OSProvider>
  );
}
