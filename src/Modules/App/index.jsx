import React from 'react';
import ReactDOM from 'react-dom'; 
import { AppContent } from '../AppContent';

export const initDOM = () => {
  const domContainer = document.querySelector('#container');
  ReactDOM.render(<AppContent/>, domContainer);
}



