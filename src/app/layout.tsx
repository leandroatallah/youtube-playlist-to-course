import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ToastStack, ToastProvider } from "@/components/Toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Utemy - Youtube's playlists to courses",
  description: "by @leandroatallah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ToastProvider>
          <div
            style={{
              maxWidth: 768,
              margin: "0 auto",
              padding: "0 20px",
            }}
          >
            {children}
          </div>
          <ToastStack />
        </ToastProvider>
      </body>
    </html>
  );
}
