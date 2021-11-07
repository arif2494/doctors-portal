import { useEffect, useState } from 'react';
import initializeFirebase from '../Pages/Login/Firebase/firebase.init';
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithPopup,
	GoogleAuthProvider,
	updateProfile,
	signOut
} from 'firebase/auth';

// initialize firebase
initializeFirebase();
const useFirebase = () => {
	const [ user, setUser ] = useState({});
	const [ isLoading, setIsLoading ] = useState(true);
	const [ authError, setAuthError ] = useState('');
	const auth = getAuth();
	const googleProvider = new GoogleAuthProvider();

	//Google sign in
	const googleSignIn = (location, history) => {
		setIsLoading(true);
		signInWithPopup(auth, googleProvider)
			.then((result) => {
				// const user = result.user;
				setAuthError('');
				const destination = location?.state?.from || '/';
				history.replace(destination);
			})
			.catch((error) => {
				// Handle Errors here.
				const errorMessage = error.message;
				setAuthError(errorMessage);
			})
			.finally(() => setIsLoading(false));
	};
	// register
	const registerUser = (email, password, name, location, history) => {
		setIsLoading(true);
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				setAuthError('');
				// Signed in
				// const user = userCredential.user;
				const newUser = { email, displayName: name };
				setUser(newUser);
				// send name to firebase
				updateProfile(auth.currentUser, { displayName: name })
					.then(() => {
						// Profile updated!
						// ...
					})
					.catch((error) => {
						// An error occurred
						// ...
					});
				const destination = location?.state?.from || '/';
				history.replace(destination);
			})
			.catch((error) => {
				const errorMessage = error.message;
				setAuthError(errorMessage);
			})
			.finally(() => setIsLoading(false));
	};

	// sign in
	const loginUser = (email, password, location, history) => {
		setIsLoading(true);
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				// const user = userCredential.user;
				const destination = location?.state?.from || '/';
				history.replace(destination);
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
		googleSignIn,
		registerUser,
		loginUser,
		logout
	};
};
export default useFirebase;
