import type { Metadata } from "next";
import { Bricolage_Grotesque, Caveat, Manrope, Newsreader } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tpmcollective.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TPM Collective — Think. Connect. Lead.",
    template: "%s · TPM Collective",
  },
  description:
    "A professional destination for Technical Program Managers — thoughtful writing, curated resources, and meaningful gatherings.",
  openGraph: {
    title: "TPM Collective",
    description:
      "Think. Connect. Lead. A professional home for Technical Program Managers.",
    url: siteUrl,
    siteName: "TPM Collective",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TPM Collective",
    description: "A professional destination for Technical Program Managers.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${newsreader.variable} ${bricolage.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
