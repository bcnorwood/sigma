import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { zoom as ZoomIcon } from '~/icons';

function Thumbnail({ image, isLink, zoom, ...props }) {
	let el;

	// if no image provided, return an empty div
	if (image) {
		// currently displayed image links to zoomed view
		const target = zoom ? `/view/${image}/zoom` : `/view/${image}`;
		const src = `url("https://bcnorwood-sigma.s3-us-west-2.amazonaws.com/${image}")`;

		el = (
			<Link to={target} style={{ backgroundImage: src }}>
				{zoom ? <ZoomIcon /> : undefined }
			</Link>
		);
	}

	return <div className="thumbnail" {...props}>{el}</div>
};

export default function Preview({ images }) {
	let curIndex = 0;
	let prev = null;
	let cur  = null;
	let next = null;

	// get the image UUID from the route, if any
	const match = useRouteMatch('/view/:image');

	// find index of UUID, if specified
	if (match) {
		curIndex = Math.max(images.indexOf(match.params.image), 0);

		// set previous image UUID, if applicable
		if (curIndex > 0) {
			prev = images[curIndex - 1];
		}
	}

	// set current image UUID, specified or not
	if (curIndex < images.length) {
		cur = images[curIndex];

		// set next image UUID, if applicable
		if (curIndex + 1 < images.length) {
			next = images[curIndex + 1];
		}
	}

	return (
		<div id="preview">
			<Thumbnail id="prev" image={prev} />
			<Thumbnail id="cur"  image={cur} zoom />
			<Thumbnail id="next" image={next} />
		</div>
	);
};
