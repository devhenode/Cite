import React from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, BookmarkIcon, UserIcon } from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-black">Citė</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
              <span>Search</span>
            </Link>
            
            <Link
              to="/citations"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <BookmarkIcon className="h-5 w-5" />
              <span>Citations</span>
            </Link>
            
            <Link
              to="/profile"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <UserIcon className="h-5 w-5" />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 