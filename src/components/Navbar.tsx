
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 bg-gradient-to-r from-feedback-blue to-feedback-teal rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg">FC</span>
              </div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-feedback-blue to-feedback-teal bg-clip-text text-transparent">
                Feedback Compass
              </span>
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Link to="/">
              <Button 
                variant={isActive('/') ? "default" : "ghost"}
                className={isActive('/') ? "bg-gradient-to-r from-feedback-blue to-feedback-teal text-white" : ""}
              >
                Submit Feedback
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button 
                variant={isActive('/dashboard') ? "default" : "ghost"}
                className={isActive('/dashboard') ? "bg-gradient-to-r from-feedback-blue to-feedback-teal text-white" : ""}
              >
                Dashboard
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-feedback-blue"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              to="/"
              className={`${isActive('/') 
                ? 'bg-gradient-to-r from-feedback-blue to-feedback-teal text-white' 
                : 'text-gray-600 hover:bg-gray-50'} 
                block px-3 py-2 rounded-md text-base font-medium`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Submit Feedback
            </Link>
            <Link 
              to="/dashboard"
              className={`${isActive('/dashboard') 
                ? 'bg-gradient-to-r from-feedback-blue to-feedback-teal text-white' 
                : 'text-gray-600 hover:bg-gray-50'} 
                block px-3 py-2 rounded-md text-base font-medium`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
