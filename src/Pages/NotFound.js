import { Link } from 'react-router-dom';

const NotFound = () => {
  return <section>
    <h1>Page not found!</h1>
    <p>Go to <Link to='/'>homepage</Link>!</p>
  </section>
}

export default NotFound;