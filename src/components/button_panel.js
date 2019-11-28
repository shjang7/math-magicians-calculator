import React from 'react';
import Button from './button';
import style from '../assets/style.json';

const ButtonPanel = ({ clickHandler }) => {
  const handleClick = buttonName => clickHandler(buttonName);

  const renderButton = ({ val, color }) => {
    if (val === '0') {
      return <Button buttonName={val} color={color} wide clickHandler={handleClick} />;
    }
    if (color) {
      return <Button buttonName={val} color={color} clickHandler={handleClick} />;
    }
    return <Button buttonName={val} clickHandler={handleClick} />;
  };

  const color = style.color.lightGray;

  return (
    <div className="button-panel d-flex flex-column">
      <div className="flex-row group">
        {renderButton({ val: 'AC', color })}
        {renderButton({ val: '+/-', color })}
        {renderButton({ val: '%', color })}
        {renderButton({ val: '÷' })}
      </div>
      <div className="flex-row group">
        {renderButton({ val: '7', color })}
        {renderButton({ val: '8', color })}
        {renderButton({ val: '9', color })}
        {renderButton({ val: 'x' })}
      </div>
      <div className="flex-row group">
        {renderButton({ val: '4', color })}
        {renderButton({ val: '5', color })}
        {renderButton({ val: '6', color })}
        {renderButton({ val: '-' })}
      </div>
      <div className="flex-row group">
        {renderButton({ val: '1', color })}
        {renderButton({ val: '2', color })}
        {renderButton({ val: '3', color })}
        {renderButton({ val: '+' })}
      </div>
      <div className="flex-row group">
        {renderButton({ val: '0', color })}
        {renderButton({ val: '.', color })}
        {renderButton({ val: '=' })}
      </div>
    </div>
  );
};

export default ButtonPanel;
