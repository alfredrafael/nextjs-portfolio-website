import type { Metadata } from "next";
import "./[slug]/scripts.css";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
    },
  },
};

export default function ScriptsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
