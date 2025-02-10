// Display.js
import React from 'react';

function Display({ value }) {
  return (
    <div className="display">
      <input type="text" value={value} readOnly />
    </div>
  );
}

export default Display;
