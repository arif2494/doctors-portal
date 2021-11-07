import React from 'react';
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
const BookingModal = ({ openBooking, handleBookingClose, booking, date }) => {
	const { name, time } = booking;
	const { user } = useAuth();
	const handleBookSubmit = (e) => {
		e.preventDefault();
		// collect data from form and send server
		handleBookingClose();
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
							id="standard-size-small"
							size="small"
							variant="standard"
						/>
						<TextField
							label="Email"
							sx={{ width: '100%', mr: 2, mb: 2 }}
							defaultValue={user.email}
							id="standard-size-small"
							size="small"
							variant="standard"
						/>
						<TextField
							sx={{ width: '100%', mr: 2, mb: 2 }}
							label="Phone"
							defaultValue=""
							id="standard-size-small"
							size="small"
							variant="standard"
						/>
						<TextField
							disabled
							sx={{ width: '100%', mr: 2, mb: 2 }}
							label="Phone"
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
