const express = require('express'),
 app = express(),
 router = express.Router();
const kafka = require('kafkajs')
const fs = require('fs');
const cors = require('cors');

const fileupload = require("express-fileupload");

const baseurl = '/my_charts1';

// API WEB SERVER

app.listen(process.env.PORT, () => {								//rest api listening to port 9103 and
	console.log(`App listening at: http://localhost:9103${baseurl}`);		//creating url to access endpoints from
});

app.get(baseurl, function (req,res) {											
	res.send('chart1 working');
});

// MIDDLEWARE FOR CROSS-ORIGIN REQUESTS
app.use(cors());

app.use(fileupload());
app.use(express.urlencoded({ extended: true }));


const chart1_parser = require('./parser');
const uploader = require('./uploader');

app.use(baseurl+'/chart1_parser', chart1_parser);
app.use(baseurl+'/chart1_uploader', uploader);

module.exports = router;