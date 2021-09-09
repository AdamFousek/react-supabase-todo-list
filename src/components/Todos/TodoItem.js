import classes from './TodoItem.module.css';
import { Link } from 'react-router-dom';
import { convertToDate, convertToTime, calcDate } from '../../helpers/datetime';
import { useContext } from 'react';
import { TodoContext } from '../../store/todo-context';


const TodoItem = ({ todo }) => {
  const todoCtx = useContext(TodoContext);

  const toggleTodoHandler = () => {
    todoCtx.toggleTodo(todo.id, !todo.is_complete);
  }

  const completeField = todo.is_complete === true ? <p className={classes.textComplete}>Complete</p> : <p className={classes.incomplete}>Incomplete</p>

  const buttonText = todo.is_complete === true ? 'Not completed' : 'Complete todo';

  const calculatedDate = calcDate(new Date(todo.due_date));
  let todoClass;
  if (calculatedDate === 1) {
    todoClass = `${classes.todo} ${classes.future}`;
  } else if (calculatedDate === -1) {
    todoClass = `${classes.todo} ${classes.past}`;
  } else {
    todoClass = `${classes.todo} ${classes.today}`;
  }

  if (todo.is_complete) {
    todoClass = todoClass + ` ${classes.complete}`;
  }

  return <div className={todoClass}>
    <h3>{todo.task}</h3>
    <div className={classes.content}>
      {completeField}
      <p><strong>Due date:</strong></p>
      <p> {convertToDate(todo.due_date)}</p>
      <p> {convertToTime(todo.due_date)}</p>
      <button className={classes.button} onClick={toggleTodoHandler}>{buttonText}</button>
      <p className={classes.link}>
        <Link to={`/todos/${todo.id}`}>Show todo</Link>
      </p>
    </div>
  </div>
}

export default TodoItem;