import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const fontSans = Geist({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "SmartRecruit - AI-Powered Recruitment Platform",
  description:
    "Find your perfect job match with SmartRecruit's AI-powered recruitment platform. Connect talented professionals with great opportunities.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased text-[20px] md:text-[20px] bg-[radial-gradient(circle_at_20%_20%,rgba(56,197,185,0.18),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(94,234,212,0.18),transparent_32%),radial-gradient(circle_at_50%_100%,rgba(56,197,185,0.12),transparent_40%)]`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
