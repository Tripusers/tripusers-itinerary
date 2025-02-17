import type { Metadata, Viewport } from "next";
import "./scss/globals.scss";
import { cookie, roboto } from "./fonts";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tripusers.com/"),
  title: {
    default: "Tripusers - Luxury Travel Experiences | Your Travel Companion",
    template: "%s | tripusers.com",
  },
  keywords: [
    "tripusers.com",
    "Tripusers.com",
    "Tripusers",
    "tripusers",
    "trip users",
    "Trip Users",
    "travel agency in India",
    "travel agency in Nagpur",
    "travel agency in Asia",
    "travel packages",
    "cheap travel packages",
    "luxury travel",
    "travel agency",
    "Tripusers Nagpur",
    "travel in Asia",
    "travel in India",
    "travel experiences",
    "travel abroad",
  ],
  description:
    "Welcome to Tripusers, where travel is elevated to a seamless blend of sophistication and adventure. Discover refined luxury with Tripusers.com, your ultimate travel companion.",
  openGraph: {
    images: [
      {
        url: "https://i.postimg.cc/j5h62pZg/tripusers-com-card.png",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourTwitterHandle", // Replace with your actual Twitter handle
    title: "Tripusers - Luxury Travel Experiences | Your Travel Companion",
    description:
      "Welcome to Tripusers, where travel is elevated to a seamless blend of sophistication and adventure. Discover refined luxury with Tripusers.com.",
    images: [
      {
        url: "https://i.postimg.cc/j5h62pZg/tripusers-com-card.png",
      },
    ],
  },
  verification: {
    google: "85P899Kzilhv34znq2vog_FXgyKtq29TP9mRvJ3RfR8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${cookie.variable}`}>
        {children}
      </body>
    </html>
  );
}
