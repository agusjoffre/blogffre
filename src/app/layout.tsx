import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import Header from "@/components/header";

const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Un Blog de Historia",
  description: "Un Blog de Historia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={lora.className}>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
