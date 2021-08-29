import classes from './TodoItem.module.css';

const TodoItem = (props) => {
  const { todo } = props;

  const completeField = todo.is_complete === true ? <p className={classes.complete}>Complete</p> : <p className={classes.incomplete}>Incomplete</p>
  return <section className={classes.todo}>
    <h3>{todo.task}</h3>
    <div className={classes.content}>
      <p>Created at: {todo.inserted_at}</p>
      <p>Due date: {todo.due_date}</p>
      {completeField}
    </div>
  </section>
}

export default TodoItem;