import React from 'react';
import PropTypes from 'prop-types';

const Display = ({ result }) => {
  if (Number.isNaN(Number(result))) {
    return <div className="display d-flex error">{result}</div>;
  }
  return <div className="display d-flex">{result}</div>;
};

Display.defaultProps = { result: '0' };
Display.propTypes = {
  result: PropTypes.string,
};

export default Display;
