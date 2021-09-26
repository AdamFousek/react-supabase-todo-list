import Card from "../UI/Card";
import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router";
import { TodoContext } from "../../store/todo-context";
import { AuthContext } from "../../store/auth-context";

const AddTodoForm = () => {
  const todoCtx = useContext(TodoContext);
  const authCtx = useContext(AuthContext);
  const taskInputRef = useRef();
  const dueDateInputRef = useRef();
  const [error, setError] = useState(null);

  const history = useHistory();


  const onAddTodoHandler = async (e) => {
    e.preventDefault();
    setError(null);
    const task = taskInputRef.current.value;
    const dueDate = dueDateInputRef.current.value;
    const userId = authCtx.user.id;
    try {
      await todoCtx.addTodo({
        task,
        dueDate,
        userId
      })
    } catch (error) {
      setError(error);
      return;
    }

    history.replace('/todos');
  }

  return <Card>
    <form onSubmit={onAddTodoHandler}>
      <div className="form-widget">
        <div>
          <label htmlFor="task">Task</label>
          <input
            id="task"
            type="text"
            ref={taskInputRef}
          />
        </div>
        <div>
          <label htmlFor="website">Due date</label>
          <input
            id="due_date"
            type="datetime-local"
            ref={dueDateInputRef}
          />
        </div>
        {error && <p className="error">{error.message}</p>}
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