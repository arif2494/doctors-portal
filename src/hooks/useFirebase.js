import { useEffect, useState } from 'react';
import initializeFirebase from '../Pages/Login/Firebase/firebase.init';
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signOut
} from 'firebase/auth';

// initialize firebase
initializeFirebase();
const useFirebase = () => {
	const [ user, setUser ] = useState({});
	const [ isLoading, setIsLoading ] = useState(true);
	const [ authError, setAuthError ] = useState('');
	const auth = getAuth();

	// register
	const registerUser = (email, password) => {
		setIsLoading(true);
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				// const user = userCredential.user;

				setAuthError('');
			})
			.catch((error) => {
				const errorMessage = error.message;
				setAuthError(errorMessage);
			})
			.finally(() => setIsLoading(false));
	};

	// sign in
	const loginUser = (email, password) => {
		setIsLoading(true);
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				// const user = userCredential.user;

				setAuthError('');
			})
			.catch((error) => {
				const errorMessage = error.message;
				setAuthError(errorMessage);
			})
			.finally(() => setIsLoading(false));
	};

	// observe user presence
	useEffect(
		() => {
			const unsubscribe = onAuthStateChanged(auth, (user) => {
				if (user) {
					setUser(user);
				} else {
					setUser({});
				}
				setIsLoading(false);
			});
			return () => unsubscribe;
		},
		[ auth ]
	);
	// logout
	const logout = () => {
		setIsLoading(true);
		signOut(auth)
			.then(() => {
				// Sign-out successful.
			})
			.catch((error) => {
				// An error happened.
			})
			.finally(() => setIsLoading(false));
	};
	return {
		isLoading,
		user,
		authError,
		registerUser,
		loginUser,
		logout
	};
};
export default useFirebase;
