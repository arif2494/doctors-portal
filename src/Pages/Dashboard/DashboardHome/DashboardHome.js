import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import Calendar from '../../Shared/Calendar/Calendar';
import Appoinments from '../Appoinments/Appoinments';
const DashboardHome = () => {
	const [ date, setDate ] = useState(new Date());
	return (
		<Box>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<Calendar date={date} setDate={setDate} />
				</Grid>
				<Grid item xs={12} md={6}>
					<Appoinments date={date} />
				</Grid>
			</Grid>
		</Box>
	);
};

export default DashboardHome;
