import React, { useState } from 'react';
import { Container, Grid, Box, Typography, TextField, Button, CircularProgress, Alert } from '@mui/material';
import login from '../../../images/login.png';
import { NavLink,useLocation,useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
const Login = () => {
	const { user, loginUser,googleSignIn, authError, isLoading } = useAuth();
	const [ loginData, setLoginData ] = useState({});
	const location = useLocation();
	const history = useHistory();
	const handleOnBlur = (e) => {
		const fieldName = e.target.name;
		const fieldValue = e.target.value;
		const newLoginData = { ...loginData };
		newLoginData[fieldName] = fieldValue;
		setLoginData(newLoginData);
	};
	const handleSubmit = (e) => {
		loginUser(loginData.email, loginData.password, location, history);
		e.preventDefault();

	};
	const handleGoogleSignIn = () => {
		googleSignIn(location, history);
	}
	return (
		<Container maxWidth="xl">
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<Box
						sx={{
							mt: 16,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'column'
						}}
					>
						<Typography sx={{ textAlign: 'center' }} variant="body1" gutterBottom>
							Login
						</Typography>
					{!isLoading &&	<form onSubmit={handleSubmit}>
							<TextField
								sx={{ width: 1, m: 1 }}
								type="email"
								label="Email"
								variant="standard"
								name="email"
								onBlur={handleOnBlur}
							/>
							<TextField
								sx={{ width: 1, m: 1 }}
								type="password"
								label="Password"
								variant="standard"
								name="password"
								onBlur={handleOnBlur}
							/>

							<Button type="submit" sx={{ width: 1, m: 1 }} variant="contained">
								Login
							</Button>
							<NavLink style={{ textDecoration: 'none' }} to="/register">
								<Button variant="text"> New User? Please Register</Button>
							</NavLink>
						</form>}
						<p>---------------------------------------</p>
						<Button onClick={handleGoogleSignIn} variant="contained"> Google Sign in</Button>
							{isLoading && (
							<Box sx={{ display: 'flex' }}>
								<CircularProgress />
							</Box>
						)}
					</Box>
						{
						user?.email && <Alert severity="success">User Loggedin Successfully!</Alert>

					}
					{
						authError && <Alert severity="error">{authError}</Alert>
					}
				</Grid>
				<Grid item xs={12} md={6}>
					<img style={{ width: '100%' }} src={login} alt="!" />
				</Grid>
			</Grid>
		</Container>
	);
};

export default Login;
