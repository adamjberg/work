const express = require("express");

function initializeReviewController(app) {
  const router = express.Router();

  router.get("/api/reviews/:id", async (req, res, next) => {
    const review = await req.services.reviewService.getById();
    res.json({
      data: review
    })
  });

  router.get("", async (req, res) => {
    const employee = req.session.employee;
    const data = await req.services.reviewService.getForReviewer(employee);

    res.json({
      data
    })
  });

  app.use("/api/reviews", router);
}

module.exports = {
  initializeReviewController,
};
