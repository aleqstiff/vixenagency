import type { Metadata } from "next";
import { BASE_URL } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon-32.png", sizes: "32x32" }],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  title: "Only Sweety Agency",
};

// Layout raíz mínimo — el <html> lang correcto lo pone [locale]/layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
