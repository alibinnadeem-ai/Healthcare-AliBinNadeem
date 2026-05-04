import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alibinnadeem.com"),
  title: "Ali Bin Nadeem - Reimbursement Architect | Medical Billing Specialist",
  description:
    "Ali Bin Nadeem - Reimbursement Architect for US healthcare providers: medical billing, credentialing, AR recovery, denials, dental billing, DME billing, labs/pharma RCM, AI-first healthcare operations and medical billing workforce training.",
  openGraph: {
    title: "Ali Bin Nadeem - Reimbursement Architect",
    description:
      "Medical billing, credentialing, AR recovery, denials, dental billing, DME billing and AI-first RCM operations.",
    url: "https://alibinnadeem.com",
    siteName: "Ali Bin Nadeem",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
