import { useState } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

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
    <div className="mb-4 p-3 border rounded shadow-sm bg-light">
      <h2 className="mb-3">Add New Contact</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={newContact.firstName}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={newContact.lastName}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={newContact.contactNumber}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newContact.email}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          name="note"
          placeholder="Note"
          value={newContact.note}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="file"
          onChange={handleFileChange}
          className="form-control"
        />
      </div>
      <button onClick={addContact} className="btn btn-primary">Add Contact</button>
    </div>
  );
};

export default AddContact;
