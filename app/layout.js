import { Geist, Geist_Mono, Comic_Neue } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { FriendsProvider } from "./context/FriendsContext";
import { PostsProvider } from "./context/PostsContext";
import { UserProvider } from "./context/UserContext";

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
    <html lang="en">
        <body
          className={`${comicNeue.variable} ${comicNeue.variable} antialiased`}
          >
          <AuthProvider>
            <Toaster position="top-right" reverseOrder={false} /> 
            <Navbar />
            <div className="min-h-screen">{children}</div>
          </AuthProvider>
        </body>
      </html>
  );
}
