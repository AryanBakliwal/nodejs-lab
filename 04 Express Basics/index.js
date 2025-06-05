const express = require("express");
const app = express();
const port = process.env.PORT;
const extraRoutes = require("./router")

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// route path ------------------------------------------------------------------------
app.get("/about", (req, res) => {
  res.send("about");
});

app.get("/random.text", (req, res) => {
  res.send("random.text");
});

// string patterns, no longer supported

// regular expressions
// app.get(/a/, (req, res) => { // will match anything with an “a” in it.
//     res.send('/a/')
// })

app.get(/.*fly$/, (req, res) => {
  // will match butterfly and dragonfly, but not butterflyman, dragonflyman, and so on
  res.send("/.*fly$/");
});

// route params ---------------------------------------------------------------------
app.get("/users/:userId/books/:bookId", (req, res) => {
  res.send(req.params);
  console.log(req.params); 
});
// localhost:8000/users/aryan/books/4375 => { userId: 'aryan', bookId: '4375' }

app.get("/flights/:from-:to", (req, res) => {
  res.send(req.params);
  console.log(req.params); 
});
// localhost:8000/flights/LAX-SFO => { from: 'LAX', to: 'SFO' }

// route handlers -------------------------------------------------------------------
app.get("/example/b", (req, res, next) => {
    console.log("the response will be sent by the next function ...");
    next();
  }, (req, res) => {
    res.send("Hello from B!");
  }
);

// router --------------------------------------------------------------------------
app.use('/prefix', extraRoutes); // all routes inside extraRoutes will be prefixed with /prefix

// template engine -----------------------------------------------------------------

app.set('view engine', 'pug')
app.set('views', './views')

app.get("/view", (req, res) => {
  res.render("index", {title: "View page", message: "Hello from template engine!"})
})

app.listen(port, () => {
  console.log(`Express.js server listening on port ${port}`);
});
