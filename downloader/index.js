const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();

app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const baseurl = '/download';

app.listen(process.env.PORT, () => {				
	console.log(`Downloader listening at: http://localhost:9130${baseurl}`);
});

app.get(baseurl, function (req, res) {											
    res.send('Ready to download charts');
});

// MIDDLEWARE FOR CROSS-ORIGIN REQUESTS
app.use(cors());

app.use(express.urlencoded({ extended: true }));

const download_chart_png = require('./download_chart_png');
const download_chart_html = require('./download_chart_html');
const download_chart_pdf = require('./download_chart_pdf');
const download_chart_svg = require('./download_chart_svg');

app.use(baseurl+'/download_chart_png', download_chart_png);
app.use(baseurl+'/download_chart_html', download_chart_html);
app.use(baseurl+'/download_chart_pdf', download_chart_pdf);
app.use(baseurl+'/download_chart_svg', download_chart_svg);

module.exports = router;
