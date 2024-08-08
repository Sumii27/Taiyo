import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { deleteContact } from '../store/contactSlice';
import { Link } from 'react-router-dom';

const ContactList: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  return (
    <div className="p-4">
      {contacts.length === 0 ? (
        <p className="text-center text-gray-500">No contacts found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map(contact => (
            <div 
              key={contact.id} 
              className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2">{`${contact.firstName} ${contact.lastName}`}</h3>
                <p className="mb-2"><strong>Status:</strong> {contact.status === 'active' ? 'Active' : 'Inactive'}</p>
              </div>
              <div className="flex justify-between mt-4">
                <Link 
                  to={`/contacts/${contact.id}`} 
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
                <Link 
                  to={`/contacts/edit/${contact.id}`} 
                  className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition-colors"
                >
                  Edit
                </Link>
                <button 
                  onClick={() => dispatch(deleteContact(contact.id))} 
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;
