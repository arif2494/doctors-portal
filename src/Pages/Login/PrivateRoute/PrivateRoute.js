import React from 'react';
import { LinearProgress } from '@mui/material';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
	const { user, isLoading } = useAuth();
	let location = useLocation();
	if (isLoading) {
		return <LinearProgress />;
	}
	if (user.email) {
		return children;
	}
	return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
