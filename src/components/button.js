import React from 'react';
import PropTypes from 'prop-types';
import style from '../assets/style.json';

const Button = (props) => {
  const handleClick = ({ target: { value: buttonName } }) => props.clickHandler(buttonName);

  const buttonStyle = ({ color, wide }) => {
    const { wide: wideButton, normal: normalButton } = style.buttonWidth;
    return {
      backgroundColor: color,
      width: wide ? wideButton : normalButton,
    };
  };

  return (
    <button
      className="button"
      style={buttonStyle(props)}
      value={props.buttonName}
      onClick={handleClick}
    >
      {props.buttonName}
    </button>
  );
};

Button.defaultProps = { color: style.color.orange, wide: false };

Button.propTypes = {
  buttonName: PropTypes.string.isRequired,
  color: PropTypes.string,
  wide: PropTypes.bool,
};

export default Button;
