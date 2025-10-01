import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="game-header text-white border-t border-border-dark relative z-10">
      <div className="container mx-auto max-w-8xl p-2 sm:p-4 md:p-5 lg:p-6">
        {/* Main Footer Content */}
        <div className="flex justify-center items-center mb-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm">
            <Link href="/credits" className="text-gray-300 hover:text-white transition-colors text-center">
              About & Credits
            </Link>
            <Link href="/legal" className="text-gray-300 hover:text-white transition-colors text-center">
              Legal
            </Link>
            <a 
              href="mailto:contact@nipperlug.com" 
              className="text-gray-300 hover:text-white transition-colors text-center"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-border-dark pt-4">
          <p className="text-sm text-gray-400" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} Nipperlug. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}