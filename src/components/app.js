import React, { useState } from 'react';
import Display from './display';
import ButtonPanel from './button_panel';
import calculate from '../logic/calculate';

const App = () => {
  const [total, setTotal] = useState(null);
  const [next, setNext] = useState(null);
  const [operation, setOperation] = useState(null);
  const [malform, setMalform] = useState(false);

  const handleClick = (buttonName) => {
    if (malform) {
      if (buttonName !== 'AC') return;

      setMalform(false);
    }
    const update = calculate({ total, next, operation }, buttonName);
    if (Number.isNaN(Number(update.total)) || Number.isNaN(Number(update.next))) {
      setMalform(true);
    }
    setTotal(update.total);
    setNext(update.next);
    setOperation(update.operation);
  };

  const renderDisplay = () => {
    const result = next || total;
    if (result) {
      return <Display result={String(result)} />;
    }
    return <Display />;
  };

  return (
    <div id="main" className="main d-flex flex-column">
      {renderDisplay()}
      <ButtonPanel clickHandler={handleClick} />
    </div>
  );
};

export default App;
