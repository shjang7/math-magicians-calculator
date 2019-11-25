import React from 'react';
import PropTypes from 'prop-types';
import { color, buttonWidth } from '../assets/style.json';

const { normal, wide: wideWidth } = buttonWidth;

const buttonStyle = ({ color, wide }) => {
  const styleObj = { backgroundColor: null, width: null };
  styleObj.backgroundColor = color;
  styleObj.width = wide ? wideWidth : normal;
  return styleObj;
};

const Button = props => (
  <button className="button" style={buttonStyle(props)}>
    {props.buttonName}
  </button>
);

Button.defaultProps = { color: color.orange, wide: false };

Button.propTypes = {
  buttonName: PropTypes.string.isRequired,
  color: PropTypes.string,
  wide: PropTypes.bool,
};

export default Button;
