import React from 'react';
import { LinearProgress } from '@mui/material';
import { Redirect, Route } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const AdminRoute = ({ children, ...rest }) => {
	const { user, isLoading, admin } = useAuth();
	if (isLoading) {
		return <LinearProgress />;
	}
	return (
		<Route
			{...rest}
			render={({ location }) =>
				user.email && admin ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/',
							state: { from: location }
						}}
					/>
				)}
		/>
	);
};

export default AdminRoute;
