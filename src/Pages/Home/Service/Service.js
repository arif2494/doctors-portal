import React from 'react';
import { CardMedia, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
const Service = (props) => {
	const { name, description, img } = props.service;
	return (
		<Grid item xs={4} sm={4} md={4}>
			<Card sx={{ minWidth: 275, border: 0, boxShadow: 0, textAlign: 'center' }}>
				<CardMedia
					component="img"
					style={{ width: 'auto', height: '80px', margin: '0 auto' }}
					image={img}
					alt="Paella dish"
				/>
				<CardContent>
					<Typography variant="h5" component="div" mb={2}>
						{name}
					</Typography>

					<Typography variant="body2" color="text.secondary" sx={{ fontSize: 18 }}>
						{description}
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default Service;
