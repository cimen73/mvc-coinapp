import { createContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

// When the user enters a project, the token is taken from local
  useEffect(() => {
    const signedUser = localStorage.getItem('token');

    setUser(signedUser);
  }, []);

  //registers the user
  const signUser = (newUser) => {
    //adding id to user
    newUser.id = v4();

    // log in the user
    localStorage.setItem('token', newUser.id);

    //state update
    setUser(newUser.id);
  };

 //  Log out
  const logoutUser = () => {
   // delete from local
    localStorage.removeItem('token');
  // remove user from state
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, signUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;