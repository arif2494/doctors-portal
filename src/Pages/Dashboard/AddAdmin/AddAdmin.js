import React, { useState } from 'react';
import { Alert, Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

const AddAdmin = () => {
	const [ email, setEmail ] = useState('');
	const [ success, setSuccess ] = useState(false);
	const handleOnBlue = (e) => {
		setEmail(e.target.value);
		setSuccess(false);
	};
	const handleAdminSubmit = (e) => {
		e.preventDefault();
		const user = { email };
		fetch('http://localhost:5000/users/admin', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.modifiedCount === 1) {
					setSuccess(true);
				} else if (data.matchedCount === 1) {
					alert('Admin already exists');
				} else {
					alert('Make sure user loggen in once to this site');
				}
			});
	};
	return (
		<div>
			<h2>Add an Admin</h2>
			<Typography variant="h6" sx={{ color: 'orangered' }}>
				Note: The user you try to add must be logged in once in your website
			</Typography>
			{success && <Alert severity="success">Admin added successfully</Alert>}
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<form onSubmit={handleAdminSubmit}>
					<TextField
						sx={{ width: '100%', marginBottom: '10px', marginTop: '10px' }}
						label="Email"
						type="email"
						onBlur={handleOnBlue}
						variant="standard"
					/>
					<Button type="submit" variant="contained" color="primary">
						Make Admin
					</Button>
				</form>
			</Box>
		</div>
	);
};

export default AddAdmin;
