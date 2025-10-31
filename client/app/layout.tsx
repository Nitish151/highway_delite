import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BookIt - Experiences & Slots",
  description: "Book amazing travel experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
