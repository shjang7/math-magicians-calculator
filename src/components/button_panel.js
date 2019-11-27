import React from 'react';
import Button from './button';
import { color } from '../assets/style.json';

const { lightGray: gray } = color;

const ButtonPanel = ({ clickHandler }) => {
  const handleClick = buttonName => clickHandler(buttonName);

  const renderButton = ({ val, color }) => {
    if (val === '0') return <Button buttonName={val} color={gray} wide clickHandler={handleClick} />;
    if (color) return <Button buttonName={val} color={gray} clickHandler={handleClick} />;
    return <Button buttonName={val} clickHandler={handleClick} />;
  };

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
