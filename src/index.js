import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from "react-router-dom"
import { Guild } from './components/Guild';
import "bootstrap/dist/css/bootstrap.min.css"


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Guild />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


