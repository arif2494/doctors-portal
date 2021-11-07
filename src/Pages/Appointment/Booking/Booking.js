import React from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import BookingModal from '../BookingModal/BookingModal';

const Booking = ({ booking ,date,setAppoinmentSuccess}) => {
	const { name, time, space } = booking;
	const horizentalAlign = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	};
	const [ openBooking, setOpenBooking ] = React.useState(false);
	const handleBookingOpen = () => setOpenBooking(true);
	const handleBookingClose = () => setOpenBooking(false);
	return (
		<>
		<Grid item xs={12} sm={6} md={4}>
			<Paper style={horizentalAlign}>
				<Typography
					variant="h5"
					mt={2}
					sx={{
						color: '#58DFE6',
						fontWeight: 600
					}}
				>
					{name}
				</Typography>
				<Typography variant="h6" gutterBottom>
					{time}
				</Typography>
				<Typography variant="body1" gutterBottom>
					Space Available : {space}
				</Typography>
				<Button onClick={handleBookingOpen} variant="contained" sx={{ backgroundColor: '#58DFE6', marginBottom: '15px' }}>
					Booking
				</Button>
			</Paper>
		</Grid>

{/* modal */}
		<BookingModal
		booking={booking}
			openBooking={openBooking}
			handleBookingClose={handleBookingClose}
			date={date}
			setAppoinmentSuccess={setAppoinmentSuccess}
		></BookingModal>
		</>
	);
};

export default Booking;
