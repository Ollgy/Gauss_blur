import React from 'react';

export const Button = ({ text, onClick }) =>
  <button className="button button--save" children={text} onClick={onClick}/>
