import { Fragment, useState, useEffect } from 'react'
import { supabase } from './supabase/supabase-client'
import { Redirect, Route, Switch } from 'react-router-dom'
import MainHeader from './components/Layout/MainHeader';
import Homepage from './Pages/Homepage';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import Profile from './Pages/Profile';
import Todos from './Pages/Todos';


const App = () => {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, []);

  return (
    <Fragment>
      <MainHeader session={session} />
      <main className='main'>
        <Switch>
          <Route path='/' exact>
            {!session && <Homepage />}
            {session && <Dashboard session={session} />}
          </Route>
          <Route path='/login' exact>
            <Login />
          </Route>
          <Route path='/profile' exect>
            {!session && <Redirect to='/' />}
            {session && <Profile session={session} />}
          </Route>
          <Route path='/todos' exect>
            {!session && <Redirect to='/' />}
            {session && <Todos session={session} />}
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </main>
    </Fragment>
  )
}

export default App;