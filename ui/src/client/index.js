import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from '/app';

hydrate(
	<BrowserRouter>
		<App initImages={__IMAGES__} />
	</BrowserRouter>,
	document.getElementById('app')
);
