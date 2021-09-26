import { Link } from "react-router-dom";

const Homepage = () => {
  return <section>
    <h1>Welcome!</h1>
    <p>To create todos, please <Link to='/login'>Log in!</Link></p>
    <hr />
    <p>Or create new account <Link to='/register'>here</Link></p>
  </section>
}

export default Homepage;