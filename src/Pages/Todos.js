import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import TodoList from "../components/Todos/TodoList";
import { TodoContext } from "../store/todo-context";

const Todos = () => {
  const todoCtx = useContext(TodoContext);
  const todos = todoCtx.todos;

  useEffect(() => {
    todoCtx.fetchTodo();
  }, []);

  if (!todos) {
    return <section>
      <h1>Your todos</h1>
      <Link to='/add-todo'>Add new todo!</Link>
      <section>
        <h3>No todos!</h3>
      </section>
    </section>
  }

  const completeTodos = [...todos.filter(item => item.is_complete === true)];
  const incompleteTodos = [...todos.filter(item => item.is_complete !== true)];

  return <section>
    <h1>Your todos</h1>
    <Link to='/add-todo'>Add new todo!</Link>
    <section>
      <h3>Incomplete todos:</h3>
      <TodoList todos={incompleteTodos} />
    </section>
    <section>
      <h3>Complete todos:</h3>
      <TodoList todos={completeTodos} />
    </section>
  </section>
}

export default Todos;