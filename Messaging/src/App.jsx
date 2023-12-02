import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Layout } from "./components/styles";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { UserContext, UserContextProvider } from './contexts/User';

function PrivateRoute({ element }) {
  const { user } = useContext(UserContext);

  // Redirect to login if user is not authenticated
  return user ? element : <Navigate to="/" />;
}

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="app/*" element={<PrivateRoute element={<Dashboard />} />} />
          </Routes>
        </Layout>
      </div>
    </UserContextProvider>
  );
}

export default App;
