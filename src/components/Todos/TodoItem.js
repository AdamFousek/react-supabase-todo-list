import classes from './../../css/TodoItem.module.css';
import { Link } from 'react-router-dom';
import { calcDate } from '../../helpers/datetime';
import { DateTime } from 'luxon';
import { useContext } from 'react';
import { TodoContext } from '../../store/todo-context';
import className from 'classnames';


const TodoItem = ({ todo }) => {
  const todoCtx = useContext(TodoContext);

  const toggleTodoHandler = () => {
    todoCtx.toggleTodo(todo.id, !todo.is_complete);
  }

  const completeField = todo.is_complete === true ? <p className={classes.textComplete}>Complete</p> : <p className={classes.incomplete}>Incomplete</p>

  const buttonText = todo.is_complete === true ? 'Not completed' : 'Complete todo';

  const calculatedDate = calcDate(new Date(todo.due_date));
  const todoClass = className({
    [`${classes.todo}`]: true,
    [`${classes.future}`]: calculatedDate === 1,
    [`${classes.past}`]: calculatedDate === -1,
    [`${classes.today}`]: calculatedDate === 0,
    [`${classes.complete}`]: todo.is_complete,
  });

  return <div className={todoClass}>
    <h3>{todo.task}</h3>
    <div className={classes.content}>
      {completeField}
      <p><strong>Due date:</strong></p>
      <p> {DateTime.fromISO(todo.due_date).toFormat('d. L. y')}</p>
      <p> {DateTime.fromISO(todo.due_date).toFormat('H:mm')}</p>
      <button className={classes.button} onClick={toggleTodoHandler}>{buttonText}</button>
      <p className={classes.link}>
        <Link to={`/todos/${todo.id}`}>Show todo</Link>
      </p>
    </div>
  </div>
}

export default TodoItem;