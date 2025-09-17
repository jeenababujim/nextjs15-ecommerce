import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "E-commerce Store",
  description: "The best e-commerce store built with Next.js",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider 
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
          <>
          <header>
           <Navbar />
          </header>
           {children}
           <footer className="border-t border-dashed py-6">
            <div className="container mx-auto py-4 text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} MyStore. All rights reserved.
            </div>
           </footer>
         </>
        </ThemeProvider>
      </body>
    </html>
  );
}
