import React from 'react';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';

const ContactsPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="p-4 sm:p-6 bg-white shadow-md rounded-lg mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Add New Contact</h2>
          <ContactForm />
        </div>
        <div className="p-4 sm:p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Contact List</h2>
          <ContactList />
        </div>
      </main>
    </div>
  );
};

export default ContactsPage;
