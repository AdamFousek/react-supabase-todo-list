import { Fragment, useEffect, useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useHistory } from 'react-router';
import MainHeader from './components/Layout/MainHeader';
import Homepage from './Pages/Homepage';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import Profile from './Pages/Profile';
import Todos from './Pages/Todos';
import TodoDetail from './Pages/TodoDetail';
import AddTodo from './Pages/AddTodo';
import { AuthContext } from './store/auth-context';
import Register from './Pages/Register';
import { TodoContext } from "./store/todo-context";


const App = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const todoCtx = useContext(TodoContext);
  const todos = todoCtx.todos;
  const user = authCtx.user;
  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      todoCtx.fetchTodo();
    }
  }, [userId])

  const onDeleteTodoHandler = (todoId) => {
    history.replace('/todos');
    todoCtx.removeTodo(todoId);
  }

  return (
    <Fragment>
      <MainHeader />
      <main className='main'>
        <Switch>
          <Route path='/' exact>
            {!user && <Homepage />}
            {user && <Dashboard todos={todos} />}
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
            {user && <Todos user={user} todos={todos} />}
          </Route>
          <Route path='/todos/:todoId'>
            {!user && <Redirect to='/' />}
            {user && <TodoDetail onDeleteTodo={onDeleteTodoHandler} />}
          </Route>
          <Route path='/add-todo' exact>
            {!user && <Redirect to='/' />}
            {user && <AddTodo />}
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