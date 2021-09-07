import { Fragment } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import MainHeader from './components/Layout/MainHeader';
import Homepage from './Pages/Homepage';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import Profile from './Pages/Profile';
import Todos from './Pages/Todos';
import TodoDetail from './Pages/TodoDetail';
import AddTodo from './Pages/AddTodo';
import { useContext } from 'react';
import { AuthContext } from './store/auth-context';
import Register from './Pages/Register';


const App = () => {
  const authCtx = useContext(AuthContext);
  const session = authCtx.session;

  return (
    <Fragment>
      <MainHeader session={session} />
      <main className='main'>
        <Switch>
          <Route path='/' exact>
            {!session && <Homepage />}
            {session && <Dashboard session={session} />}
          </Route>
          <Route path='/login' exact>
            {!session && <Login />}
            {session && <Redirect to='/profile' />}
          </Route>
          <Route path='/register' exact>
            {!session && <Register />}
            {session && <Redirect to='/profile' />}
          </Route>
          <Route path='/profile' exact>
            {!session && <Redirect to='/' />}
            {session && <Profile session={session} />}
          </Route>
          <Route path='/todos' exact>
            {!session && <Redirect to='/' />}
            {session && <Todos session={session} />}
          </Route>
          <Route path='/todos/:todoId'>
            {!session && <Redirect to='/' />}
            {session && <TodoDetail session={session} />}
          </Route>
          <Route path='/add-todo' exact>
            {!session && <Redirect to='/' />}
            {session && <AddTodo session={session} />}
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </main>
    </Fragment>
  )
}

export default App;