import { createContext } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    // rehydrate from localStorage if available, maybe we need a better impl
    const authData = localStorage.getItem("casa.v1.auth")

    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      const savedToken = parsedAuthData.token;
      const savedUser = parsedAuthData.user;

      // TODO: Check if we can revalidate the token if it is too old
      if (savedToken) {
        setToken(savedToken);
      }

      // XXX: Maybe we ought to drop/throw if there's not both? Like what
      // the hell are we going to do with a user without a token?
      if (savedUser) {
        setUser(savedUser);
      }
    }
  }, []);

  const login = (u, t) => {
    setUser(u);
    setToken(t);

    localStorage.setItem('casa.v1.auth', JSON.stringify({ user: u, token: t }));
  }

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem('casa.v1.auth');
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('useAuth must be within a AuthProvider bro');
  }

  return ctx;
};
