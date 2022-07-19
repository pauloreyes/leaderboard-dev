import React, { useRef, useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { auth } from '../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';

export default function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfRef = useRef();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const register = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (passwordRef.current.value === '' || passwordConfRef.current.value === '') {
			setLoading(false);
			return setError('Password fields cannot be blank');
		}

		if (passwordRef.current.value !== passwordConfRef.current.value) {
			setLoading(false);
			return setError('Passwords do not match');
		}

		try {
			setLoading(true);
			const newUser = await createUserWithEmailAndPassword(
				auth,
				emailRef.current.value,
				passwordRef.current.value
			);
			setError('');
			console.log(newUser);
		} catch (error) {
			setLoading(false);
			setError(error.message);
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
						<Form>
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
								{error && <p style={{ color: 'red' }}>{error}</p>}
							</Form.Group>
							<Button
								disabled={loading}
								type='submit'
								className='w-100 mt-2'
								onClick={register}
							>
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
