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

  const buttonText = todo.is_complete === true ? 'Not completed' : 'Complete todo';

  return <div className={classes.todo}>
    <h3>{todo.task}</h3>
    <div className={classes.content}>
      {completeField}
      <p>Due date: {convertTimestamp(todo.due_date)}</p>
      <button className={classes.button}>{buttonText}</button>
      <p className='red'>
        <Link to={`/todos/${todo.id}`}>Show todo</Link>
      </p>
    </div>
  </div>
}

export default TodoItem;