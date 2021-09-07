import React, { useState } from 'react';
import { supabase } from '../supabase/supabase-client';

export const AuthContext = React.createContext({
  user: {},
  session: {},
  login: () => { },
  logout: () => { }
});

const DEFAULT_DATA = {
  session: null,
  user: null
}

const getStoredData = () => {
  const session = supabase.auth.session();
  if (!session) {
    return DEFAULT_DATA;
  }
  const currentTime = new Date().getTime() / 1000;
  const sessionExpireTime = session.expires_at;

  if (sessionExpireTime - currentTime <= 60) {
    return DEFAULT_DATA;
  }

  return {
    session,
    user: supabase.auth.user()
  };
}

const AuthContextProvider = (props) => {
  const { session: storedSession, user: storedUser } = getStoredData();
  const [user, setUser] = useState(storedUser);
  const [session, setSession] = useState(storedSession);

  const loginHandler = (user, session) => {
    setUser(user);
    setSession(session);
  };

  const logoutHandler = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      return error;
    }

    setUser(null);
    setSession(null);
  };

  const contextValue = {
    user: user,
    session: session,
    login: loginHandler,
    logout: logoutHandler
  };

  return <AuthContext.Provider value={contextValue}>
    {props.children}
  </AuthContext.Provider>
}

export default AuthContextProvider;