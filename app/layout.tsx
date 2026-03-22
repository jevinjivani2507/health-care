import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, Noto_Sans, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/providers/auth-provider";
import { ServiceWorkerRegister } from "@/providers/service-worker-register";
import { TooltipProvider } from "@/components/ui/tooltip";

const nunitoSans = Nunito_Sans({subsets:['latin'],variable:'--font-sans'});

const geistHeading = Geist({subsets:['latin'],variable:'--font-heading'});
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HealthHub",
  description: "B2B Healthcare SaaS Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
              "h-full antialiased",
              geistSans.variable,
              geistMono.variable,
              jetbrainsMono.variable
            , "font-sans", nunitoSans.variable, geistHeading.variable)}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <ServiceWorkerRegister />
          <TooltipProvider>{children}</TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
