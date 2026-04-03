import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "CosmoOS - AI Executive Assistant",
  description: "Your autonomous AI assistant for email and calendar management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <ClerkProvider appearance={{ theme: shadcn }}>
          {children}
          <footer className="footer-wrapper">
            <div className="section-heading">
              <p className="text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} CosmoOS, by OpenCosmo.
              </p>
            </div>
          </footer>
        </ClerkProvider>
      </body>
    </html>
  );
}
