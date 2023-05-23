const express = require("express");
app = express();
const cors = require('cors');
const router = express.Router();


const baseurl = '/chart_to_database';

app.listen(process.env.PORT, () => {				
	console.log(`Get charts from database listening at: http://localhost:9106${baseurl}`);
});

app.get(baseurl, function (req,res) {											
	res.send('Ready to get users charts from database');
});

// MIDDLEWARE FOR CROSS-ORIGIN REQUESTS
app.use(cors());

app.use(express.urlencoded({ extended: true }));


const get_charts = require('./add_chart');

app.use(baseurl+'/add_chart', add_chart);

module.exports = router;
