import * as constants from './Constants';
import * as validations from './Validations';
import Button from './Components/Button';
import Input from './Components/Input';
import Select from './Components/Select';
import TextArea from './Components/TextArea';
import { Component } from 'react';

class Form extends Component {

  constructor() {
    super();

    this.state = {
      aboutMe: { ...this.createInputOptions('About Me', null, constants.MINIMUM_CHARACTERS_REQUIRED, { required: true, minLength: 50 }) },
      email: { ...this.createInputOptions('Email', 'text', constants.INVALID_EMAIL, { required: true, isEmail: true }) },
      homePage: { ...this.createInputOptions('Home Page', 'text', constants.INVALID_URL, { required: true, isUrl: true }) },
      loginId: { ...this.createInputOptions('Login ID', 'text', constants.IS_REQUIRED, { required: true }) },
      name: { ...this.createInputOptions('Name', 'text', constants.IS_REQUIRED, { required: true }) },
      notification: { ...this.createInputOptions('Receive Notifications', 'checkbox', constants.IS_REQUIRED, { required: true, isCheckBox: true }) },
      timeZones: { ...this.createInputOptions('Timezone', null, constants.IS_REQUIRED, { isSelect: true }), options: constants.TIMEZONES }
    };
  }

  createInputOptions = (label, type, validationMessage, validations) => {
    return {
      label,
      touched: false,
      type,
      valid: false,
      validationMessage,
      validations: { ...validations },
      value: ''
    }
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    const { isCheckBox, isEmail, isSelect, isUrl, minLength, required } = rules;

    if (!rules) return true;

    if (required) {
      isValid = validations.isEmpty(value);
    }

    if (isEmail) {
      isValid = validations.isRegex(value, constants.EMAIL_REGEX);
    }

    if (isUrl) {
      isValid = validations.isRegex(value, constants.URL_REGEX);
    }

    if (minLength) {
      isValid = validations.minCharactersCheck(value);
    }

    if (isSelect) {
      isValid = validations.isOptionSelected(value, 'select');
    }

    if (isCheckBox) {
      isValid = validations.isCheckboxChecked(value);
    }

    return isValid;
  };

  inputChangedHandler = (event, inputIdentfier) => {
    let updatedInputIdentfier = { ...this.state[inputIdentfier] };
    if (updatedInputIdentfier.type === 'checkbox') {
      updatedInputIdentfier.valid = event.target.checked;
    } else {
      updatedInputIdentfier.value = event.target.value;
      updatedInputIdentfier.valid = this.checkValidity(event.target.value, updatedInputIdentfier.validations);
    }
    this.setState({ [inputIdentfier]: updatedInputIdentfier });
  };

  onSubmitHandler = (event) => {
    let validFormInputs = [],
      isFormValid = false;

    for (let key in this.state) {
      let updatedInputIdentfier = { ...this.state[key] };
      updatedInputIdentfier.touched = true;
      validFormInputs = [...validFormInputs, this.state[key].valid];
      this.setState({ [key]: updatedInputIdentfier });
    }

    isFormValid = validFormInputs.every(entry => entry);

    if (isFormValid) {
      alert('Form submitted successfully!');
    } else {
      event.preventDefault();
    }

  };

  render() {
    return (
      <>
        <h3>Registration Form</h3>
        <form className="UserForm" onSubmit={this.onSubmitHandler}>
          <Input
            changed={(event) => this.inputChangedHandler(event, 'loginId')}
            {...this.state['loginId']} />

          <Input
            changed={(event) => this.inputChangedHandler(event, 'email')}
            {...this.state['email']} />

          <Input
            changed={(event) => this.inputChangedHandler(event, 'name')}
            {...this.state['name']} />

          <Select
            changed={(event) => this.inputChangedHandler(event, 'timeZones')}
            {...this.state['timeZones']} />

          <Input
            changed={(event) => this.inputChangedHandler(event, 'homePage')}
            {...this.state['homePage']} />

          <TextArea
            changed={(event) => this.inputChangedHandler(event, 'aboutMe')}
            {...this.state['aboutMe']} />

          <Input
            changed={(event) => this.inputChangedHandler(event, 'notification')}
            {...this.state['notification']} />

          <Button text="Submit" />
        </form>
      </>
    )
  };
};

export default Form;