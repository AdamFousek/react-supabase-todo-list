import classes from './MainHeader.module.css';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../store/auth-context';

const MainHeader = () => {
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;

  const logoutHandler = () => {
    authCtx.logout();
  }

  if (!user) {
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
      <button onClick={logoutHandler}>Logout</button>
    </div>
  </header>

}

export default MainHeader;