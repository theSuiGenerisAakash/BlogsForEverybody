const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

//API file for interacting with MongoDB
const api = require('./server/routes/api');
const gapi = require('./server/routes/gapi');

//Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Angular DIST output folder
app.use(express.static(path.join(__dirname,'dist')));

//API location
app.use('/api',api);

//Send all the other requests to the Angular app
app.use('/*',gapi);

// Home page
app.use('/',(req,res)=>{
	res.sendFile(path.join(_dirname,'dist/index.html'));
});


//Set port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
