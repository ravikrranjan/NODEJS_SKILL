/**
 * Primary file for API
 */

//Dependencies

import http from "http";

// The server should res;ond to all requests with a string

const server = http.createServer((request, response) => {
	// Get the URL and parse it

	// Get the path

	// Send the response

	// Log the request path

	response.end("Hello World\n");
});

// start the server , and have it listen on port 3737

server.listen(3737, () => {
	console.log("The server is listening on port 3737 now");
});
