import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { close as CloseIcon } from '~/icons';

export default function Zoom() {
	const { image } = useParams();
	return (
		<div id="zoom">
			<img src={`https://bcnorwood-sigma.s3-us-west-2.amazonaws.com/${image}`} />
			<Link id="close" to={`/view/${image}`}><CloseIcon /></Link>
		</div>
	);
};
