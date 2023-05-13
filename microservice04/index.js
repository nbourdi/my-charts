const express = require("express");
app = express();
const cors = require('cors');
const router = express.Router();


const baseurl = '/chart_to_database';

app.listen(process.env.PORT, () => {				
	console.log(`Add chart to database listening at: http://localhost:9106${baseurl}`);
});

app.get(baseurl, function (req,res) {											
	res.send('Ready to add charts to database');
});

// MIDDLEWARE FOR CROSS-ORIGIN REQUESTS
app.use(cors());

app.use(express.urlencoded({ extended: true }));


const add_chart = require('./add_chart');

app.use(baseurl+'/add_chart', add_chart);

module.exports = router;