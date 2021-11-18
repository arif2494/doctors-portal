import React, { useState } from 'react';
import { Button, Input, TextField } from '@mui/material';
const AddDoctor = () => {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ image, setImage ] = useState(null);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!image) {
			alert('Please select an image');
			return;
		}
		const formData = new FormData();
		formData.append('name', name);
		formData.append('email', email);
		formData.append('image', image);
		fetch('http://localhost:5000/doctors', {
			method: 'POST',
			body: formData
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.insertedId) {
					alert('Doctor added successfully');
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<div>
			<h2>Add Doctor</h2>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<form
					onSubmit={handleSubmit}
					style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
				>
					<TextField
						sx={{ width: '400px', marginBottom: '20px' }}
						required
						type="text"
						label="Name"
						onChange={(e) => setName(e.target.value)}
						variant="standard"
					/>
					<TextField
						sx={{ width: '400px', marginBottom: '20px' }}
						required
						type="email"
						label="Email"
						onChange={(e) => setEmail(e.target.value)}
						variant="standard"
					/>
					<Input accept="image/*" type="file" onChange={(e) => setImage(e.target.files[0])} />
					<br />
					<Button variant="contained" type="submit">
						Add Doctor
					</Button>
				</form>
			</div>
		</div>
	);
};

export default AddDoctor;
