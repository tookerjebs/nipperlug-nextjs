import Link from "next/link";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen dark-scrollbar">
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e1e2e',
            color: '#ffffff',
            border: '1px solid #6366f1',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
      
      {/* Navigation */}
      <div>
        <Navbar />
      </div>

      {/* Main Content */}
      <main className="flex-grow bg-theme-darkest">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}