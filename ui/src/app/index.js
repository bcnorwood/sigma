import React, { Fragment, useState } from 'react';
import { Route } from 'react-router-dom';

import Header from './header';
import Preview from './preview';
import Zoom from './zoom';

export default function App({ initImages }) {
	// enable React state to track current list of images
	const [images, setImages] = useState(initImages);

	return (
		<Fragment>
			<Header addImages={(newImages) => setImages(images.concat(newImages))} />
			<Preview images={images} />
			<Route path="/view/:image/zoom">
				<Zoom />
			</Route>
		</Fragment>
	);
};
