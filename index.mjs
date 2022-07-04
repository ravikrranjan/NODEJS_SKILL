/**
 * Primary file for API
 *
 * @auth Ravi Ranjan
 * @Date July-22
 */

//Dependencies

import http from "http";

import { StringDecoder } from "string_decoder";
import url from "url";

import config from "./config.mjs";

console.log("config", config);

// The server should res;ond to all requests with a string

const server = http.createServer((request, response) => {
	// Get the URL and parse it

	const parsedUrl = url.parse(request.url, true);

	// Get the path
	const path = parsedUrl.pathname;
	const trimmedPath = path.replace(/^\/+|\/+$/g, "");

	// Get the query string as an object

	const queryStringObject = parsedUrl.query;

	// Get the query  string as an object
	const method = request.method.toLowerCase();

	// Get the heder as an object
	const headers = request.headers;

	// Get the payload, if any
	const decoder = new StringDecoder("utf-8");
	let buffer = "";
	request.on("data", (chunk) => {
		buffer += decoder.write(chunk);
	});

	request.on("end", () => {
		buffer += decoder.end();

		// Choose the handlers this request should got to. If one is not exists

		const chosenHandler = typeof router[trimmedPath] !== "undefined" ? router[trimmedPath] : handlers.notFound;

		// Construct the data object to send the handler
		const data = {
			trimmedPath,
			queryStringObject,
			method,
			headers,
			payload: buffer,
		};

		chosenHandler(data, (statusCode, payload) => {
			// use the status code called back by the  handler, or default to 200
			statusCode = typeof statusCode == "number" ? statusCode : 200;
			// use the payload code called back by the  handler, or default to  object
			payload = typeof payload == "object" ? payload : {};

			// Convert payload to as string
			const payloadString = JSON.stringify(payload);

			// Return the response
			response.setHeader("Content-Type", "application/json");
			response.writeHead(statusCode);

			response.end(payloadString);

			// Returning the response

			console.log("Returning this response: ", statusCode, payloadString);
		});

		// Send the response
		// response.end("Hello World\n");

		// Log the request path
		console.log("queryStringObject: ", queryStringObject);

		console.log("Request received with this payload: ", buffer);
		console.log("Request received on path: ", trimmedPath, " with ", method, headers);
	});
});

// start the server

server.listen(config.port, () => {
	console.log(`The server is listening on port ${config.port} now`);
});

// Define the handlers
const handlers = {};

handlers.sample = (data, cb) => {
	// callback a http status code and a payload object

	cb(406, { name: "Sample handler" });
};

handlers.notFound = (data, cb) => {
	cb(404);
};

// Define a request router
const router = {
	sample: handlers.sample,
};
