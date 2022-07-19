import React from 'react';
import { Button } from 'react-bootstrap';
import { auth } from '../Firebase';
import { signOut } from 'firebase/auth';

export default function Dashboard() {
	const logout = async () => {
		await signOut(auth);
		console.log('Succesfully logged out');
	};

	return (
		<div>
			<h1>Dashboard</h1>
			<Button onClick={logout}>Sign Out</Button>
		</div>
	);
}
