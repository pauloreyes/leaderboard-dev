import React, { useState, useEffect } from 'react';
import Signup from './Components/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import { auth } from './Firebase';
import PageNotFound from './Components/PageNotFound';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
	const [user, setUser] = useState({});

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
	}, []);

	return (
		<Router>
			<Routes>
				<Route path='/' element={!user ? <Login /> : <Dashboard />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/login' element={<Login />} />
				<Route path='/dashboard' element={<Dashboard />} />

				{/* <ProtectedRoute user={user}>
					<Dashboard user={user} />
				</ProtectedRoute> */}
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</Router>
	);
}

export default App;
