import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full px-6 py-4 bg-gray-900 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold tracking-wider">Zephyrium</h1>
      <div className="space-x-4">
        <a href="#" className="hover:underline">Home</a>
        <a href="#" className="hover:underline">Products</a>
        <a href="#" className="hover:underline">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
