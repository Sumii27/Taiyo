import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white fixed">
      <div className="p-4">
        <h2 className="text-xl font-bold">Sidebar</h2>
        <nav className="mt-4">
          <Link to="/" className="block py-2 px-4 hover:bg-gray-700">Contacts</Link>
          <Link to="/dashboard" className="block py-2 px-4 hover:bg-gray-700">Charts And Maps</Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
