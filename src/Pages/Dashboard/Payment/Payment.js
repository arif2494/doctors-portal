import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
	'pk_test_51JwfQBD7wJVjMW6j52kb4p2uPr4vJ1lUQHwjWXweeZ6oqE3bV2PBFBIpS6zaMXjmeMNYCOuUIfaA1pL29WPnYi0U00me35rzir'
);

const Payment = () => {
	const { id } = useParams();
	const [ appointment, setAppointmet ] = useState({});
	useEffect(
		() => {
			fetch(`http://localhost:5000/appointments/${id}`)
				.then((res) => res.json())
				.then((data) => setAppointmet(data));
		},
		[ id ]
	);
	return (
		<div>
			<h2>
				Pay for: {appointment.patientName} for {appointment.serviceName}
			</h2>
			<h4>Pay: ${appointment.price}</h4>
			{/* stripe */}
		{appointment?.price &&	<Elements stripe={stripePromise}>
				<CheckoutForm appointment={appointment} />
			</Elements>}
		</div>
	);
};

export default Payment;
