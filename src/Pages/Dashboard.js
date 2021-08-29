import { Link } from "react-router-dom";
import TodoList from "../components/Todos/TodoList";

const DUMMY_TODOS = [
  { id: 't1', task: 'Complete todo', is_complete: false, inserted_at: 12312313, due_date: 123123123 },
  { id: 't2', task: 'Complete React Curse', is_complete: true, inserted_at: 12312313, due_date: 123123123 },
  { id: 't3', task: 'Complete Everything', is_complete: false, inserted_at: 12312313, due_date: 123123123 }
]

const Dashboard = () => {
  return <section>
    <h1>Welcome!</h1>
    <h2>Your todos for today:</h2>
    <TodoList todos={DUMMY_TODOS} />
    <p><Link to='/todos'>Show all</Link></p>
  </section>
}

export default Dashboard;