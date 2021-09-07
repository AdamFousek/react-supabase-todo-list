import classes from './MainHeader.module.css';
import { NavLink } from 'react-router-dom';

const MainHeader = (props) => {
  const { session } = props;

  if (!session) {
    return <header className={classes.nav}>
      <div className={classes.logo}>
        <NavLink to='/'>Todo App</NavLink>
      </div>
      <div className={classes.links}>
        <NavLink to='/login' activeClassName={classes.active}>Login</NavLink>
        <NavLink to='/register' activeClassName={classes.active}>Register</NavLink>
      </div>
    </header>;
  }

  return <header className={classes.nav}>
    <div className={classes.logo}>
      <NavLink to='/'>Todo App</NavLink>
    </div>
    <div className={classes.links}>
      <NavLink to='/todos' activeClassName={classes.active}>Todos</NavLink>
      <NavLink to='/profile' activeClassName={classes.active}>Profile</NavLink>
    </div>
  </header>

}

export default MainHeader;