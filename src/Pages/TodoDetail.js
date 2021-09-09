import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { TodoContext } from "../store/todo-context";
import classes from './TodoDetail.module.css';

const TodoDetail = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [wasChanged, setWasChanged] = useState(null);
  const [error, setError] = useState(null);
  const params = useParams();
  const todoId = params.todoId;
  const todoCtx = useContext(TodoContext);
  const todo = todoCtx.selectedTodo;

  useEffect(() => {
    if (todoId) {
      try {
        todoCtx.fetchTodoById(todoId);
      } catch (error) {
        setError(error);
      }
    }
  }, [todoId, wasChanged]);

  const deleteTodoHandler = async () => {
    props.onDeleteTodo(todoId);
  };

  const toggleTodo = async () => {
    setIsLoading(true);
    await todoCtx.toggleTodo(todoId, !todo.is_complete);
    setWasChanged(prevChange => {
      return !prevChange;
    })
    setIsLoading(false);
  }

  if (error) {
    return <section>
      <h1>Something went wrong</h1>
      <h2>{error.message}</h2>
    </section>
  }

  if (!todo) {
    return <section>
      <h1>Loading...</h1>
    </section>
  }

  const completeField = todo.is_complete === true ? <p className={classes.complete}>Complete</p> : <p className={classes.incomplete}>Incomplete</p>

  return <section>
    <h2>{todo.task}</h2>
    <h3>{completeField}</h3>
    <p>Due date: Date</p>
    <p>Inserted date: Date</p>
    <div className={classes.actions}>
      <button className={classes.red} onClick={deleteTodoHandler} disabled={isLoading}>Delete todo</button>
      <button onClick={toggleTodo} disabled={isLoading}>
        {!todo.is_complete && 'Complete'}
        {todo.is_complete && 'Not complete'}
      </button>
    </div>
    <div>
      <Link to="/todos">Go back</Link>
    </div>
  </section>
}

export default TodoDetail;