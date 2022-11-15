const express = require("express");

function initializeAuthController(app) {
  const router = express.Router();

  router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const employee = await req.services.employeeService.getByEmail(email);
    // TODO: Check password and create session

    res.redirect("/home.html")
  });

  app.use("/api/auth", router);
}

module.exports = {
  initializeAuthController,
};
