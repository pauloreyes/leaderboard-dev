import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import GoogleLogo from '../images/google-color.svg';

export default function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { login, currentUser } = useAuth();
	const navigate = useNavigate();
	const loginCheck = !currentUser?.uid ? false : true;
	const { loginGoogle } = useAuth();

	useEffect(() => {
		loginCheck && navigate('/dashboard');
	}, []);

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (passwordRef.current.value === '') {
			setLoading(false);
			return setError('Password field cannot be blank');
		}

		try {
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			setError('');
			// console.log('Login Successful');
			navigate('/dashboard');
		} catch (error) {
			let msg = error.code.replace('auth/', '').replace(/-/g, ' ');
			setError(msg.charAt(0).toUpperCase() + msg.slice(1));
			setLoading(false);
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
							<div className='text-center'>
								<h3 className='text-center mb-4'>Sign in</h3>
								<Button
									onClick={loginGoogle}
									className='w-80'
									type='button'
									variant='light'
									style={{ boxShadow: '1px 1px 1px grey' }}
								>
									<img
										src={GoogleLogo}
										className='img-fluid mr-2'
										width={'25 px'}
									/>
									<span> &nbsp; &nbsp;Sign in with Google</span>
								</Button>

								<br />
								<br />
								<p>- or -</p>
							</div>

							<Form onSubmit={handleLogin}>
								{error && <Alert variant='danger'>{error}</Alert>}
								<Form.Group id='email'>
									<Form.Label>Email</Form.Label>
									<Form.Control type='email' ref={emailRef} required />
								</Form.Group>
								<Form.Group id='password'>
									<Form.Label>Password</Form.Label>
									<Form.Control type='password' ref={passwordRef} required />
								</Form.Group>
								<Button disabled={loading} className='w-100 mt-2' type='submit'>
									Log in
								</Button>
							</Form>
						</Card.Body>
						<div>
							<p className='w-100 text-center mt-2'>
								Can't log in? <Link to='/signup'>Sign up</Link> for an account or{' '}
								<Link to='/passwordreset'>reset your password</Link>
							</p>
						</div>
					</Card>
				</div>
			</Container>
		</div>
	);
}
