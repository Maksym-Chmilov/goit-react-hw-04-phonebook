import React, { useState } from 'react';
import { useEffect } from 'react';
import shortid from 'shortid';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { AppBox, SectionTitle } from './App.styled';
// import useLocalStorage from '../../Hooks/useLocalStorage';

const LS_KEY = 'saveContacts';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem(LS_KEY)) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  
  ////////////////useLocalStorage(custom method)////////////////
  // const [contacts, setContacts] = useLocalStorage('contacts', [
  //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  // ]);
  /////////////////////////////////////////////////////////////

  const addNewContacts = obj => {
    const { name, number } = obj;

    const includesName = contacts.find(
      contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );

    if (includesName) {
      return alert(`${name} is already in contacts`);
    }

    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    setContacts(contacts => [contact, ...contacts]);
  };

  const deleteContact = contactId => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisible = () => {
    const normalasedFilter = filter.toLowerCase();
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalasedFilter);
    });
  };

  return (
    <AppBox>
      <SectionTitle>Phonebook</SectionTitle>
      <ContactForm onSubmit={addNewContacts} />

      <SectionTitle>Contacts</SectionTitle>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={getVisible()} onDeleteContact={deleteContact} />
    </AppBox>
  );
};
