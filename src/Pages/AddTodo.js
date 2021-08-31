import AddTodoForm from "../components/Todos/AddTodoForm"
import { useHistory } from "react-router"
import { supabase } from "../supabase/supabase-client";
import { useState } from "react";

const AddTodo = (props) => {
  const [error, setError] = useState(null);
  const history = useHistory();
  const onAddTodoHandler = async (todo) => {
    setError(null);
    const user = supabase.auth.user();
    const insertedTodo = {
      is_complete: false,
      task: todo.task,
      due_date: new Date(todo.dueDate),
      user_id: user.id,
      inserted_at: new Date()
    };

    const { error } = await supabase
      .from('todos')
      .insert([insertedTodo], {
        returning: 'minimal', // Don't return the value after inserting
      });

    if (error) {
      setError(error);
    }

    history.push('/todos');
  }

  return <section>
    <h1>Add todo</h1>
    <AddTodoForm onAddTodoSubmit={onAddTodoHandler} error={error} />
  </section>
}

export default AddTodo;