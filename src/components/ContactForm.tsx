import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../store/contactSlice';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

const ContactForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState('active');
  const dispatch = useDispatch();

  const validateForm = (): boolean => {
    if (!firstName || !lastName) {
      toast.error('Both first name and last name are required.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newContact = { id: uuidv4(), firstName, lastName, status };
    dispatch(addContact(newContact));
    setFirstName('');
    setLastName('');
    setStatus('active');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        className="border p-2 w-full"
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        className="border p-2 w-full"
      />
      <div className="flex items-center space-x-4">
        <label>
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
        <label>
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
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Contact</button>
    </form>
  );
};

export default ContactForm;
