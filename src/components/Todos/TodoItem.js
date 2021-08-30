import classes from './TodoItem.module.css';
import { Link } from 'react-router-dom';

const TodoItem = (props) => {
  const { todo } = props;

  const convertTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes} ${day}. ${month}. ${year}`;
  };

  const completeField = todo.is_complete === true ? <p className={classes.complete}>Complete</p> : <p className={classes.incomplete}>Incomplete</p>
  return <div className={classes.todo}>
    <h3>{todo.task}</h3>
    <div className={classes.content}>
      <p>Created at: {convertTimestamp(todo.inserted_at)}</p>
      <p>Due date: {convertTimestamp(todo.due_date)}</p>
      {completeField}
      <Link to={`/todos/${todo.id}`}>Show todo</Link>
    </div>
  </div>
}

export default TodoItem;