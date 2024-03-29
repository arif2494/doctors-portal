import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import useAuth from '../../../hooks/useAuth';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
// for nested route
import { Outlet, Link } from 'react-router-dom';

const Dashboard = (props) => {
	const { admin } = useAuth();
	const drawerWidth = 240;
	const { window } = props;
	const [ mobileOpen, setMobileOpen ] = useState(false);
	//nesting route
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div>
			<Toolbar />
			<Divider />
			<Link
				style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', marginTop: '20px' }}
				to="/appointment"
			>
				<Button variant="text" color="inherit">
					Make an Appointment
				</Button>
			</Link>
			<Link
				style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', marginTop: '20px' }}
				to="/dashboard"
			>
				<Button variant="text" color="inherit">
					Dashboard
				</Button>
			</Link>
			{admin && (
				<Link
					style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', marginTop: '20px' }}
					to={`/dashboard/addAdmin`}
				>
					<Button variant="text" color="inherit">
						Make Admin
					</Button>
				</Link>
			)}
			{admin && (
				<Link
					style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', marginTop: '20px' }}
					to={`/dashboard/addDoctor`}
				>
					<Button variant="text" color="inherit">
						Add Doctor
					</Button>
				</Link>
			)}

			<List>
				{[ 'Inbox', 'Starred', 'Send email', 'Drafts' ].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	const container = window !== undefined ? () => window().document.body : undefined;
	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` }
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Dashboard
					</Typography>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders"
			>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: 'none', sm: 'block' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
				<Toolbar />
				{/* NESTED ROUTES */}
				<Outlet />
			</Box>
		</Box>
	);
};
export default Dashboard;
