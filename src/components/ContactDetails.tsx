import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useParams } from 'react-router-dom';

const ContactDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const contact = useSelector((state: RootState) =>
    state.contacts.contacts.find(contact => contact.id === id)
  );

  if (!contact) {
    return <p className="p-4 text-red-500">Contact not found</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{`${contact.firstName} ${contact.lastName}`}</h2>
      <p className="mt-2"><strong>Status:</strong> {contact.status === 'active' ? 'Active' : 'Inactive'}</p>
    </div>
  );
};

export default ContactDetails;
