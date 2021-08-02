const dotenv = require("dotenv");
const express = require("express");
const Joi = require("joi");
const mongodb = require("mongodb");
const moment = require("moment");

async function main() {
  dotenv.config();
  const client = new mongodb.MongoClient(process.env.DB_URI);
  await client.connect();

  const app = express();
  const port = Number(process.env.PORT);

  app.use(express.urlencoded());

  app.post("/api/reviews", (req, res, next) => {
    const schema = Joi.object({
      reviewer: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      reviewee: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      evaluation: Joi.string().required(),
      rating: Joi.number().integer().min(-2).max(2),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return next(error);
    }

    const reviewToInsert = {
      ...value,
      reviewer: mongodb.ObjectId(value.reviewer),
      reviewee: mongodb.ObjectId(value.reviewee)
    }

    const Review = client.db().collection("reviews");
    Review.insertOne(reviewToInsert);

    res.send("Success!");
  });

  app.get("/api/timeoff/balance/employee/:employeeId", async (req, res, next) => {
    const { employeeId } = req.params;

    const Employee = client.db().collection("employees");
    const employee = await Employee.findOne({
      _id: mongodb.ObjectId(employeeId)
    })

    if (!employee) {
      return res.sendStatus(404)
    }

    const policy = {
      accrualRate: 1.54,
      period: "week"
    };

    const weeksEmployed = moment().diff(moment(employee.start), "week")
    const hoursAccrued = weeksEmployed * policy.accrualRate;
    let availableVacationBalance = hoursAccrued
    let currentVacationBalance = hoursAccrued
    let availableSickBalance = hoursAccrued
    let currentSickBalance = hoursAccrued

    const TimeOff = client.db().collection("timeoffs");
    const timeOffs = await TimeOff.find({
      employee: mongodb.ObjectId(employeeId),
    }).sort({
      date: "desc"
    }).toArray();

    for (const timeOff of timeOffs) {
      if (moment(timeOff.date).isBefore(moment())) {
        if (timeOff.type === "vacation") {
          currentVacationBalance -= timeOff.hours
        } else {
          currentSickBalance -= timeOff.hours
        }
      }

      if (timeOff.type === "vacation") {
        availableVacationBalance -= timeOff.hours
      } else {
        availableSickBalance -= timeOff.hours
      }
    }

    res.json({
      data: {
        vacation: {
          availableBalance: availableVacationBalance,
          currentBalance: currentVacationBalance
        },
        sick: {
          availableBalance: availableSickBalance,
          currentBalance: currentSickBalance
        }
      }
    });
  });

  app.get("/api/timeoff/employee/:employeeId", async (req, res, next) => {
    const { employeeId } = req.params;

    const TimeOff = client.db().collection("timeoffs");
    const timeOffs = await TimeOff.find({
      employee: mongodb.ObjectId(employeeId),
    }).sort({
      date: "desc"
    }).toArray();

    res.json(timeOffs);
  });

  app.post("/api/timeoffs", (req, res, next) => {
    const schema = Joi.object({
      employee: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      type: Joi.string().valid("vacation", "sick"),
      date: Joi.string().required(),
      hours: Joi.number().integer().min(1).max(8),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return next(error);
    }

    const timeOffToInsert = {
      ...value,
      employee: mongodb.ObjectId(value.employee)
    }

    const TimeOff = client.db().collection("timeoffs");
    TimeOff.insertOne(timeOffToInsert);

    res.send("Success!");
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

main();
