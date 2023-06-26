import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./lib/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="flex font-nunito w-full min-h-screen text-gray-900 bg-white">
          {children}
        </body>
      </html>
    </Providers>
  );
}
