const express = require("express");
app = express();
const cors = require('cors');
const router = express.Router();


const baseurl = '/chart_from_database';

app.listen(process.env.PORT, () => {				
	console.log(`Get charts from database listening at: http://localhost:9107${baseurl}`);
});

app.get(baseurl, function (req,res) {											
	res.send('Ready to get users charts from database');
});

// MIDDLEWARE FOR CROSS-ORIGIN REQUESTS
app.use(cors());

app.use(express.urlencoded({ extended: true }));


const get_charts = require('./get_charts');

app.use(baseurl+'/get_charts', get_charts);

module.exports = router;