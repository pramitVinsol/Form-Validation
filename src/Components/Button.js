import React from "react";

function Button(props) {
  return (
    <div className="FormGroup">
      <button className="Button">{props.text}</button>
    </div>
  );
}

Button.defaultProps = {
  text: ''
};

export default Button;