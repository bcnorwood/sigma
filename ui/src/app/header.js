import React from 'react';

import Button from './button';

export default function Header() {
	const uploadHandler = () => {
		console.log('clicked upload');
		Object.assign(
			document.createElement('input'),
			{
				type: 'file',
				accept: 'image/*',
				multiple: true,
				oninput: ({ target: { files } }) => {
					const formData = new FormData;
					for (const file of files) {
					    formData.append('files[]', file);
					}

				    const xhr = new XMLHttpRequest;
					xhr.onload = () => console.log('uploaded');
					xhr.open('POST', 'upload');
					xhr.send(formData);
				}
			}
		).click()
	};

	return (
		<div id="header">
			<h1>
				<strong>sig</strong>ma
			</h1>
			<Button icon='upload' handler={ uploadHandler } />
		</div>
	);
}
