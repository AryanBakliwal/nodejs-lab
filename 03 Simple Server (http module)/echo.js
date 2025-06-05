const http = require('node:http');
const server = http.createServer((request, response) => {
    // we can also do
    if (request.method === 'POST' && request.url === '/echo') {
        request.pipe(response);
    }
    if (request.method === 'POST' && request.url === '/echo') {
      let body = [];
      request
        .on('data', chunk => {body.push(chunk)})
        .on('end', () => {
          body = Buffer.concat(body).toString();
          response.end(body);
        });
    } else {
      response.statusCode = 404;
      response.end();
    }
})
console.log("Server listening on port " + process.env.PORT2);
server.listen(process.env.PORT2);
