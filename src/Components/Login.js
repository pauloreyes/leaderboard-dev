import React, { useRef, useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { Link } from 'react-router-dom';

export default function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const login = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (passwordRef.current.value === '') {
			setLoading(false);
			return setError('Password field cannot be blank');
		}

		try {
			setLoading(true);
			const loginUser = await signInWithEmailAndPassword(
				auth,
				emailRef.current.value,
				passwordRef.current.value
			);
			setError('');
			console.log('Login Successful');
		} catch (error) {
			setLoading(false);
			setError(error.message);
		}
	};

	return (
		<div>
			<Container
				className='d-flex align-items-center justify-content-center'
				style={{ minHeight: '100vh' }}
			>
				<div className='w-100' style={{ maxWidth: '400px' }}>
					<Card className='pt-2 pb-2'>
						<Card.Body>
							<h2 className='text-center mb-4'>Sign in</h2>
							<Form>
								{error && <p style={{ color: 'red' }}>{error}</p>}
								<Form.Group id='email'>
									<Form.Label>Email</Form.Label>
									<Form.Control type='email' ref={emailRef} required />
								</Form.Group>
								<Form.Group id='password'>
									<Form.Label>Password</Form.Label>
									<Form.Control type='password' ref={passwordRef} required />
								</Form.Group>
								<Button disabled={loading} className='w-100 mt-2' onClick={login}>
									Log in
								</Button>
							</Form>
						</Card.Body>
						<div>
							<p className='w-100 text-center mt-2'>
								Don't have an account? <Link to='/signup'>Sign up.</Link>
							</p>
						</div>
					</Card>
				</div>
			</Container>
		</div>
	);
}
