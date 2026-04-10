import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
// استورد الـ Topbar لو جاهز، لو مش جاهز ممكن نعمله مكان مؤقت
// import Topbar from "@/components/Topbar"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UniTool | University Marketplace",
  description: "Buy, sell, and rent engineering tools locally",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full bg-gray-100">
        <div className="flex min-h-screen">
          
          {/* 1. الـ Sidebar: ثابت في مكانه على الشمال في الشاشات الكبيرة */}
          <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50">
            <Sidebar />
          </aside>

          {/* 2. منطقة المحتوى الرئيسية: بتبدأ بعد الـ Sidebar */}
          <div className="flex flex-col flex-1 md:pl-64">
            
            {/* 3. الـ Topbar/Header: لو إيمان عملته حطه هنا عشان يظهر في كل الصفحات */}
            {/* <Topbar /> */}

            {/* 4. محتوى الصفحة المتغير (Home, Profile, etc.) */}
            <main className="flex-1">
              <div className="py-6 px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>

          </div>
        </div>
      </body>
    </html>
  );
}