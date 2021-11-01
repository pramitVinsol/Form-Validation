import React from 'react';
import ValidationMessage from './ValidationMessage';

function Select(props) {

  const invalidClass = `${props.touched && !props.valid ? "Invalid" : null}`;

  return (
    <div className={`FormGroup ${invalidClass}`}>
      <label>{props.label}</label>
      <select defaultValue="Select" onChange={props.changed}>
        <option value="Select" disabled>Select</option>
        {props.options && props.options.length > 0 ? props.options.map(option => (
          <option key={option} value={option}>{option}</option>
        )) : null}
      </select><br />
      <ValidationMessage touched={props.touched} valid={props.valid} validationMessage={props.validationMessage} />
    </div>
  )
};

Select.defaultProps = {
  changed: () => {},
  label: '',
  options: [],
  touched: false,
  valid: false,
  validationMessage: ''
};

export default Select;