import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LandingLayoutProps {
  children: ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Public Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-sm">
              <Heart className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">HealthMonitor</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/features" className="text-sm text-gray-600 hover:text-teal-600 transition-colors">
              Features
            </Link>
            <Link to="/about" className="text-sm text-gray-600 hover:text-teal-600 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm text-gray-600 hover:text-teal-600 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link to="/auth">
              <Button
                size="sm"
                className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white shadow-sm"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {children}

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-teal-600" fill="currentColor" />
                <span className="font-bold text-gray-900">HealthMonitor</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                AI-powered health monitoring for better patient outcomes.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Product</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="text-sm text-gray-500 hover:text-teal-600">Features</Link></li>
                <li><Link to="#" className="text-sm text-gray-500 hover:text-teal-600">Pricing</Link></li>
                <li><Link to="#" className="text-sm text-gray-500 hover:text-teal-600">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Company</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="text-sm text-gray-500 hover:text-teal-600">About</Link></li>
                <li><Link to="#" className="text-sm text-gray-500 hover:text-teal-600">Blog</Link></li>
                <li><Link to="#" className="text-sm text-gray-500 hover:text-teal-600">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="text-sm text-gray-500 hover:text-teal-600">Privacy</Link></li>
                <li><Link to="#" className="text-sm text-gray-500 hover:text-teal-600">Terms</Link></li>
                <li><Link to="#" className="text-sm text-gray-500 hover:text-teal-600">HIPAA</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} HealthMonitor AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
