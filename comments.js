/* Create web server for comments */
/*jshint esversion: 6 */
const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

/* GET comments listing. */
router.get("/", (req, res, next) => {
  Comment.find((err, comments) => {
    if (err) {
      console.log(err);
    } else {
      res.json(comments);
    }
  });
});

/* POST comments */
router.post("/", (req, res, next) => {
  let newComment = new Comment({
    name: req.body.name,
    comment: req.body.comment,
    date: req.body.date
  });

  newComment.save((err, comment) => {
    if (err) {
      res.json({ msg: "Failed to add comment" });
    } else {
      res.json({ msg: "Comment added successfully" });
    }
  });
});

/* DELETE comments */
router.delete("/:id", (req, res, next) => {
  Comment.remove({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;