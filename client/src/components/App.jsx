import React from 'react';
import axios from 'axios';

const App = () => {
  const login = () => {
    axios.get('/login');
  };

  return <button type="button" onClick={login}> click me </button>;
};

export default App;
