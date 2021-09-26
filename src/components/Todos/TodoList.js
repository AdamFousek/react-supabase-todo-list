import TodoItem from './TodoItem';
import classes from './../../css/TodoList.module.css';

const TodoList = ({ todos }) => {
  const mapTodos = todos.map(item => <TodoItem key={item.id} todo={item} />);

  return <section className={classes.todos}>
    {mapTodos}
  </section>
}

export default TodoList;