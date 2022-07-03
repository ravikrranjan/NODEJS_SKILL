/**
 * Primary file for API
 *
 * @auth Ravi Ranjan
 * @Date July-22
 */

//Dependencies

import http from "http";
import url from "url";

// The server should res;ond to all requests with a string

const server = http.createServer((request, response) => {
	// Get the URL and parse it

	const parsedUrl = url.parse(request.url, true);

	// Get the path
	const path = parsedUrl.pathname;
	const trimmedPath = path.replace(/^\/+|\/+$/g, "");
	const method = request.method.toLowerCase();
	// Send the response

	// Log the request path

	response.end("Hello World\n");

	console.log("Request received on path: ", trimmedPath, " with ", method);
});

// start the server , and have it listen on port 3737

server.listen(3737, () => {
	console.log("The server is listening on port 3737 now");
});
