const express = require("express");

function initializeReviewCycleController(app) {
  const router = express.Router();

  router.get("", async (req, res) => {
    const data = await req.services.reviewCycleService.getAll();

    res.json({
      data
    })
  });

  app.use("/api/review-cycles", router);
}

module.exports = {
  initializeReviewCycleController,
};
