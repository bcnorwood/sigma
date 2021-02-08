import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from '/app';

// initialize client-side React App with pre-rendered HTML and static data
hydrate(
	<BrowserRouter>
		<App initImages={__IMAGES__} />
	</BrowserRouter>,
	document.getElementById('app')
);
