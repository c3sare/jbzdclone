const express = require("express");
var cors = require('cors');
const linkPreviewGenerator = require("link-preview-generator");
const app = express();
require('dotenv').config();

app.use(cors())

app.get("/youtubevideo/:videoid", async (req, res) => {
  const youtube_data = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=id&id=${req.params.videoid}&key=${process.env.YOUTUBE_API_KEY}`)
  .then(data => data.json());

  if(youtube_data.items.length > 0)
    res.json({videoExist: true});
  else
    res.json({videoExist: false});
});

app.get("/sitepreview/:url", async (req, res) => {
    const previewData = await linkPreviewGenerator(decodeURIComponent(req.params.url));

    res.json(previewData);
})

app.listen(8000, () =>
  console.log(`Example app listening on port ${8000}!`),
);