import React from 'react';

import * as Icons from '~/icons';

export default function Button({ handler, icon = null, text = null }) {
	const Icon = Icons[icon];

	return (
		<button onClick={handler}>
			<Icon />
			{ text || undefined }
		</button>
	);
}
