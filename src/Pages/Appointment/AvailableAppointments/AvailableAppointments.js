import React from 'react';

const AvailableAppointments = ({ date }) => {
	return (
		<div>
			<h2>THis is AvailableAppointments {date.toDateString()}</h2>
		</div>
	);
};

export default AvailableAppointments;
