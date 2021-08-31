import { Link } from "react-router-dom";
import TodoList from "../components/Todos/TodoList";

const DUMMY_TODOS = [
  { id: 't1', task: 'Complete todo', is_complete: false, inserted_at: 1630298044, due_date: 1630298044 },
  { id: 't2', task: 'Complete React Curse', is_complete: true, inserted_at: 1630298044, due_date: 1630298044 },
  { id: 't3', task: 'Complete Everything', is_complete: false, inserted_at: 1630298044, due_date: 1630298044 },
  { id: 't4', task: 'Complete Everything', is_complete: false, inserted_at: 1630298044, due_date: 1630298044 }
]

const Todos = (props) => {
  const completeTodos = DUMMY_TODOS.filter(item => item.is_complete === true);
  const incompleteTodos = DUMMY_TODOS.filter(item => item.is_complete !== true);
  return <section>
    <h1>Your todos</h1>
    <Link to='/add-todo'>Add new todo!</Link>
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