import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactsPage from './pages/ContactsPage';
import DashboardPage from './pages/DashboardPage';
import ContactDetails from './components/ContactDetails';
import EditContact from './components/EditContact';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col ml-64">
          <Header />
          <main className="flex-1 p-4 overflow-y-auto">
            <Routes>
              <Route path="/" element={<ContactsPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/contacts/:id" element={<ContactDetails />} />
              <Route path="/contacts/edit/:id" element={<EditContact />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
