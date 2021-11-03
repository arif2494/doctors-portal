import React from 'react';
import Box from '@mui/material/Box';
import AppoinmentBanner from '../AppoinmentBanner/AppoinmentBanner';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';

const Home = () => {
	return (
		<Box>
			<Banner />
			<Services />
			<AppoinmentBanner />
		</Box>
	);
};

export default Home;
