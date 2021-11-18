import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AuthProvider from './context/AuthProvider/AuthProvider';
import Appointment from './Pages/Appointment/Appointment/Appointment';
import AddAdmin from './Pages/Dashboard/AddAdmin/AddAdmin';
import AddDoctor from './Pages/Dashboard/AddDoctor/AddDoctor';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import DashboardHome from './Pages/Dashboard/DashboardHome/DashboardHome';
import Payment from './Pages/Dashboard/Payment/Payment';
import Home from './Pages/Home/Home/Home';
import AdminRoute from './Pages/Login/AdminRoute/AdminRoute';
import Login from './Pages/Login/Login/Login';
import PrivateRoute from './Pages/Login/PrivateRoute/PrivateRoute';
import Register from './Pages/Login/Register/Register';

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					{/* private route */}
					<Route
						path="/appointment"
						element={
							<PrivateRoute>
								<Appointment />
							</PrivateRoute>
						}
					/>
					{/* nested route */}
					<Route
						path="/dashboard"
						element={
							<PrivateRoute>
								<Dashboard />
							</PrivateRoute>
						}
					>
						<Route exact path="/dashboard" element={<DashboardHome />} />
						<Route path={`/dashboard/payment/:id`} element={<Payment />} />
						<Route
							path={`/dashboard/addAdmin`}
							element={
								<AdminRoute>
									<AddAdmin />
								</AdminRoute>
							}
						/>
						<Route
							path={`/dashboard/addDoctor`}
							element={
								<AdminRoute>
									<AddDoctor />
								</AdminRoute>
							}
						/>
					</Route>
					{/* default route */}
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
