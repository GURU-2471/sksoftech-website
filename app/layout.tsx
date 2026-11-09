import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ThemeInjector from "@/components/ThemeInjector";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "SK Softech and Digital Marketing | Pune",
  description:
    "SK Softech and Digital Marketing — Your trusted digital partner in Pune for Website Development, Mobile Apps, Digital Marketing, SEO, Graphic Design, and more. Technology | Creativity | Growth.",
  keywords:
    "SK Softech, web development Pune, digital marketing Pune, mobile app development, SEO, graphic design, software development",
  authors: [{ name: "SK Softech and Digital Marketing" }],
  openGraph: {
    title: "SK Softech and Digital Marketing",
    description: "Your Vision | Our Technology | Your Growth",
    url: "https://sksoftech.in",
    siteName: "SK Softech",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SK Softech and Digital Marketing",
    description: "Your Vision | Our Technology | Your Growth",
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
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
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
