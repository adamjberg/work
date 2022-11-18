const express = require("express");

function initializeEmployeeController(app) {
  const router = express.Router();

  router.get("", async (req, res) => {
    const data = await req.services.employeeService.getAll();

    res.json({
      data
    })
  });

  router.get("/me", async (req, res) => {
    const data = await req.services.employeeService.getById(req.session.employee);

    res.json({
      data
    })
  });

  app.use("/api/employees", router);
}

module.exports = {
  initializeEmployeeController,
};
