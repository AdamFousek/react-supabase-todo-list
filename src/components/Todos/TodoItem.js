import classes from './TodoItem.module.css';
import { Link } from 'react-router-dom';
import { convertDatetime } from '../../helpers/datetime';

const TodoItem = (props) => {
  const { todo } = props;

  const completeField = todo.is_complete === true ? <p className={classes.complete}>Complete</p> : <p className={classes.incomplete}>Incomplete</p>

  const buttonText = todo.is_complete === true ? 'Not completed' : 'Complete todo';

  return <div className={classes.todo}>
    <h3>{todo.task}</h3>
    <div className={classes.content}>
      {completeField}
      <p>Due date: {convertDatetime(todo.due_date)}</p>
      <button className={classes.button}>{buttonText}</button>
      <p className={classes.link}>
        <Link to={`/todos/${todo.id}`}>Show todo</Link>
      </p>
    </div>
  </div>
}

export default TodoItem;