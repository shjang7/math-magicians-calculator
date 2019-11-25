import React from 'react';
import Display from './display';
import ButtonPanel from './button_panel';

const App = () => (
  <div id="main" className="main d-flex flex-column">
    <Display />
    <ButtonPanel />
  </div>
);

export default App;
