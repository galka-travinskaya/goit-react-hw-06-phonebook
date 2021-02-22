import React from 'react';

import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import Header from './components/Header';

import s from './App.module.css';

function App() {
  return (
    <>
      <Header />
      <section className={s.section}>
        <div className={s.container}>
          <ContactForm />

          <h2>Contacts</h2>
          <Filter />

          <ContactList />
        </div>
      </section>
    </>
  );
}

export default App;
