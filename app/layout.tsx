import type { Metadata } from "next";
import { Bricolage_Grotesque, Albert_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const albertSans = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elizabeth Tran — AI Agent Builder & Automation Expert",
  description:
    "Elizabeth Tran builds AI agents, automates workflows with Claude Code and n8n, and leads entrepreneurial initiatives at Babson College. External Partnerships Lead at The Generator.",
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
      className={`${bricolage.variable} ${albertSans.variable} dark`}
      suppressHydrationWarning
    >
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
