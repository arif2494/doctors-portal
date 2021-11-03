import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import chair from '../../../images/chair.png';
import bg from '../../../images/bg.png';
import { Button, Container, Typography } from '@mui/material';
const Banner = () => {
	const bannerBg = {
		backgroundImage: `url(${bg})`
	};
	const verticalAlign = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: 700
	};

	return (
		<Box style={bannerBg} sx={{ mt: 2 }}>
			<Container maxWidth="xl">
				<Box sx={{ flexGrow: 1 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={5} style={verticalAlign}>
							<Box>
								<Typography variant="h3" component="h3" gutterBottom>
									Your New Smile <br />
									Start Here
								</Typography>
								<Typography
									variant="body1"
									component="p"
									gutterBottom
									sx={{ my: 3 }}
									color="text.secondary"
								>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus ullam maxime
									quisquam architecto aperiam ea.
								</Typography>
								<Button variant="contained" sx={{ backgroundColor: '#58DFE6' }}>
									GET APPOINMENT
								</Button>
							</Box>
						</Grid>
						<Grid item xs={12} md={7} style={verticalAlign}>
							<img style={{ width: 600 }} src={chair} alt="!" />
						</Grid>
					</Grid>
				</Box>
			</Container>
		</Box>
	);
};

export default Banner;
