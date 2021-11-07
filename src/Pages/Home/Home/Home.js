import React from 'react';
import Box from '@mui/material/Box';
import AppoinmentBanner from '../AppoinmentBanner/AppoinmentBanner';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import Navigation from '../../Shared/Navigation/Navigation';

const Home = () => {
	return (
		<Box>
			<Navigation />
			<Banner />
			<Services />
			<AppoinmentBanner />
		</Box>
	);
};

export default Home;
