import type { Metadata } from "next";
import { Instrument_Serif, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elizabeth Tran — AI Agent Builder & Automation Expert",
  description:
    "Elizabeth Tran builds AI agents, automates workflows with Claude Code and n8n, and leads entrepreneurial initiatives at Babson College. Outreach Lead at The Generator.",
  keywords: [
    "Elizabeth Tran",
    "AI Agent Builder",
    "Claude Code",
    "n8n",
    "AI Automation",
    "Babson College",
    "Entrepreneurship",
    "Prompt Engineering",
  ],
  authors: [{ name: "Elizabeth Tran" }],
  openGraph: {
    title: "Elizabeth Tran — AI Agent Builder & Automation Expert",
    description: "I build AI that works for people.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elizabeth Tran — AI Agent Builder",
    description: "I build AI that works for people.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${instrumentSans.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        {/* Reveals only hide when JS can un-hide them. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
