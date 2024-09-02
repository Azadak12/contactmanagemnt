import { useState } from 'react';
import ContactList from './components/contactlist';
import AddContact from './components/addcontact';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "./App.css";

const App = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleAddForm = () => {
    setShowAddForm(prevState => !prevState);
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Contact Management System</h1>
      <button
        onClick={toggleAddForm}
        className={`btn ${showAddForm ? 'btn-secondary' : 'btn-primary'} mb-4`}
      >
        {showAddForm ? 'Cancel' : 'Add New Contact'}
      </button>
      {showAddForm && <AddContact />}
      <ContactList />
    </div>
  );
};

export default App;
