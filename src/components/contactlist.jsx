import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import ContactItem from './ContactItem';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "contacts"), (snapshot) => {
      const contactsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setContacts(contactsData);
    });

    return unsubscribe;
  }, []);

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
    } catch (err) {
      console.error("Error deleting contact: ", err);
    }
  };

  return (
    <div className="bg-light p-3 border rounded shadow-sm">
      <h2 className="mb-3">Your Contacts</h2>
      {contacts.length === 0 ? (
        <p className="text-center">No contacts available. Please add some!</p>
      ) : (
        <ul className="list-group">
          {contacts.map(contact => (
            <ContactItem key={contact.id} contact={contact} onDelete={deleteContact} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
