import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { zoom as ZoomIcon } from '~/icons';

function Thumbnail({ image, isLink, zoom, ...props }) {
	let el;

	if (image) {
		const target = zoom ? `/view/${image}/zoom` : `/view/${image}`;
		const src = `url("https://bcnorwood-sigma.s3-us-west-2.amazonaws.com/${image}")`;

		el = <Link to={target} style={{ backgroundImage: src }}>
			{zoom ? <ZoomIcon /> : undefined }
		</Link>;
	}

	return <div className="thumbnail" {...props}>{el}</div>
};

export default function Preview({ images }) {
	let curIndex = 0;
	let prev = null;
	let cur  = null;
	let next = null;

	const match = useRouteMatch('/view/:image');

	if (match) {
		curIndex = Math.max(images.indexOf(match.params.image), 0);

		if (curIndex > 0) {
			prev = images[curIndex - 1];
		}
	}

	if (curIndex < images.length) {
		cur = images[curIndex];

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
