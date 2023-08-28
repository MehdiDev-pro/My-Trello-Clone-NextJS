import Model from "@/components/Model";
import "./globals.css";
import type { Metadata } from "next";
import ModelPrompt from "@/components/ModelPrompt";

export const metadata: Metadata = {
  title: "My Trello",
  description: "My Trello app clone by Mehdi Hassan with Next Js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F5F6F8] pb-10">
        {children}
        <Model />
        <ModelPrompt />
      </body>
    </html>
  );
}
