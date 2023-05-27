const express = require("express");
const router = express.Router();

router.post('/', (req, res) => {
    try {
        const svg = req.body.svg;

        // Set the response headers
        res.set('Content-Type', 'image/svg+xml');

        // Send the SVG string as the response
        res.send(svg);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

module.exports = router;
