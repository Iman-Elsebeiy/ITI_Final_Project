"use client";

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import AssistantWidget from "@/components/AssistantWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Pages that should NOT show the sidebar / top bar (pure landing & auth flows)
  const publicPages = [
    "/",
    "/login",
    "/signup",
    "/forgot-password",
    "/setup",
    "/terms",
    "/privacy",
  ];

  const isPublicPage = publicPages.includes(pathname);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <title>UniTool 2.0 - Share • Rent • Save</title>
        <meta
          name="description"
          content="UniTool - The ultimate university student marketplace for renting and sharing academic tools, equipment, and resources. Save money, earn income, and connect with fellow students."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1DA5A6" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-full flex flex-col bg-[#F1F3F5]">
        {isPublicPage ? (
          // Public pages without sidebar
          <div className="flex-1">{children}</div>
        ) : (
          // Authenticated pages: fixed icon rail + top bar
          <div className="min-h-screen">
            <Sidebar />
            <div className="ml-20 flex min-h-screen flex-col">
              <TopBar />
              <div className="min-h-0 flex-1 bg-[#F1F3F5] p-6">{children}</div>
            </div>
          </div>
        )}
        <AssistantWidget />
      </body>
    </html>
  );
}