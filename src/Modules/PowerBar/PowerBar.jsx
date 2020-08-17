import React from 'react';

export const PowerBar = ({ power, onChange }) => <div className="powerbar">
  <input className="powerbar__input" type="range" value={power} onChange={(e) => onChange(e)}/>
</div>