import Buffer from 'buffer';
import { readFileSync as file } from 'fs';
import { promisify } from 'util';
import zlib from 'zlib';

import fetch from 'node-fetch';
import React from 'react';
import { renderToString as dehydrate } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';

import App from '/app';

// enable async/await for brotli compression
const compress = promisify(zlib.brotliCompress);

// main Lambda handler
export async function handler({ pathParameters: { route } }) {
	try {
		// get list of images from API and pass to client with inline JS
		const images = await (await fetch('https://yn0zm5i2i3.execute-api.us-west-2.amazonaws.com/v1/images')).json();
		const initData = `
			__IMAGES__ = ${JSON.stringify(images)};
			document.getElementById('init-data').remove();
		`;

		// render React DOM to HTML string
		const html = dehydrate(
			<html>
				<head>
					<meta charSet="utf-8" />
					<title>SIGma - Serverless Image Gallery</title>
					<link rel="icon" href="data:," />
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" />
					<style dangerouslySetInnerHTML={{ __html: file('styles.css', 'utf-8') }} />
					<script id="init-data" dangerouslySetInnerHTML={{ __html: initData }} />
				</head>
				<body>
					<div id="app">
						<Router location={{ pathname: `/${route}` }}>
							<App initImages={images} />
						</Router>
					</div>
					<script dangerouslySetInnerHTML={{ __html: file('client.js', 'utf-8') }} />
				</body>
			</html>
		);

		// compress with brotli and encode in base64 for API Gateway
		const encoded = (await compress(html,
			{ params: {
				[zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
				[zlib.constants.BROTLI_PARAM_SIZE_HINT]: html.length
			} }
		)).toString('base64');

		// return encoded body with appropriate headers and base64 flag for API Gateway
		return {
			statusCode: 200,
			headers: { 'Content-Type': 'text/html', 'Content-Encoding': 'br' },
			body: encoded,
			isBase64Encoded: true
		};
	} catch (error) {
		// return 500 with stack trace
		return {
			statusCode: 500,
			headers: { 'Content-Type': 'text/plain; charset=utf-8' },
			body: error.stack
		};
	}
};
