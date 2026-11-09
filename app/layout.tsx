import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ThemeInjector from "@/components/ThemeInjector";
import ClientThemeSync from "@/components/ClientThemeSync";
import VisitorTracker from "@/components/VisitorTracker";
import JsonLd from "@/components/JsonLd";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://sksoftechdm.com"),
  title: {
    default: "SK Softech and Digital Marketing | Best Web Development & SEO in Pune",
    template: "%s | SK Softech Pune",
  },
  description:
    "Leading IT solutions & digital marketing agency in Pune. Custom Website Development, Mobile Apps, High-ROI Digital Marketing, SEO, and Society Management SaaS. Founded by Shubham Kale.",
  keywords: [
    "SK Softech",
    "web development Pune",
    "website designer Pune",
    "digital marketing agency Pune",
    "SEO services Pune",
    "mobile app development Maharashtra",
    "custom software development Pune",
    "society management software Pune",
  ],
  authors: [{ name: "Shubham Kale", url: "https://sksoftechdm.com" }],
  creator: "SK Softech and Digital Marketing",
  publisher: "SK Softech",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "SK Softech and Digital Marketing | Pune",
    description: "Your Vision | Our Technology | Your Growth. Premier Web & Software Development.",
    url: "https://sksoftechdm.com",
    siteName: "SK Softech",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SK Softech and Digital Marketing | Pune",
    description: "Your Vision | Our Technology | Your Growth. Premier Web & Software Development.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <ThemeInjector />
        <JsonLd />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ClientThemeSync />
        <VisitorTracker />
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#0B1F4B",
              color: "#fff",
            },
            success: {
              iconTheme: { primary: "#FFC21A", secondary: "#0B1F4B" },
            },
          }}
        />
      </body>
    </html>
  );
}
