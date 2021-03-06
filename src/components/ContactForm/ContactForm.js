import { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import contactsActions from '../../redux/contacts/contacts-actions';
import Alert from '../Alert';

import s from './ContactForm.module.css';
import alert from '../../transition/Transition.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
    showAlert: false,
    errorMessage: '',
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    if (!name || !number) {
      this.toggleAlert('The list is empty');
      return;
    }

    if (
      this.props.contacts.find(
        ({ name }) => name.toLowerCase() === this.state.name.toLowerCase(),
      )
    ) {
      this.toggleAlert('Contact is already exist');
      return;
    }

    this.props.onSubmit(name, number);

    this.reset();
  };

  toggleAlert = message => {
    this.setState({ showAlert: true, errorMessage: message });
    setTimeout(() => this.setState({ showAlert: false }), 1000);
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { showAlert, errorMessage } = this.state;
    return (
      <form className={s.form} onSubmit={this.handleSubmit}>
        <CSSTransition
          in={showAlert}
          timeout={250}
          classNames={alert}
          unmountOnExit
        >
          <Alert>
            <p>{errorMessage}</p>
          </Alert>
        </CSSTransition>
        <label className={s.label}>
          <span className={s.text}>Name</span>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>

        <label className={s.label}>
          <span className={s.text}>Number</span>
          <input
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleChange}
          />
        </label>
        <button className={s.form__btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts.items,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (newName, number) =>
    dispatch(contactsActions.addContact(newName, number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
