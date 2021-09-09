import { useState, useRef } from 'react'
import { useHistory } from 'react-router';
import { supabase } from '../supabase/supabase-client'

const Register = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    })
    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    history.replace('/login');
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Registration</h1>
        <form onSubmit={handleRegistration}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="inputField"
              type="email"
              placeholder="Your email"
              ref={emailInputRef}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="inputField"
              type="password"
              minLength="8"
              ref={passwordInputRef}
            />
          </div>
          <div>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <button
              type="submit"
              className={'button block'}
              disabled={loading}
            >
              {loading ? <span>Loading</span> : <span>Register</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register;