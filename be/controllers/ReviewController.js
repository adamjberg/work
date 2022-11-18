const express = require("express");

function initializeReviewController(app) {
  const router = express.Router();

  router.post("/:id", async (req, res, next) => {
    await req.services.reviewService.updateById(req.params.id, req.body);
    res.redirect("/reviews/list.html");
  });

  router.post("", async (req, res, next) => {
    await req.services.reviewService.insertOne({
      ...req.body,
      reviewer: req.session.employee
    });
    res.redirect("/reviews/list.html");
  });

  router.get("/:id", async (req, res, next) => {
    const review = await req.services.reviewService.getById(req.params.id);
    res.json({
      data: review
    })
  });

  router.get("", async (req, res) => {
    const employee = req.session.employee;
    const data = await req.services.reviewService.getForEmployee(employee);

    res.json({
      data
    })
  });

  app.use("/api/reviews", router);
}

module.exports = {
  initializeReviewController,
};
