import React, { useState } from 'react';
import { Alert, Box, Container, Grid, Typography } from '@mui/material';
import Booking from '../Booking/Booking';

const AvailableAppointments = ({ date }) => {
	const [ appoinmentSuccess, setAppoinmentSuccess ] = useState(false);
	const bookings = [
		{
			id: 1,
			time: '8:00 AM - 9:00 AM',
			name: 'Tooth Orthodontics',
			price: 46,
			space: 10
		},
		{
			id: 2,
			time: '10:05 AM - 11:35 AM',
			name: 'Tooth Implants',
			price: 72,
			space: 8
		},
		{
			id: 3,
			time: '12:00 PM - 1:30 PM',
			name: 'Cavity Protection',
			price: 53,
			space: 7
		},
		{
			id: 4,
			time: '2:00 PM - 3:30 PM',
			name: 'Root Canal',
			price: 45,
			space: 6
		},
		{
			id: 5,
			time: '4:00 PM - 5:30 PM',
			name: 'Teeth Whitening',
			price: 39,
			space: 5
		},
		{
			id: 6,
			time: '6:00 PM - 7:30 PM',
			name: 'Teeth Cleaning',
			price: 25,
			space: 4
		}
	];
	return (
		<Container>
			<Box>
				<Typography
					variant="h4"
					component="h4"
					mt={4}
					sx={{ textAlign: 'center', fontWeight: 600, color: '#58DFE6' }}
				>
					Available Appointments on {date.toDateString()}
				</Typography>
				{appoinmentSuccess && <Alert severity="success">Book appoinment successfully</Alert>}
				<Grid container my={2} spacing={3}>
					{bookings.map((booking) => (
						<Booking
							key={booking.id}
							booking={booking}
							date={date}
							setAppoinmentSuccess={setAppoinmentSuccess}
						/>
					))}
				</Grid>
			</Box>
		</Container>
	);
};

export default AvailableAppointments;
