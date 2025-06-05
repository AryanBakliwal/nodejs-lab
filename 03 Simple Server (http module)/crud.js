const http = require('node:http')

const user = {
    firstName: "Aryan",
    lastName: "Bakliwal",
    age: 20,
    isMarried: false
}

const server = http.createServer((req, res) => {
    // GET (Read)
    if(req.method == 'GET' && req.url == '/') {
        console.log(req.method + " " + req.url)
        // res.statusCode = 200;
        res.writeHead(200, {'content-type': 'application/json'}) // important when sending json
        
        // cannot directly send json object in response body
        // res.end(user); // end the response, send r in body of response
        res.end(JSON.stringify(user)) // must send string
    } 
    // POST (Create)
    else if(req.method == 'POST' && req.url == '/addProperty') {
        let body = ""
        req
        .on("data", (chunk) => {
            body += chunk
        })
        .on("end", () => {
            //body = Buffer.concat(body).toString();
            let parsed = JSON.parse(body);
            console.log(parsed); // { key: 'property' }

            let flag = false
            for(const key in user) {
                if(parsed[key]) {
                    flag = true
                    // user[key] = parsed[key];
                }
            }
            if(!flag) { // not present
                Object.assign(user, parsed); // add this JSON object to user
                console.log(user);
                // {
                //     firstName: 'Aryan',
                //     lastName: 'Bakliwal',
                //     age: 20,
                //     isMarried: false,
                //     key: 'property'
                // }
                console.log(user);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ body: parsed }));
            } else {
                res.statusCode = 409;
                res.end("Key already present!");
            }
        })
        .on("error", (err) => {
            console.error(err)
        }) 
    }
    // PUT (Update)
    else if(req.method == 'PUT' && req.url == '/updateProperty') {
        let body = "";
        req
        .on("error", (err) => {
            console.error(err)
        })
        .on("data", (chunk) => {
            body += chunk;
        })
        .on("end", () => {
            parsed = JSON.parse(body)
            console.log(parsed)
            let flag = false
            for(const key in user) {
                if(parsed[key]) {
                    flag = true
                    user[key] = parsed[key];
                }
            }
            if(flag) {
                console.log(user);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ body: parsed }));
            } else {
                res.statusCode = 404;
                res.end("Key not found!");
            }
            
        })
    }
    // DELETE (Delete)
    else if(req.method == 'DELETE' && req.url == '/deleteProperty') {
        let body = "";
        req
        .on("error", (err) => {
            console.error(err)
        })
        .on("data", (chunk) => {
            body += chunk;
        })
        .on("end", () => {
            let parsed = JSON.parse(body);
            console.log(parsed);

            let flag = false
            for(const key in user) {
                if(parsed[key] && parsed[key] == user[key]) {
                    flag = true
                    delete user[key]
                    break;
                    // user[key] = parsed[key];
                }
            }
            if(flag) {
                console.log(user);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ body: parsed }));
            } else {
                res.statusCode = 404;
                res.end("Key not found!");
            }
        })
    }
    
})

server.listen(process.env.PORT1, () => {
    console.log("Server is listening on port " + process.env.PORT1);
})