import React from 'react';
import PropTypes from 'prop-types';

const Button = props => (
  <button className="button">
    {props.buttonName}
  </button>
);

Button.propTypes = {
  buttonName: PropTypes.string.isRequired,
};

export default Button;
