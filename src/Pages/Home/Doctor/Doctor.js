import React from 'react';
import { Grid } from '@mui/material';

const Doctor = ({ doctor }) => {
	const { name, image } = doctor;
	return (
		<Grid item xs={12} sm={6} md={4} lg={4}>
			<img style={{ width: '200px' }} src={`data:image/jpeg;base64,${image}`} alt="!" />
			<h3>{name}</h3>
		</Grid>
	);
};

export default Doctor;
