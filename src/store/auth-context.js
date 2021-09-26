import React, { useState } from 'react';
import { supabase } from '../supabase/supabase-client';

export const AuthContext = React.createContext({
  user: {},
  session: {},
  login: () => { },
  logout: () => { },
  getProfile: () => { },
  updateProfile: (obj) => { },
  createProfile: (user) => { }
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

  const getProfileHandler = async () => {
    const user = supabase.auth.user();
    let { data, error, status } = await supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single()

    if (error && status !== 406) {
      throw error
    }

    if (data) {
      return {
        username: data.username,
        website: data.website,
        avater_url: data.avatar_url
      };
    }
  }

  const createProfileHandler = async (user) => {
    const insert = {
      id: user.id,
      username: '',
      website: '',
      avatar_url: '',
      updated_at: new Date(),
    }
    const { error } = await supabase
      .from('profiles')
      .insert([
        insert,
      ], {
        returning: 'minimal',
      });

    if (error) {
      throw error
    }
  }

  const updateProfileHandler = async (obj) => {
    const user = supabase.auth.user()

    const updates = {
      id: user.id,
      username: obj.username,
      website: obj.website,
      avatar_url: obj.avatar_url,
      updated_at: new Date(),
    }

    let { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal', // Don't return the value after inserting
    })

    if (error) {
      throw error
    }
  }

  const contextValue = {
    user: user,
    session: session,
    login: loginHandler,
    logout: logoutHandler,
    getProfile: getProfileHandler,
    updateProfile: updateProfileHandler,
    createProfile: createProfileHandler
  };

  return <AuthContext.Provider value={contextValue}>
    {props.children}
  </AuthContext.Provider>
}

export default AuthContextProvider;