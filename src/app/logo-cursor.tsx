"use client";

import { useEffect, useRef } from "react";

export default function LogoCursor() {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (event: MouseEvent) => { if (cursor.current) { cursor.current.style.transform = `translate3d(${event.clientX + 14}px, ${event.clientY + 14}px, 0)`; cursor.current.style.opacity = "1"; } };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div className="logo-cursor" ref={cursor} aria-hidden="true"><img src="/shinrai-logo.png" alt="" /></div>;
}
