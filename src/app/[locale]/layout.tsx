import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Odvjetnički ured Ivan Pavić | Split",
  description:
    "Pouzdana pravna podrška za građane i poslovne subjekte. Pružamo stručne pravne savjete i zastupanje u imovinskopravnim i ugovornim odnosima.",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body>
        <GoogleAnalytics gaId="G-RQWDQJW1KS" />
        <NextIntlClientProvider>
          {children}
          <Toaster richColors position="bottom-right" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
