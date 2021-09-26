import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './store/auth-context';
import TodoContextProvider from './store/todo-context';
import MainHeader from './components/Layout/MainHeader';
import Router from './Router';

const App = () => {
  return <AuthContextProvider>
    <TodoContextProvider>
      <BrowserRouter>
        <MainHeader />
        <main className='main'>
          <Router />
        </main>
      </BrowserRouter>
    </TodoContextProvider>
  </AuthContextProvider>;
}

export default App;