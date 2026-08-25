import type { Metadata } from "next";
import { Anton, Manrope, Oswald, Caveat } from "next/font/google";
import "./globals.css";
import { CursorProvider } from "@/lib/context/CursorContext";
import CustomCursor from "@/components/layout/CustomCursor";
import { SITE } from "@/lib/data/site";

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sfx = Oswald({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-sfx",
  display: "swap",
});

const hand = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.role}`,
  description: SITE.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${sans.variable} ${sfx.variable} ${hand.variable} font-sans cursor-enabled`}
      >
        <CursorProvider>
          <CustomCursor />
          {children}
        </CursorProvider>
      </body>
    </html>
  );
}
