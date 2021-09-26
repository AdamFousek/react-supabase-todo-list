import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { TodoContext } from "../store/todo-context";
import { DateTime } from 'luxon';
import classes from './../css/TodoDetail.module.css';

const TodoDetail = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [wasChanged, setWasChanged] = useState(null);
  const [error, setError] = useState(null);
  const params = useParams();
  const history = useHistory();
  const todoId = params.todoId;
  const todoCtx = useContext(TodoContext);
  const todo = todoCtx.selectedTodo;

  useEffect(() => {
    console.log('test');
    if (todoId) {
      try {
        todoCtx.fetchTodoById(todoId);
      } catch (error) {
        setError(error);
      }
    }
  }, [todoId, wasChanged]);

  const deleteTodoHandler = async () => {
    todoCtx.removeTodo(todoId);
    history.push('/todos');
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
    <p>Due date: {DateTime.fromISO(todo.due_date).toFormat('d. L. y H:mm')}</p>
    <p>Inserted date: {DateTime.fromISO(todo.inserted_at).toFormat('d. L. y H:mm')}</p>
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