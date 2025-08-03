import type React from "react";
import type { Metadata } from "next";
import ClientLayout from "./ClientLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Linkups Платформ",
  description: "Уулзалт, арга хэмжээг нэгтгэсэн платформ",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
