import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "../styles/globals.css";
import "normalize.css";
import { ReactQueryProvider } from "../providers/query-client";
import { Header } from "@/src/widgets/header/ui";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clans | Empire Clash",
  description:
    "The essential Discord bot for Empire Clash clan leaders. Streamline member management, track performance stats, coordinate battles, and verify clan qualifications with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body
          className={`${nunitoSans.variable} flex h-screen flex-col antialiased`}
        >
          <Header className="sticky left-0 top-0" />
          {children}
        </body>
      </ReactQueryProvider>
    </html>
  );
}
