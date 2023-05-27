const express = require("express");
const router = express.Router();
const svg2img = require('svg2img');

router.post('/', (req, res) => {
    try {
        const svg = req.body.svg;

        svg2img(svg, { format: 'png' }, (error, buffer) => {
            if (error) {
                console.error('Error converting SVG to PNG:', error);
                res.status(500).send('Error converting SVG to PNG');
                return;
            }

            // Set the response headers
            res.set('Content-Type', 'image/png');
            console.log(buffer);
            // Send the PNG image data as the response
            res.send(buffer);
        });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

module.exports = router;