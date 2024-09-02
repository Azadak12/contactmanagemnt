import { useState } from 'react';
import PropTypes from 'prop-types'; 
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const ContactItem = ({ contact, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContact, setUpdatedContact] = useState({ ...contact });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedContact(prevState => ({ ...prevState, [name]: value }));
  };

  const saveContact = async () => {
    try {
      const contactDoc = doc(db, "contacts", contact.id);
      await updateDoc(contactDoc, updatedContact);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating contact: ", err);
    }
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center mb-2">
      {isEditing ? (
        <div className="w-100">
          <input
            type="text"
            name="firstName"
            value={updatedContact.firstName}
            onChange={handleInputChange}
            className="form-control mb-2"
          />
          <input
            type="text"
            name="lastName"
            value={updatedContact.lastName}
            onChange={handleInputChange}
            className="form-control mb-2"
          />
          <input
            type="text"
            name="contactNumber"
            value={updatedContact.contactNumber}
            onChange={handleInputChange}
            className="form-control mb-2"
          />
          <input
            type="email"
            name="email"
            value={updatedContact.email}
            onChange={handleInputChange}
            className="form-control mb-2"
          />
          <input
            type="text"
            name="note"
            value={updatedContact.note}
            onChange={handleInputChange}
            className="form-control mb-2"
          />
          <button onClick={saveContact} className="btn btn-success me-2">Save</button>
          <button onClick={() => setIsEditing(false)} className="btn btn-secondary">Cancel</button>
        </div>
      ) : (
        <div className="d-flex align-items-center w-100">
          <img src={contact.pictureURL || 'https://via.placeholder.com/150'} alt="Profile" className="rounded-circle me-3" style={{ width: '60px', height: '60px' }} />
          <div className="flex-grow-1">
            <h5 className="mb-1">{contact.firstName} {contact.lastName}</h5>
            <p className="mb-1">Contact Number: {contact.contactNumber}</p>
            <p className="mb-1">Email: {contact.email}</p>
            <p className="mb-1">Note: {contact.note}</p>
          </div>
          <div>
            <button onClick={() => setIsEditing(true)} className="btn btn-warning me-2">Edit</button>
            <button onClick={() => onDelete(contact.id)} className="btn btn-danger">Delete</button>
          </div>
        </div>
      )}
    </li>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    contactNumber: PropTypes.string.isRequired,
    note: PropTypes.string,
    email: PropTypes.string.isRequired,
    pictureURL: PropTypes.string
  }).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ContactItem;
