import React from 'react';

import Button from './button';

export default function Header({ addImages }) {
	const uploadHandler = () => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';
		input.multiple = true;

		input.addEventListener('input', () => {
			const formData = new FormData;
			for (const file of input.files) {
			    formData.append('files[]', file);
			}

		    const xhr = new XMLHttpRequest;
			xhr.open('POST', '/upload');

			xhr.responseType = 'json';
			xhr.addEventListener('load', () => {
				addImages(xhr.response);
			});

			xhr.send(formData);
		});

		input.click();
	};

	return (
		<div id="header">
			<h1>
				<strong>SIG</strong>ma
			</h1>
			<Button icon="upload" handler={uploadHandler} />
		</div>
	);
}
