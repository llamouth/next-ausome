import { Geist, Geist_Mono, Comic_Neue } from "next/font/google";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const comicNeue = Comic_Neue({
  weight: ["300", "400", "700"],
  variable: "--font-comic-neue",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ausome",
  description: "Social Media Platform for the spectrum Community",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${comicNeue.variable} ${comicNeue.variable} antialiased`}
        >
          <Toaster position="top-right" reverseOrder={false} /> 
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
