import React from 'react';

import Icons from '~/icons';

export default function Button({ handler, icon = null, text = null }) {
	const Icon = Icons[icon] || (() => {});

	return (
		<button onClick={handler}>
			<Icon width={30} height={30} />
			{ text || undefined }
		</button>
	);
}
