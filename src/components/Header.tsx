import React from 'react';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Contacts';
      case '/dashboard':
        return 'Charts And Maps';
      default:
        return 'Contact Management App';
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-center">
      <h1 className="text-2xl font-bold">{getPageTitle()}</h1>
    </header>

  );
};

export default Header;
