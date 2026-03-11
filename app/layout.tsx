import "./globals.css";

export const metadata = {
  title: "Clipforge - AI Video Engine",
  description: "Turn YouTube videos into viral short-form content",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
