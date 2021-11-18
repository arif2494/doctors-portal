import React from 'react';
import { LinearProgress } from '@mui/material';
import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const AdminRoute = ({ children, ...rest }) => {
	const { user, isLoading, admin } = useAuth();
	let location = useLocation();
	if (isLoading) {
		return <LinearProgress />;
	}
	if (user.email && admin) {
		return children;
	}
	return <Navigate to="/home" state={{ from: location }} />;
};

export default AdminRoute;
