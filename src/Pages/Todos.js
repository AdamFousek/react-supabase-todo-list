import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import TodoList from "../components/Todos/TodoList";
import { supabase } from "../supabase/supabase-client";

const Todos = (props) => {
  const { id: userId } = supabase.auth.user();
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const getData = async () => {
      let { data: todos, error } = await supabase
        .from('todos')
        .select('*')
      if (error) {
        setError(error);
        return;
      }
      setTodos(todos);
    }

    getData();
  }, [userId])
  const completeTodos = todos.filter(item => item.is_complete === true);
  const incompleteTodos = todos.filter(item => item.is_complete !== true);
  return <section>
    <h1>Your todos</h1>
    <Link to='/add-todo'>Add new todo!</Link>
    {error && <p>Something went wrong! - {error.message}</p>}
    <section>
      <h3>Incomplete todos:</h3>
      <TodoList todos={incompleteTodos} />
    </section>
    <section>
      <h3>Complete todos:</h3>
      <TodoList todos={completeTodos} />
    </section>
  </section>
}

export default Todos;