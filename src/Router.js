import { Route, Redirect, Switch } from "react-router-dom";
import Homepage from './Pages/Homepage';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import Profile from './Pages/Profile';
import Todos from './Pages/Todos';
import TodoDetail from './Pages/TodoDetail';
import AddTodo from './Pages/AddTodo';
import Register from './Pages/Register';
import { useContext } from "react";
import { AuthContext } from "./store/auth-context";

const Router = () => {
  const userCtx = useContext(AuthContext);
  const user = userCtx.user;

  return (<Switch>
    <Route path='/' exact>
      {!user && <Homepage />}
      {user && <Dashboard />}
    </Route>
    <Route path='/login' exact>
      {!user && <Login />}
      {user && <Redirect to='/profile' />}
    </Route>
    <Route path='/register' exact>
      {!user && <Register />}
      {user && <Redirect to='/profile' />}
    </Route>
    <Route path='/profile' exact>
      {!user && <Redirect to='/login' />}
      {user && <Profile />}
    </Route>
    <Route path='/todos' exact>
      {!user && <Redirect to='/' />}
      {user && <Todos user={user} />}
    </Route>
    <Route path='/todos/:todoId'>
      {!user && <Redirect to='/' />}
      {user && <TodoDetail />}
    </Route>
    <Route path='/add-todo' exact>
      {!user && <Redirect to='/' />}
      {user && <AddTodo />}
    </Route>
    <Route path='*'>
      <NotFound />
    </Route>
  </Switch>)
}

export default Router;