import { useParams } from "react-router";
import { Link } from "react-router-dom";
import classes from './TodoDetail.module.css';

const DUMMY_TODOS = [
  { id: 't1', task: 'Complete todo', is_complete: false, inserted_at: 1630298044, due_date: 1630298044 },
  { id: 't2', task: 'Complete React Curse', is_complete: true, inserted_at: 1630298044, due_date: 1630298044 },
  { id: 't3', task: 'Complete Everything', is_complete: false, inserted_at: 1630298044, due_date: 1630298044 },
  { id: 't4', task: 'Complete Everything', is_complete: false, inserted_at: 1630298044, due_date: 1630298044 }
]

const TodoDetail = (prosp) => {
  const params = useParams();
  const todo = DUMMY_TODOS.find(item => item.id === params.todoId);

  const completeField = todo.is_complete === true ? <p className={classes.complete}>Complete</p> : <p className={classes.incomplete}>Incomplete</p>

  return <section>
    <h2>{todo.task}</h2>
    <h3>{completeField}</h3>
    <p>Due date: Date</p>
    <p>Inserted date: Date</p>
    <div className={classes.actions}>
      <button className={classes.red}>Delete todo</button>
      <button>Mark as complete</button>
    </div>
    <div>
      <Link to="/todos">Go back</Link>
    </div>
  </section>
}

export default TodoDetail;