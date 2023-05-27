const express = require("express");
const router = express.Router();

router.post('/', (req, res) => {
    try {
        const svg = req.body.svg;

        // Create an HTML document with embedded SVG
        const html = `
            <!DOCTYPE html>
            <html>
            <body>
                ${svg}
            </body>
            </html>
        `;

        // Set the response headers
        res.set('Content-Type', 'text/html');

        // Send the HTML as the response
        res.send(html);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

module.exports = router;
