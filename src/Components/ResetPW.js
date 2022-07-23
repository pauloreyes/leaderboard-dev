import React, { useRef, useState } from 'react';
import { auth } from '../Firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useAuth } from '../Contexts/AuthContext';
import { Button, Form, Container, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ResetPW() {
	const { currentUser } = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const emailRef = useRef();

	async function handleReset(e) {
		e.preventDefault();
		setLoading(true);

		try {
			await sendPasswordResetEmail(auth, emailRef.current.value);
			setLoading(false);
			setMessage('Link sent. Please check your email.');
		} catch (error) {
			let msg = error.code.replace('auth/', '').replace(/-/g, ' ');
			setError(msg.charAt(0).toUpperCase() + msg.slice(1));
			setLoading(false);
		}
	}

	return (
		<div>
			<Container
				className='d-flex align-items-center justify-content-center'
				style={{ minHeight: '100vh' }}
			>
				<div className='w-100' style={{ maxWidth: '400px' }}>
					<Card className='pt-2 pb-2'>
						<Card.Body>
							<h2 className='text-center mb-4'>Reset your password</h2>
							<Form onSubmit={handleReset}>
								{message && <Alert variant='success'>{message}</Alert>}
								{error && <Alert variant='danger'>{error}</Alert>}
								<Form.Group id='email'>
									<Form.Label>Email</Form.Label>
									<Form.Control type='email' ref={emailRef} required />
								</Form.Group>
								<Button disabled={loading} className='w-100 mt-2' type='submit'>
									Send Password Reset Link
								</Button>
							</Form>
						</Card.Body>
						<div>
							<p className='w-100 text-center mt-2'>
								Don't have an account? <Link to='/signup'>Sign up</Link>.
							</p>
						</div>
					</Card>
				</div>
			</Container>
		</div>
	);
}
