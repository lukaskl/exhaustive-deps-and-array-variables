import React, { useState } from 'react';
import logo from './logo.svg';
import Toasts from './Toasts';
import './App.css';

const Emp = ({ children }) => (
  <span style={{ backgroundColor: 'grey', padding: '0 5px' }}>{children}</span>
);

const App = () => {
  const [toasts, setToasts] = useState(['Toast 1', 'Toast 2']);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => setToasts(t => [...t, 'new Toast'])}>
          Add toast
        </button>
        <button
          onClick={() => setToasts(['Reseted Toast 1', 'Reseted Toast 2'])}>
          Reset toasts
        </button>
        <Toasts>
          {toasts.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </Toasts>
        <p style={{ width: '70%', margin: '20px auto' }}>
          This is a demo repository to visualize a problem of using{' '}
          <Emp>ESlint</Emp> together with <Emp>react-hooks/exhaustive-deps</Emp>{' '}
          when it is necessary to pass a variable of type <Emp>Array</Emp> to
          hook‘s dependency array
        </p>
        <p>
          see <code>src/Toasts.js#27</code> and <code>src/Toasts.js#40</code>{' '}
          for more details
        </p>
      </header>
    </div>
  );
};

export default App;
