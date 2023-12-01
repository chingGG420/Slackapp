import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Layout } from "./components/styles";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { UserContextProvider } from './contexts/User';

function App() {
	return (
		<UserContextProvider>
			<div className="App">
				<Layout>
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="signup" element={<Signup />} />
						<Route path="app/*" element={<Dashboard />} />
					</Routes>
				</Layout>
			</div>
		</UserContextProvider>
	);
}

export default App;