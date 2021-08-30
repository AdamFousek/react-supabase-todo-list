import TodoList from "../components/Todos/TodoList";

const DUMMY_TODOS = [
  { id: 't1', task: 'Complete todo', is_complete: false, inserted_at: 1630298044, due_date: 1630298044 },
  { id: 't2', task: 'Complete React Curse', is_complete: true, inserted_at: 1630298044, due_date: 1630298044 },
  { id: 't3', task: 'Complete Everything', is_complete: false, inserted_at: 1630298044, due_date: 1630298044 },
  { id: 't4', task: 'Complete Everything', is_complete: false, inserted_at: 1630298044, due_date: 1630298044 }
]

const Todos = (props) => {
  return <section>
    <h1>Welcome!</h1>
    <h2>Your todos for today:</h2>
    <TodoList todos={DUMMY_TODOS} />
  </section>
}

export default Todos;