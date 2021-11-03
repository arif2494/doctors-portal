import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import Service from '../Service/Service';
import fluoride from '../../../images/fluoride.png';
import cavity from '../../../images/cavity.png';
import whitening from '../../../images/whitening.png';
const Services = () => {
	const services = [
		{
			name: 'Fluoride TreatMent',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. A, odit officiis! In labore voluptatem, ex, cumque recusandae totam quisquam beatae accusantium ipsum perferendis ab optio cum voluptas.',
			img: fluoride
		},
		{
			name: 'Cavity Filling',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. A, odit officiis! In labore voluptatem, ex, cumque recusandae totam quisquam beatae accusantium ipsum perferendis ab optio cum voluptas.',
			img: cavity
		},
		{
			name: 'Teeth Whitening',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. A, odit officiis! In labore voluptatem, ex, cumque recusandae totam quisquam beatae accusantium ipsum perferendis ab optio cum voluptas.',
			img: whitening
		}
	];
	return (
		<div>
			<Box sx={{ flexGrow: 1 }}>
				<Container maxWidth="xl">
					<Typography
						variant="h5"
						component="h2"
						sx={{ textAlign: 'center', fontWeight: 'medium', color: 'primary.main', m: 2 }}
					>
						Our Services
					</Typography>
					<Typography variant="h3" component="h2" sx={{ textAlign: 'center', fontWeight: 'bold', m: 2 }}>
						Services We Provide
					</Typography>
					<Grid
						container
						style={{ marginTop: 24 }}
						spacing={{ xs: 2, md: 3 }}
						columns={{ xs: 4, sm: 8, md: 12 }}
					>
						{services.map((service) => <Service key={service.name} service={service} />)}
					</Grid>
				</Container>
			</Box>
		</div>
	);
};

export default Services;
