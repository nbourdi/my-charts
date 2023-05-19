const express = require("express");
const router = express.Router();
const fs = require("fs");
const axios = require('axios');
const FormData = require('form-data');
const form = new FormData();


router.post('/:filename', (req, res) => {

    const filename = req.params.filename;

    const csvFilePath = `./chart1_csvs/${filename}.csv`;

    fs.readFile(csvFilePath, 'utf8', (err, csvData) => {
        if (err) {
            console.error('Error reading CSV file:', err);
            return;
        }

        const endpointUrl = `http://localhost:9103/my_charts1/chart1_parser`;

        form.append('my_csv', csvData);

        axios.post(endpointUrl, form, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(response => {
                res.status(200).json({ status: "success" });
            })
            .catch(error => {
                console.log(error);
            });
    });

})

module.exports = router;