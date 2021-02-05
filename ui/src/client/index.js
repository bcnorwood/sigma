import React from 'react';
import { hydrate } from 'react-dom';

import App from '/app';

hydrate(<App images={ __IMAGES__ } />, document.getElementById('app'));
