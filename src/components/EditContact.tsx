import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { RootState } from '../store/store';
import { editContact } from '../store/contactSlice';
import { toast, ToastContainer } from 'react-toastify';

const EditContact: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const contact = useSelector((state: RootState) =>
    state.contacts.contacts.find(contact => contact.id === id)
  );

  const [firstName, setFirstName] = useState(contact?.firstName || '');
  const [lastName, setLastName] = useState(contact?.lastName || '');
  const [status, setStatus] = useState(contact?.status || 'active');

  useEffect(() => {
    if (contact) {
      setFirstName(contact.firstName);
      setLastName(contact.lastName);
      setStatus(contact.status);
    }
  }, [contact]);

  const validateForm = (): boolean => {
    if (!firstName || !lastName) {
      toast.error('Both first name and last name are required.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !id) return;

    const updatedContact = { id, firstName, lastName, status };
    dispatch(editContact(updatedContact));
    toast.success('Contact updated successfully!');
    navigate('/contacts');
  };

  if (!contact) {
    return (
      <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
        <p className="text-center text-red-500 font-bold mb-4">Contact not found</p>
        <Link
          to="/"
          className="block text-center text-blue-500 hover:text-blue-700 hover:underline font-semibold transition-colors"
        >
          Go to Contacts
        </Link>
      </div>
    );
  }
  

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4 text-center">Edit Contact</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="status"
              value="active"
              checked={status === 'active'}
              onChange={(e) => setStatus(e.target.value)}
              className="mr-2"
            />
            Active
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="status"
              value="inactive"
              checked={status === 'inactive'}
              onChange={(e) => setStatus(e.target.value)}
              className="mr-2"
            />
            Inactive
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors w-full"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditContact;
