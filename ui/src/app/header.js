import React from 'react';

import Button from './button';

export default function Header({ addImages }) {
	const uploadHandler = () => {
		// create and configure a temporary file input
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';
		input.multiple = true;

		// add handler to file upload dialog
		input.addEventListener('input', () => {
			// build request data from selected files
			const formData = new FormData;
			for (const file of input.files) {
			    formData.append('files[]', file);
			}

			// open AJAX connection
		    const xhr = new XMLHttpRequest;
			xhr.open('POST', '/upload');

			// add response handler (return new image UUIDs to parent)
			xhr.responseType = 'json';
			xhr.addEventListener('load', () => {
				addImages(xhr.response);
			});

			// send request
			xhr.send(formData);
		});

		// simulate click event on file input to show dialog
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
