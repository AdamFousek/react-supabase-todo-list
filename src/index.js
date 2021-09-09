import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './store/auth-context';
import TodoContextProvider from './store/todo-context';

ReactDOM.render(
  <AuthContextProvider>
    <TodoContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TodoContextProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);
