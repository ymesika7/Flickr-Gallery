const { json } = require("express");
const express = require("express");
const router = express.Router();
const Flickr = require('flickr-sdk');

const flickr = new Flickr(process.env.FLICKR_API_KEY || '5723a45ee56c18857ba99c50523dbba4');

// @route   GET api/gallery
// @desc    Get recent photos
// @access  Public
// router.get("/:text:per_page:page", (req, res) => {
//    
// });
router.get("/:text/:per_page/:page", ({ params: { text, per_page, page } }, res) => {
  flickr.photos.search({
      format: 'json',
      nojsoncallback: 1,
      text: text,
      per_page: per_page,
      page: page,
      tag: "nature",
      safe_search: 1,
      sort: 'interestingness-desc',
  }).then(function (url_res) {
      res.send(url_res.body);
  }).catch(function (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
  });
});

// @route    GET api/gallery/info/:id
// @desc     Get all photos by name
// @access   Public
router.get("/info/:id", ({ params: { id } }, res) => {
    flickr.photos.getInfo({
        format: 'json',
        nojsoncallback: 1,
        photo_id: id
    }).then(function (url_res) {
        res.send(url_res.body);
    }).catch(function (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    });
});
module.exports = router;

