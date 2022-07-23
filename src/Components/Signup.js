import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { auth } from '../Firebase';
import { sendEmailVerification } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

export default function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfRef = useRef();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { signup, currentUser } = useAuth();
	const loginCheck = !currentUser?.uid ? false : true;

	useEffect(() => {
		loginCheck && navigate('/dashboard');
	}, []);

	const handleSignup = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (passwordRef.current.value === '' || passwordConfRef.current.value === '') {
			setLoading(false);
			return setError('Password fields cannot be blank.');
		}

		if (passwordRef.current.value !== passwordConfRef.current.value) {
			setLoading(false);
			return setError('Passwords do not match.');
		}

		try {
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			await sendEmailVerification(auth.currentUser).then(() => {});
			setError('');
			navigate('/dashboard');
		} catch (error) {
			let msg = error.code.replace('auth/', '').replace(/-/g, ' ');
			setError(msg.charAt(0).toUpperCase() + msg.slice(1));
			setLoading(false);
		}
	};

	return (
		<Container
			className='d-flex align-items-center justify-content-center'
			style={{ minHeight: '100vh' }}
		>
			<div className='w-100' style={{ maxWidth: '400px' }}>
				<Card className='pt-2 pb-2'>
					<Card.Body>
						<h2 className='text-center mb-4'>Sign Up</h2>
						<Form onSubmit={handleSignup}>
							{error && <Alert variant='danger'>{error}</Alert>}
							<Form.Group id='email'>
								<Form.Label>Email</Form.Label>
								<Form.Control type='email' ref={emailRef} required />
							</Form.Group>
							<Form.Group id='password'>
								<Form.Label>Password</Form.Label>
								<Form.Control type='password' ref={passwordRef} required />
							</Form.Group>
							<Form.Group id='passwordConf'>
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control type='password' ref={passwordConfRef} required />
							</Form.Group>
							<Button disabled={loading} type='submit' className='w-100 mt-2'>
								Sign Up
							</Button>
						</Form>
					</Card.Body>
					<div className='w-100 text-center mt-2'>
						<p>
							Already have an account? <Link to='/login'>Log in.</Link>{' '}
						</p>
					</div>
				</Card>
			</div>
		</Container>
	);
}
