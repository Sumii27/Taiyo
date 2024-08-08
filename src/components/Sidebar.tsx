import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="md:hidden bg-gray-800 text-white p-4">
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          <FiMenu size={24} />
        </button>
      </div>
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-200 ease-in-out w-64 bg-gray-800 text-white md:relative`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">Sidebar</h2>
          <nav className="mt-4">
            <Link to="/" className="block py-2 px-4 hover:bg-gray-700" onClick={() => setIsOpen(false)}>
              Contacts
            </Link>
            <Link to="/dashboard" className="block py-2 px-4 hover:bg-gray-700" onClick={() => setIsOpen(false)}>
              Charts And Maps
            </Link>
          </nav>
        </div>
      </div>
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 md:hidden" onClick={() => setIsOpen(false)}></div>}
    </>
  );
};

export default Sidebar;
