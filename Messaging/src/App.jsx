import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Layout } from "./components/styles";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { UserContext, UserContextProvider } from './contexts/User';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify';

function PrivateRoute({ element }) {
  const { user } = useContext(UserContext);

  // Redirect to login if user is not authenticated
  if (!user) {
    toast.error('Please log in to access the dashboard.');
    return <Navigate to="/" />;
  }

  return element;
}

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <ToastContainer />
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
