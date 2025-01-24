import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Students from "./pages/Students";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [user, setUser] = React.useState(null);


  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); 
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          
          <Route
            path="/"
            element={user ? <Navigate to="/students" /> : <Login />}
          />
          <Route
            path="/students"
            element={user ? <Students /> : <Navigate to="/" />}
          />
          
          <Route
            path="/logout"
            element={<Logout setUser={setUser} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

const Logout = ({ setUser }) => {
  React.useEffect(() => {
    auth.signOut().then(() => {
      setUser(null);
    });
  }, [setUser]);

  return <Navigate to="/" />;
};

export default App;
