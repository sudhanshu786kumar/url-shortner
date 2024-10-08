import "./globals.css";

export const metadata = {
  title: "Modern URL Shortener",
  description: "A sleek and efficient URL shortener built with Next.js 14 and Firebase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">{children}</body>
    </html>
  );
}
