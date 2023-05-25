import TokenContext from "./UserContext";

const ProtectedRoutes = ({ children }) => {
    // const token = getToken(); // Retrieve the token from storage or other sources
  
    return (
      <TokenContext.Provider value={'hi'}>
        {children}
      </TokenContext.Provider>
    );
  };

  export default ProtectedRoutes;