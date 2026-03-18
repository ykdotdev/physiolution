import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ToastProvider";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Physiolution | TBMM Corrective Exercise Specialist Certification",
  description:
    "Advance your career with the TBMM Corrective Exercise Specialist certification. Learn biomechanics, movement assessment, and corrective exercise techniques to improve movement and reduce pain.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="page-wrapper">
          <ToastProvider>
            <Suspense fallback={<Loading />}>{children}</Suspense>
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
