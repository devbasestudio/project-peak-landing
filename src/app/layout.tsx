import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import "./globals.css";

const archivo = localFont({ src: "./fonts/archivo-variable.ttf", variable: "--font-archivo", display: "swap" });
const geist = localFont({ src: "./fonts/geist-variable.ttf", variable: "--font-geist", display: "swap", preload: false });
const geistMono = localFont({ src: "./fonts/geist-mono-variable.ttf", variable: "--font-geist-mono", display: "swap", preload: false });
const myanmarSagar = localFont({ src: "./fonts/myanmar-sagar.ttf", variable: "--font-myanmar", display: "swap" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Project Peak — Build the identity", template: "%s · Project Peak" },
  description: "စိတ်ကူးထဲက body ကို တကယ်နားလည်ပြီး လိုက်လုပ်ဖြစ်အောင် စီစဉ်ထားတဲ့ fitness system။",
  alternates: { canonical: "/" },
  applicationName: "Project Peak",
  keywords: ["Project Peak", "Myanmar fitness", "home workout", "1 on 1 coaching", "12 week workout"],
  openGraph: {
    type: "website",
    locale: "my_MM",
    siteName: "Project Peak",
    title: "Project Peak — Build the identity",
    description: "Body တစ်ခုတည်းမဟုတ်ဘဲ ရေရှည်လိုက်လုပ်နိုင်မယ့် knowledge နဲ့ habits ကို တည်ဆောက်ပါ။",
    images: [{ url: "/brand/social-card-project-peak-logo-v4.jpg", width: 1200, height: 630, alt: "Project Peak — Knowledge, Habits, Identity" }],
  },
  twitter: { card: "summary_large_image", images: ["/brand/social-card-project-peak-logo-v4.jpg"] },
  icons: {
    icon: [
      { url: "/brand/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon-48.png", sizes: "48x48", type: "image/png" },
    ],
    shortcut: [
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      {
        url: "/brand/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export const viewport: Viewport = { themeColor: "#06111a", colorScheme: "light" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="my" className={`${archivo.variable} ${geist.variable} ${geistMono.variable} ${myanmarSagar.variable}`}>
      <body>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
