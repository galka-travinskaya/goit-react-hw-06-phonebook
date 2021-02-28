import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import contactsActions from '../../redux/contacts/contacts-actions';
import contactTransition from './transitions/ContactTransition.module.css';

import s from './ContactList.module.css';

class ContactList extends Component {
  componentDidUpdate() {
    const contacts = JSON.stringify(this.props.contacts);
    localStorage.setItem('saveContacts', contacts);
  }

  render() {
    const { contacts, onRemove } = this.props;
    return (
      <>
        <TransitionGroup component="ul" className={s.list}>
          {contacts.map(({ name, number, id }) => (
            <CSSTransition
              key={id}
              classNames={contactTransition}
              timeout={250}
            >
              <li className={s.items}>
                <p className={s.text}>
                  {name}: {number}
                </p>
                <button
                  className={s.delete_btn}
                  type="button"
                  onClick={() => onRemove(id)}
                >
                  Delete
                </button>
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.string,
    }),
  ),
  onRemove: PropTypes.func.isRequired,
};

const visibleContacts = (allContacts, filter) => {
  const normalizedFilter = filter.toLowerCase();
  return allContacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter),
  );
};

const mapStateToProps = ({ contacts: { items, filter } }) => ({
  contacts: visibleContacts(items, filter),
});

const mapDispatchToProps = dispatch => ({
  onRemove: id => dispatch(contactsActions.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
