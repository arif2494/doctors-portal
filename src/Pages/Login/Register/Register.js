import React from 'react';
import { useState } from 'react';
import { Container, Grid, Box, Typography, TextField, Button, CircularProgress, Alert } from '@mui/material';

import login from '../../../images/login.png';
import { NavLink,useLocation,useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Navigation from '../../Shared/Navigation/Navigation';
const Register = () => {
	const {user, registerUser, isLoading, authError } = useAuth();
	const [  registerData, setRegisterData ] = useState({});
	const location = useLocation();
	const navigate = useNavigate();
	const handleOnBlur = (e) => {
		const fieldName = e.target.name;
		const fieldValue = e.target.value;
		const newLoginData = { ...registerData };
		newLoginData[fieldName] = fieldValue;
		setRegisterData(newLoginData);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (registerData.password !== registerData.password2) {
			alert('Passwords do not match');
			return;
		}
		registerUser(registerData.email, registerData.password, registerData.name, location, navigate);
	};
	return (
	<>
	<Navigation></Navigation>
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
							Register
						</Typography>
						{!isLoading && (
							<form onSubmit={handleSubmit}>
								<TextField
									sx={{ width: 1, m: 1 }}
									type="text"
									label="Name"
									variant="standard"
									name="name"
									onBlur={handleOnBlur}
								/>
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
								<TextField
									sx={{ width: 1, m: 1 }}
									type="password"
									label="Confirm Password"
									variant="standard"
									name="password2"
									onBlur={handleOnBlur}
								/>

								<Button type="submit" sx={{ width: 1, m: 1 }} variant="contained">
									Register
								</Button>
								<NavLink style={{ textDecoration: 'none' }} to="/login">
									<Button variant="text"> Already Register? Please Login</Button>
								</NavLink>
							</form>
						)}
						{isLoading && (
							<Box sx={{ display: 'flex' }}>
								<CircularProgress />
							</Box>
						)}
					</Box>
					{
						user?.email && <Alert severity="success">User Created Successfully!</Alert>

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
	</>
	);
};

export default Register;
