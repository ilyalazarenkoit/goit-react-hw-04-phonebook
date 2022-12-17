import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from '../components/App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const onHandleClick = (name, number) => {
    let contact = {
      name,
      number,
      id: nanoid(),
    };
    if (contacts.find(item => item.name === contact.name)) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    setContacts(prevContacts => (prevContacts = [...prevContacts, contact]));
  };

  const doFiltration = e => {
    setFilter(e.target.value);
  };

  const getContacts = () => {
    const lowerCaseFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerCaseFilter)
    );
  };
  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  useEffect(() => {
    const contactsUnparsed = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsUnparsed);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <div className={css.container}>
        <h2 className={css.title}>Phonebook</h2>
        <ContactForm onHandleClick={onHandleClick} />

        <h2 className={css.title}>Contacts:</h2>
        {contacts.length > 0 ? (
          <Filter filter={filter} onChange={doFiltration} />
        ) : null}
        {contacts.length === 0 ? (
          <h2 className={css.title}>You have no contacts yet</h2>
        ) : (
          <ContactList contacts={getContacts()} deleteContact={deleteContact} />
        )}
      </div>
    </>
  );
};
