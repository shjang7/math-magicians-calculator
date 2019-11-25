import React from 'react';

const Display = props => (
  <div className="display">
    result..
    {props.result}
  </div>
);

Display.defaultProps = { result: '0' };

export default Display;
