const express = require("express");

function initializePerformanceReviewController(app) {
  const router = express.Router();

  router.get("/:id", async (req, res) => {
    res.send(await getHtmlForPerformanceReview(req));
  });

  router.post("/:id", async (req, res) => {
    res.send(await getHtmlForPerformanceReview(req));
  });

  app.use("/api/performance-reviews", router);
}

async function getHtmlForPerformanceReview(req) {
  const {id} = req.params;
  const { employeeService, performanceReviewService } = req.services;

  const performanceReview = await performanceReviewService.getById(id);

  const employee = await employeeService.getById(performanceReview.employee);

  return `
      <style>
        textarea, select {
          width: 100%;
          margin-bottom: 8px;
          resize: vertical;
        }
      </style>

      <h1>Performance Review</h1>
      <h2>2022 Q2</h2>
      <h3>${employee.name}</h3>

      <form action="/api/performance-reviews/${id}" method="post">
        <textarea name="selfEvaluation" rows="18">${performanceReview.selfEvaluation}</textarea>
        <div><button type="submit">Save</button></div>
      </form>
      
      <form action="/api/performance-reviews/${id}" method="post">
        <textarea name="evaluation" rows="18">${performanceReview.evaluation}</textarea>
        <div>
          <select name="rating" value="${performanceReview.rating}">
            <option></option>
            <option ${optionValueSelected(-2, performanceReview.rating)}>Does Not Meet</option>
            <option ${optionValueSelected(-1, performanceReview.rating)}>Needs Improvement</option>
            <option ${optionValueSelected(-0, performanceReview.rating)}>Meets Requirements</option>
            <option ${optionValueSelected(1, performanceReview.rating)}>Exceeds Expectations</option>
            <option ${optionValueSelected(2, performanceReview.rating)}>Significantly Exceeds Expectations</option>
          </select>
        </div>
        <div><button type="submit">Save</button></div>
      </form>
      `;
}

function optionValueSelected(optionValue, selectedValue) {
  return `value="${optionValue}"${String(optionValue) === String(selectedValue) ? ' selected' : ''} `
}

module.exports = {
  initializePerformanceReviewController,
};
