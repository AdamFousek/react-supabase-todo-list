import TodoItem from './TodoItem';
import classes from './TodoList.module.css';

const TodoList = (props) => {
  const { todos } = props;

  const mapTodos = todos.map(item => <TodoItem key={item.id} todo={item} />);

  return <section className={classes.todos}>
    {mapTodos}
  </section>
}

export default TodoList;