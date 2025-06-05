const http = require("node:http");

// Create a local server to receive data from
// const server1 = http.createServer((req, res) => {
//     console.log(req.method + " " + req.url); // GET /

// });
// server1.listen(8080);

// OR
// const server = http.createServer();
// server.on('request', (request, response) => {
//   // the same kind of magic happens here!
// });

// request
const server = http.createServer((req, res) => {

	// request
  const { headers, method, url } = req;
  let body = [];
  req
    .on("error", (err) => {
      console.error(err);
    })
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      // At this point, we have the headers, method, url and body, and can now
      // do whatever we need to in order to respond to this request.
    });
	// console.log(headers); // { host: 'localhost:8080', connections: 'keep-alive',... }
	// console.log(method); // GET
	// console.log(url); // /
	// console.log(body); // []

	// response
	res.on('error', err => {
		console.error(err);
	  });
	  res.statusCode = 200;
	  res.setHeader('Content-Type', 'application/json');
	  // Note: the 2 lines above could be replaced with this next one:
	  // response.writeHead(200, {'Content-Type': 'application/json'})
	  const responseBody = { headers, method, url, body };
	  res.write(JSON.stringify(responseBody));
	  res.end();
	  // Note: the 2 lines above could be replaced with this next one:
	  // response.end(JSON.stringify(responseBody))
});

console.log("Server listening on port 8080...");
server.listen(process.env.PORT1);

// to read from .env file, use --env-file like
// node --env-file=.env index.js
// or install dotenv,
// otherwise run
// $env:PORT=8080 (in PowerShell)
// to set the variable.
// console.log(process.env.PORT);
