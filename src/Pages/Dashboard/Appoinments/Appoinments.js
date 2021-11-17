import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
const Appoinments = ({ date }) => {
	const { user } = useAuth();
	const [ appoinments, setAppoinments ] = useState([]);
	const url = `http://localhost:5000/appointments?email=${user.email}&date=${date}`;
	useEffect(
		() => {
			fetch(url).then((res) => res.json()).then((data) => {
				setAppoinments(data);
			});
		},
		[ url ]
	);
	return (
		<div>
			<h2>
				Appoinments of {user.displayName} : {appoinments.length}
			</h2>

			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 300 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Time</TableCell>
							<TableCell>Service</TableCell>
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{appoinments.map((row) => (
							<TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell component="th" scope="row">
									{row.patientName}
								</TableCell>
								<TableCell>{row.time}</TableCell>
								<TableCell>{row.serviceName}</TableCell>
								<TableCell>
									{row.payment ? 'paid' : <Link to={`/dashboard/payment/${row._id}`}>Pay</Link>}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default Appoinments;
