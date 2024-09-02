// src/components/ContactItem.jsx
import  { useState } from 'react';
import PropTypes from 'prop-types'; 
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ListGroup, Button, Form, Image } from 'react-bootstrap';

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
    <ListGroup.Item className="d-flex justify-content-between align-items-center mb-2">
      {isEditing ? (
        <div className="w-100">
          <Form.Control
            type="text"
            name="firstName"
            value={updatedContact.firstName}
            onChange={handleInputChange}
            className="mb-2"
          />
          <Form.Control
            type="text"
            name="lastName"
            value={updatedContact.lastName}
            onChange={handleInputChange}
            className="mb-2"
          />
          <Form.Control
            type="text"
            name="contactNumber"
            value={updatedContact.contactNumber}
            onChange={handleInputChange}
            className="mb-2"
          />
          <Form.Control
            type="email"
            name="email"
            value={updatedContact.email}
            onChange={handleInputChange}
            className="mb-2"
          />
          <Form.Control
            type="text"
            name="note"
            value={updatedContact.note}
            onChange={handleInputChange}
            className="mb-2"
          />
          <Button onClick={saveContact} variant="success" className="me-2">Save</Button>
          <Button onClick={() => setIsEditing(false)} variant="secondary">Cancel</Button>
        </div>
      ) : (
        <div className="d-flex align-items-center w-100">
          <Image src={contact.pictureURL} alt="Profile" roundedCircle className="me-3" style={{ width: '50px', height: '50px' }} />
          <div className="flex-grow-1">
            <h5 className="mb-1">{contact.firstName} {contact.lastName}</h5>
            <p className="mb-1">Contact Number: {contact.contactNumber}</p>
            <p className="mb-1">Email: {contact.email}</p>
            <p className="mb-1">Note: {contact.note}</p>
          </div>
          <div>
            <Button onClick={() => setIsEditing(true)} variant="warning" className="me-2">Edit</Button>
            <Button onClick={() => onDelete(contact.id)} variant="danger">Delete</Button>
          </div>
        </div>
      )}
    </ListGroup.Item>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    contactNumber: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    pictureURL: PropTypes.string
  }).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ContactItem;
