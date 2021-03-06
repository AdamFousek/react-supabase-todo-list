import { Link } from "react-router-dom";
import TodoList from "../components/Todos/TodoList";
import { calcDate } from "../helpers/datetime";
import { useContext, useEffect } from 'react';
import { TodoContext } from "../store/todo-context";

const Dashboard = () => {
  const todoCtx = useContext(TodoContext);
  const todos = todoCtx.todos;

  useEffect(() => {
    todoCtx.fetchTodo();
  }, []);

  let todaysTodo = [];

  if (todos) {
    todaysTodo = todos.filter((todo) => {
      return calcDate(new Date(todo.due_date)) === 0;
    })
  }

  if (todaysTodo.length === 0) {
    return <section>
      <h1>Welcome!</h1>
      <h2>No todos for today!</h2>
      <p><Link to='/add-todo'>Create one</Link></p>
    </section>
  }

  return <section>
    <h1>Welcome!</h1>
    <div>
      <h2>Your todos for today:</h2>
      <TodoList todos={todaysTodo} />
      <p><Link to='/todos'>Show all</Link></p>
    </div>
  </section>
}

export default Dashboard;