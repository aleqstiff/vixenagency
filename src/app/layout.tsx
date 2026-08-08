import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
