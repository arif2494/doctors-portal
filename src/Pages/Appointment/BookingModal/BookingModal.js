import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4
};
const BookingModal = ({ openBooking, handleBookingClose, booking, date, setAppoinmentSuccess }) => {
	const { name, time, price } = booking;
	const { user } = useAuth();
	const initialState = { patientName: user.displayName, patientEmail: user.email, patientPhone: '' };
	const [ bookingData, setBookingData ] = useState(initialState);
	const handleOnBlur = (e) => {
		const fieldName = e.target.name;
		const fieldValue = e.target.value;
		const newBookingData = { ...bookingData };
		newBookingData[fieldName] = fieldValue;
		setBookingData(newBookingData);
	};
	const handleBookSubmit = (e) => {
		e.preventDefault();
		// collect data from form and send server
		const appointment = {
			...bookingData,
			time,
			price,
			serviceName: name,
			date: date.toLocaleDateString()
		};
		// send data to server
		fetch('http://localhost:5000/appointments', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(appointment)
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.insertedId) {
					handleBookingClose();
					setAppoinmentSuccess(true);
				}
			});
	};
	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			open={openBooking}
			onClose={handleBookingClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500
			}}
		>
			<Fade in={openBooking}>
				<Box sx={style}>
					<Typography id="transition-modal-title" variant="h6" component="h2">
						{name}
					</Typography>
					<form onSubmit={handleBookSubmit}>
						<TextField
							disabled
							label="Time"
							sx={{ width: '100%', mr: 2, mb: 2 }}
							defaultValue={time}
							id="standard-size-small"
							size="small"
							variant="standard"
						/>
						<TextField
							label="Name"
							sx={{ width: '100%', mr: 2, mb: 2 }}
							defaultValue={user.displayName}
							name="patientName"
							onBlur={handleOnBlur}
							id="standard-size-small"
							size="small"
							variant="standard"
						/>
						<TextField
							label="Email"
							sx={{ width: '100%', mr: 2, mb: 2 }}
							defaultValue={user.email}
							name="patientEmail"
							onBlur={handleOnBlur}
							id="standard-size-small"
							size="small"
							variant="standard"
						/>
						<TextField
							sx={{ width: '100%', mr: 2, mb: 2 }}
							label="Phone"
							name="patientPhone"
							onBlur={handleOnBlur}
							defaultValue=""
							id="standard-size-small"
							size="small"
							variant="standard"
						/>
						<TextField
							disabled
							sx={{ width: '100%', mr: 2, mb: 2 }}
							label="Date"
							defaultValue={date.toDateString()}
							id="standard-size-small"
							size="small"
							variant="standard"
						/>
						<Button sx={{ display: 'block', width: '100%' }} type="submit" variant="contained" size="small">
							Book
						</Button>
					</form>
				</Box>
			</Fade>
		</Modal>
	);
};

export default BookingModal;
