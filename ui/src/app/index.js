import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import Header from './header';
import Preview from './preview';
// import Toolbar from './toolbar';

const Toolbar = () => <div />

export default function App({ images, selected }) {
	const selectedIndex = images.findIndex(({ id }) => id === selected);

	const visibleImages = {
		prev: selectedIndex ? images[selectedIndex - 1] : null,
		cur: images[selectedIndex],
		next: selectedIndex < images.length - 1 ? images[selectedIndex + 1] : null
	};

	return (
		<Fragment>
			<Header />
			<Preview {...visibleImages} />
			<Toolbar {...visibleImages} />
		</Fragment>
	);
};
