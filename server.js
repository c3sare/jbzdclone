const process = require('dotenv/config');
const express = require("express");
var cors = require('cors');
const linkPreviewGenerator = require("link-preview-generator");
const app = express();

app.use(cors())

app.get("/youtubevideo/:url", (req, res) => {

});

app.get("/sitepreview/:url", async (req, res) => {
    const previewData = await linkPreviewGenerator(decodeURIComponent(req.params.url));

    res.json(previewData);
})

app.listen(8000, () =>
  console.log(`Example app listening on port ${8000}!`),
);