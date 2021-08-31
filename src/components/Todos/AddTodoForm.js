import Card from "../UI/Card";
import { useState } from "react";

const AddTodoForm = (props) => {
  const [task, setTask] = useState(null);
  const [dueDate, setDuedate] = useState(null);
  const [error, setError] = useState(props.error);

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (task === null) {
      setError('Task must not be empty!');
      return;
    }

    if (dueDate === null) {
      setError('Due date must not be empty!');
      return;
    }

    props.onAddTodoSubmit({ task, dueDate });
  }
  return <Card>
    <form onSubmit={addTodoHandler}>
      <div className="form-widget">
        <div>
          <label htmlFor="task">Task</label>
          <input
            id="task"
            type="text"
            value={task || ''}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="website">Due date</label>
          <input
            id="due_date"
            type="datetime-local"
            value={dueDate || ''}
            onChange={(e) => setDuedate(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div>
          <button type="submit" className="button block primary">
            Add Todo
          </button>
        </div>
      </div>
    </form>
  </Card>;
}

export default AddTodoForm;