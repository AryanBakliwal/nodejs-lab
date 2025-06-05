const express = require("express");
const app = express();

// ------------------------------------------------------------------------------------
// application-level middlewares 
// ------------------------------------------------------------------------------------

const myLogger = function (req, res, next) {
  console.log("LOGGED");
  next();
  // next('route') // won't work here as it is not called in app/router.METHOD()
};

app.use("/", myLogger); // first middleware mounted on / path

// OR
// app.use('/', (req, res, next) => {
//     console.log('LOGGED')
//     next()
// })

const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use("/", requestTime); // second middleware mounted on / path

app.get("/", (req, res) => {
  let responseText = "Hello World!<br>";
  responseText += `<small>Requested at: ${new Date(
    req.requestTime
  ).toLocaleString()}</small>`;
  res.send(responseText);
});

// skip middleware -------------------------------------------------------------------

app.get("/skip", (req, res, next) => {
    console.log("skipped 1");
    next("route");
  }, (req, res, next) => {
    // gets skipped
    let responseText = "Hi World!<br>";
    res.send(responseText);
  }
);

app.get("/skip", (req, res, next) => {
  // gets called
  let responseText = "Hello World!<br>";
  res.send(responseText);
});

// array of middleware ---------------------------------------------------------------

function logOriginalUrl(req, res, next) {
  console.log("Request URL:", req.originalUrl); // Request URL: /xyz
  next();
}

function logMethod(req, res, next) {
  console.log("Request Type:", req.method); // Request Type: GET
  next();
}

const logStuff = [logOriginalUrl, logMethod];
app.get("/xyz", logStuff, (req, res, next) => {
  res.send("Hello"); // Hello on page
});

// ------------------------------------------------------------------------------------
// router-level middlewares 
// ------------------------------------------------------------------------------------
const extraRoutes = require("./router")

app.use("/router", extraRoutes);

// ------------------------------------------------------------------------------------
// error-handling middlewares 
// ------------------------------------------------------------------------------------

app.use("/err", (req, res, next) => {
  throw new Error("Error!")
  // next()
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error!");
})


// ------------------------------------------------------------------------------------
// built-in middlewares 
// ------------------------------------------------------------------------------------
app.use(express.static('public'));


// ------------------------------------------------------------------------------------
// third-party middlewares 
// ------------------------------------------------------------------------------------
const cookieParser = require('cookie-parser')

// load the cookie-parsing middleware
app.use(cookieParser())

app.listen(3000, () => {
  console.log("Express.js server listening on port 3000...");
});
