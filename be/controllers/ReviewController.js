const express = require("express");

function initializeReviewController(app) {
  const router = express.Router();

  router.get("", async (req, res) => {
    res.json({
      data: [
        {
          _id: "1",
          reviewee: {
            _id: "1",
            name: "Kieran"
          },
          reviewer: {
            _id: "2",
            name: "Adam"
          }
        }
      ]
    })
  });

  app.use("/api/reviews", router);
}

module.exports = {
  initializeReviewController,
};
