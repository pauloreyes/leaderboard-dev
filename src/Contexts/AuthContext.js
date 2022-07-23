import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../Firebase';
import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
	signInWithRedirect,
} from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [authLoaded, setAuthLoaded] = useState(false);
	const provider = new GoogleAuthProvider();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setAuthLoaded(true);
		});
	}, []);

	function signup(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	async function loginGoogle() {
		return await signInWithRedirect(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				// The signed-in user info.
				const user = result.user;
				// ...
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	}

	const value = {
		currentUser,
		signup,
		login,
		authLoaded,
		loginGoogle,
	};

	return <AuthContext.Provider value={value}>{authLoaded && children}</AuthContext.Provider>;
}
