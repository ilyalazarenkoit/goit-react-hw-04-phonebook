import { useState } from 'react';
import PropTypes from 'prop-types';
import formStyle from '../ContactForm/ContactForm.module.css';

export const ContactForm = ({ onHandleClick }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    e.preventDefault();
    if (e.target.name === 'name') {
      setName(e.target.value);
    }
    if (e.target.name === 'number') {
      setNumber(e.target.value);
    }
  };

  const onSumbit = e => {
    e.preventDefault();
    onHandleClick(name, number);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={onSumbit} className={formStyle.form}>
      <label className={formStyle.label}>
        <p className={formStyle.text}>Name :</p>
        <input
          className={formStyle.input}
          onChange={handleChange}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={formStyle.label}>
        <p className={formStyle.text}>Number :</p>
        <input
          className={formStyle.input}
          onChange={handleChange}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={formStyle.add}>
        Add to contacts
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onHandleClick: PropTypes.func,
};
