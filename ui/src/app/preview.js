import React from 'react';

const PreviewImage = ({ image, children, ...props }) => (
	<div style={image ? { backgroundImage: `url("https://bcnorwood-sigma.s3-us-west-2.amazonaws.com/${image}")` } : undefined} {...props}>
		{children}
	</div>
);

export default function Preview({ prev, cur, next }) {


	return (
		<div id="preview">
			<PreviewImage id="prev" image={prev} />
			<PreviewImage id="cur"  image={cur}  />
			<PreviewImage id="next" image={next} />
		</div>
	);
};
