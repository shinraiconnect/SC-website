import type { Metadata } from "next";
import "./globals.css";
import "./interactions.css";
import "./pages.css";
import LoadingScreen from "./loading-screen";
import LogoCursor from "./logo-cursor";

export const metadata: Metadata = {
  title: "Shinrai Connect | Trust. Strategy. Growth.",
  description: "Data-driven digital marketing that helps businesses grow.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><LoadingScreen /><LogoCursor />{children}</body>
    </html>
  );
}
