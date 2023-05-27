const express = require("express");
const router = express.Router();
const SVGtoPDF = require("svg-to-pdfkit");
const PDFDocument = require("pdfkit");

router.post('/', (req, res) => {
    try {
        const svg = req.body.svg;

        // Create a PDFKit document
        const doc = new PDFDocument();

        // Pipe the PDFKit document to SVGtoPDF converter
        SVGtoPDF(doc, svg, 0, 0);

        // Stream the resulting PDF
        res.set('Content-Type', 'application/pdf');
        res.set('Content-Disposition', 'attachment; filename="converted.pdf"');
        doc.pipe(res);
        doc.end();
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

module.exports = router;
