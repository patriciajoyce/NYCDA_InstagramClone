//include express
const express = require('express');

// static file server
// const serveStatic = require('serve-static');

// body parser middleware
// const parser = require('body-parser');

//create an express application
const app = express();

//parses requests with the content type of `application/json`
// app.use(parser.json());


//have the application listen on a specific port
app.listen(1133, () => {
    console.log('Example app listening on port 1133!');
});