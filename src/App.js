import React from 'react';
import Signup from './Components/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import PageNotFound from './Components/PageNotFound';
import { AuthProvider, useAuth } from './Contexts/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import ResetPW from './Components/ResetPW';

function App() {
	const { currentUser } = useAuth();

	return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route exact path='/' element={!currentUser?.uid ? <Login /> : <Dashboard />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/login' element={<Login />} />
					<Route path='/passwordreset' element={<ResetPW />} />
					<Route element={<ProtectedRoute />}>
						<Route path='/dashboard' element={<Dashboard />} />
					</Route>
					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;
