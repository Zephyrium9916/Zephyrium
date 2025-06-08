import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 text-center text-sm">
      © {new Date().getFullYear()} Zephyrium Inc. All rights reserved.
    </footer>
  );
};

export default Footer;
