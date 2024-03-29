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
	getIdToken,
	signOut
} from 'firebase/auth';


// initialize firebase
initializeFirebase();
const useFirebase = () => {
	const [ user, setUser ] = useState({});
	const [ isLoading, setIsLoading ] = useState(true);
	const [ authError, setAuthError ] = useState('');
	const [admin, setAdmin] = useState(false);
	const [token, setToken] = useState('');
	const auth = getAuth();
	const googleProvider = new GoogleAuthProvider();
	const adminEmail = 'honda@car.com';
	//Google sign in
	const googleSignIn = (location, navigate) => {
		setIsLoading(true);
		signInWithPopup(auth, googleProvider)
			.then((result) => {
				const { user } = result;
				// save user data to db
				saveUser(user.email, user.displayName,'PUT')
				// const user = result.user;
				setAuthError('');
				const destination = location?.state?.from || '/';
				navigate(destination);
			})
			.catch((error) => {
				// Handle Errors here.
				const errorMessage = error.message;
				setAuthError(errorMessage);
			})
			.finally(() => setIsLoading(false));
	};
	// register
	const registerUser = (email, password, name, location, navigate) => {
		setIsLoading(true);
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// save user to db
				saveUser(email, name, 'POST');
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
				navigate(destination);
			})
			.catch((error) => {
				const errorMessage = error.message;
				setAuthError(errorMessage);
			})
			.finally(() => setIsLoading(false));
	};

	// sign in
	const loginUser = (email, password, location, navigate) => {
		setIsLoading(true);
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				// const user = userCredential.user;
				const destination = location?.state?.from || '/';
				navigate(destination);
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
					// get user token
					getIdToken(user)
					.then(idToken => {
						setToken(idToken);
					})
					
				} else {
					setUser({});
				}
				setIsLoading(false);
			});
			return () => unsubscribe;
		},
		[ auth ]
	);
	

	const url =`http://localhost:5000/users/${user.email || adminEmail} `
	// check if admin
		useEffect(() => {	
		fetch(url)
		.then(res => res.json())
		.then(data => {
			setAdmin(data.isAdmin);
		})
	} , [url])
	

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
	const saveUser = (email, displayName, method) => {
		const user={email, displayName};
		fetch('http://localhost:5000/users',{
			method: method,
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(user)
		}).then(res => res.json())
		.then(data => {
			// if(data.insertedId){
			// 	alert('User created successfully');
			// }
		})
	}
	return {
		isLoading,
		admin,
		token,
		user,
		authError,
		googleSignIn,
		registerUser,
		loginUser,
		logout
	};
};
export default useFirebase;
