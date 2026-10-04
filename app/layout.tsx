import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
  display: "swap",
});

const description =
  "Elizabeth Tran is a builder at Babson College who turns messy user problems into shipped AI products.";

export const metadata: Metadata = {
  title: "Elizabeth Tran — Builder & Operator",
  description,
  authors: [{ name: "Elizabeth Tran" }],
  openGraph: {
    title: "Elizabeth Tran — Builder & Operator",
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elizabeth Tran — Builder & Operator",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <body>
        <a
          href="#main"
          className="skip-link rounded-full bg-cream px-4 py-2 label text-ink focus-visible:outline-none"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
