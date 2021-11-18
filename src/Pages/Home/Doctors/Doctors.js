import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import Doctor from '../Doctor/Doctor';

const Doctors = () => {
	const [ doctors, setDoctors ] = useState([]);
	console.log(doctors);
	useEffect(() => {
		fetch('http://localhost:5000/doctors').then((res) => res.json()).then((data) => setDoctors(data));
	}, []);
	return (
		<div>
			<h2 style={{ textAlign: 'center' }}>Our Docotrs: {doctors.length}</h2>
			<Container>
				<Grid container spacing={3}>
					{doctors.map((doctor) => <Doctor key={doctor._id} doctor={doctor} />)}
				</Grid>
			</Container>
		</div>
	);
};

export default Doctors;
