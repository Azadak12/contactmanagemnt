// src/components/AddContact.jsx
import { useState } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const AddContact = () => {
  const [newContact, setNewContact] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    note: '',
    email: '',
    picture: null,
    pictureURL: ''
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewContact(prevState => ({ ...prevState, picture: e.target.files[0] }));
  };

  const addContact = async () => {
    try {
      let pictureURL = '';
      if (newContact.picture) {
        const pictureRef = ref(storage, `contacts/${uuidv4()}`);
        const uploadResult = await uploadBytes(pictureRef, newContact.picture);
        pictureURL = await getDownloadURL(uploadResult.ref);
      }

      const contactData = {
        firstName: newContact.firstName,
        lastName: newContact.lastName,
        contactNumber: newContact.contactNumber,
        note: newContact.note,
        email: newContact.email,
        pictureURL: pictureURL
      };

      await addDoc(collection(db, "contacts"), contactData);

      setNewContact({
        firstName: '',
        lastName: '',
        contactNumber: '',
        note: '',
        email: '',
        picture: null,
        pictureURL: ''
      });

    } catch (err) {
      setError("Error adding contact: " + err.message);
      console.error("Error adding contact: ", err);
    }
  };

  return (
    <Container className="bg-light p-3 border rounded shadow-sm">
      <h2 className="mb-3">Add New Contact</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="firstName"
            placeholder="First Name"
            value={newContact.firstName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={newContact.lastName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={newContact.contactNumber}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            value={newContact.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="note"
            placeholder="Note"
            value={newContact.note}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="file"
            onChange={handleFileChange}
          />
        </Form.Group>
        <Button onClick={addContact} variant="primary">Add Contact</Button>
      </Form>
    </Container>
  );
};

export default AddContact;
