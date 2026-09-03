"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressTimer = window.setInterval(() => setProgress((value) => Math.min(value + 8, 100)), 45);
    const hideTimer = window.setTimeout(() => setVisible(false), 900);
    return () => { window.clearInterval(progressTimer); window.clearTimeout(hideTimer); };
  }, []);

  if (!visible) return null;
  return <div className="loading-screen" aria-label="Loading Shinrai Connect"><div className="loader-grid" /><img src="/shinrai-logo.png" alt="" /><div className="loader-wordmark">SHINRAI<span>CONNECT</span></div><div className="loader-bar"><i style={{ width: `${progress}%` }} /></div><small>INITIALIZING GROWTH SYSTEM / {progress}%</small></div>;
}
