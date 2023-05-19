const express = require('express'),
 app = express(),
 router = express.Router();
const kafka = require('kafkajs')
const fs = require('fs');
const cors = require('cors');

const fileupload = require("express-fileupload");

const baseurl = '/my_charts3';

// API WEB SERVER

app.listen(process.env.PORT, () => {								//rest api listening to port 9103 and
	console.log(`App listening at: http://localhost:9113${baseurl}`);		//creating url to access endpoints from
});

app.get(baseurl, function (req,res) {											
	res.send('chart3 working');
});

// MIDDLEWARE FOR CROSS-ORIGIN REQUESTS
app.use(cors());

app.use(fileupload());
app.use(express.urlencoded({ extended: true }));


const chart3_parser = require('./parser');

app.use(baseurl+'/chart3_parser', chart3_parser);

module.exports = router;