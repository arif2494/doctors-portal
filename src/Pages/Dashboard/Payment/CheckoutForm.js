import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAuth from '../../../hooks/useAuth';
import { CircularProgress } from '@mui/material';

const CheckoutForm = ({ appointment }) => {
	const { price, patientName, _id } = appointment;
	const { user } = useAuth();
	const stripe = useStripe();
	const elements = useElements();
	const [ error, setError ] = useState('');
	const [ success, setSuccess ] = useState('');
	const [ processing, setProcessing ] = useState(false);
	const [ clientSecret, setClientSecret ] = useState('');
	useEffect(
		() => {
			fetch('http://localhost:5000/create-payment-intent', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					price
				})
			})
				.then((res) => res.json())
				.then((data) => setClientSecret(data));
		},
		[ price ]
	);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!stripe || !elements) {
			// Stripe.js has not loaded yet. Make sure to disable
			// form submission until Stripe.js has loaded.
			return;
		}
		const card = elements.getElement(CardElement);

		if (card == null) {
			return;
		}

		setProcessing(true);

		// Use your card Element with other Stripe.js APIs
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card
		});

		if (error) {
			setError(error.message);
			setSuccess('');
		} else {
			setError('');
			console.log('[PaymentMethod]', paymentMethod);
		}
		// payment intent
		const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(clientSecret.clientSecret, {
			payment_method: {
				card: card,
				billing_details: {
					name: patientName,
					email: user.email
				}
			}
		});
		if (intentError) {
			setError(intentError.message, 'INTENT');
			setSuccess('');
		} else {
			setError('');
			setSuccess('payment success');
			console.log('[PaymentIntent]', paymentIntent);
			setProcessing(false);
			// save to db
			const payment = {
				amount: paymentIntent.amount,
				transaction: paymentIntent.client_secret.slice('_secret')[0],
				created: paymentIntent.created
			};
			const url = `http://localhost:5000/appointments/${_id}`;
			fetch(url, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payment)
			})
				.then((res) => res.json())
				.then((data) => console.log(data));
		}
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<CardElement
					options={{
						style: {
							base: {
								fontSize: '16px',
								color: '#424770',
								'::placeholder': {
									color: '#aab7c4'
								}
							},
							invalid: {
								color: '#9e2146'
							}
						}
					}}
				/>
				{processing ? (
					<CircularProgress />
				) : (
					<button type="submit" disabled={!stripe || success}>
						Pay ${price}
					</button>
				)}
			</form>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			{success && <p style={{ color: 'green' }}>{success}</p>}
		</div>
	);
};

export default CheckoutForm;
