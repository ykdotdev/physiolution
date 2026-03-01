import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Physiolution",
  description:
    "DESCRIPTION_HERE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main
          className="page-wrapper"
        >
          <ToastProvider>
            {children}
          </ToastProvider>
        </main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Physiolution",
              url: "https://physiolution.co",
            }),
          }}
        />
      </body>
    </html>
  );
}
