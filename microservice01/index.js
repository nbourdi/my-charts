const path = require('path');
const express = require('express'),
 app = express(),
 webapp = express(),
 router = express.Router();
const https = require('https');
const fs = require('fs');
const cors = require('cors');

const fileupload = require("express-fileupload");

const PORT = 9103;
const baseurl = '/my_charts1';

const server = https.createServer(/*{ key, cert },*/ app);
const webserver = https.createServer(/*{ key, cert },*/ webapp);

// API WEB SERVER

app.listen(PORT, () => {								//rest api listening to port 9103 and
	console.log(`App listening at: http://localhost:${PORT}${baseurl}`);		//creating url to access endpoints from
});

app.get(baseurl, function (req,res) {											
	res.send('chart1 working');
});

// MIDDLEWARE FOR CROSS-ORIGIN REQUESTS
app.use(cors());

app.use(fileupload());
app.use(express.urlencoded({ extended: true }));

// WEB SERVER (for frontend)
webapp.listen(80, () => {								//create a web server listening to port 80
 	//console.log('Web-server is up and running at: http://www.intelliQ.com');		//and link it to www.inteliQ.com
 });

webapp.get("/", function (req,res) {
	res.send("Webserver IS UP!");
});

const chart1_parser = require('./parser');
const { homedir } = require('os');

// RESTFUL API ROUTES

app.use(baseurl+'/chart1_parser', chart1_parser);


// ROUTES FOR FRONTEND

//webapp.use(express.static(path.join(__dirname, '..') + "/frontend/frontend1/build"));

module.exports = router;