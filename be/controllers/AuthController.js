const express = require("express");
const bcrypt = require("bcryptjs");

function initializeAuthController(app) {
  const router = express.Router();

  router.post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const employee = await req.services.employeeService.getByEmail(email);
      if (employee && bcrypt.compareSync(password, employee.password)) {
        req.session.employee = String(employee._id);
        res.redirect("/home.html");
      } else {
        res.sendStatus(400);
      }
    } catch (err) {
      next(err);
    }
  });

  router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password);

    res.json({
      data: {
        hashedPassword
      }
    })

    // const employee = await req.services.employeeService.getByEmail(email);
    // if (employee) {
    //   return res.sendStatus(400);
    // }

    // TODO: Create UI for this kind of flow
    // const { insertedId } = await req.services.employeeService.insertOne({
    //   email,
    //   password: hashedPassword,
    // });

    // req.session.user = String(insertedId);

    // res.redirect("/home.html");
  });

  app.use("/api/auth", router);
}

module.exports = {
  initializeAuthController,
};
