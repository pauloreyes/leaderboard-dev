import React from 'react';
import { Button } from 'react-bootstrap';
import { auth, db } from '../Firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { doc, setDoc } from 'firebase/firestore';

export default function Dashboard() {
	const { currentUser } = useAuth();
	const navigate = useNavigate();

	const logout = async () => {
		await signOut(auth);
		console.log('Succesfully logged out');
	};

	async function updateUserData() {
		// Add a new document in collection "cities"
		await setDoc(doc(db, 'users/JeeQQ7UReeP7I36SR5gJjVyCkZt2/subCollection', 'newtest'), {
			displayName: 'this is a test',
			email: currentUser.email,
		});
		console.log('write done');
	}

	return (
		<div>
			<h1>Dashboard</h1>
			{!currentUser.emailVerified && (
				<div className='h-100 d-flex align-items-center justify-content-center pt-2'>
					<Alert variant='danger'>Please verify your email</Alert>
				</div>
			)}
			<Button onClick={updateUserData}>Write</Button>
			{!currentUser && navigate('/login')}

			<p>{JSON.stringify(currentUser)}</p>

			<Button onClick={logout}>Sign Out</Button>
		</div>
	);
}
