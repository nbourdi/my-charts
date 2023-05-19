const express = require('express'),
 app = express(),
 router = express.Router();
const kafka = require('kafkajs')
const fs = require('fs');
const cors = require('cors');

const fileupload = require("express-fileupload");

const baseurl = '/my_charts5';

// API WEB SERVER

app.listen(process.env.PORT, () => {								//rest api listening to port 9103 and
	console.log(`App listening at: http://localhost:9117${baseurl}`);		//creating url to access endpoints from
});

app.get(baseurl, function (req,res) {											
	res.send('chart5 working');
});

// MIDDLEWARE FOR CROSS-ORIGIN REQUESTS
app.use(cors());

app.use(fileupload());
app.use(express.urlencoded({ extended: true }));


const chart5_parser = require('./parser');

app.use(baseurl+'/chart5_parser', chart5_parser);

module.exports = router;