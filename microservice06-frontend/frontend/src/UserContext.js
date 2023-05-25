import React, { createContext, useState, useEffect } from 'react';


const UserContext = createContext();

// to wrap the routes within
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() =>{
    // lastlogin: null,
    // credits: null,
    // googleaccount: null,
    // token: null,
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // const updateUser = (newUser) => {
  //   setUser(newUser);
  // };
  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.storageArea === localStorage && e.key === 'user') {
        setUser(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
