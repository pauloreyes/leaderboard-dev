import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

export default function ProtectedRoute() {
	const { currentUser } = useAuth();
	return currentUser?.uid ? <Outlet /> : <Navigate to='/login' />;
}
