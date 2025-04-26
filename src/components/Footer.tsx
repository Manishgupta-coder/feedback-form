
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="h-8 w-8 bg-gradient-to-r from-feedback-blue to-feedback-teal rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">FC</span>
            </div>
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-feedback-blue to-feedback-teal bg-clip-text text-transparent">
              Feedback Compass
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
