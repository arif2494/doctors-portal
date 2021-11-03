import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import doctor from '../../../images/doctor.png';
import bg from '../../../images/appointment-bg.png';
import { Button, Container, Typography } from '@mui/material';
const AppoinmentBanner = () => {
	const appointmentBanner = {
		backgroundImage: `url(${bg})`,
		marginTop: '150px',
		backgroundColor: 'rgba(45, 58, 74, 0.85)',
		backgroundBlendMode: 'darken, luminosity'
	};
	return (
		<Container maxWidth="xl">
			<Box style={appointmentBanner} sx={{ flexGrow: 1 }}>
				<Grid container spacing={2}>
					<Grid item xs={12} md={5}>
						<img src={doctor} style={{ width: 400, marginTop: '-110px' }} alt="!" />
					</Grid>
					<Grid
						item
						xs={12}
						md={7}
						sx={{
							display: 'flex',
							justifyContent: 'flex-start',
							alignItems: 'center',
							textAlign: 'left'
						}}
					>
						<Box>
							<Typography variant="h6" sx={{ mb: 4 }} style={{ color: '#58DFE6' }}>
								Appointment
							</Typography>
							<Typography variant="h4" sx={{ color: 'white' }}>
								Make an Appointment Today
							</Typography>
							<Typography
								variant="h6"
								sx={{ mt: 5, mb: 3, mr: 4, color: 'white', fontSize: 18, fontWeight: 300 }}
							>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut ullam quaerat eum sed
								obcaecati mollitia animi at vitae rem unde!
							</Typography>
							<Button variant="contained" sx={{ backgroundColor: '#58DFE6' }}>
								Learn More
							</Button>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
};

export default AppoinmentBanner;
