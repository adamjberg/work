const dotenv = require("dotenv");
const express = require("express");
const Joi = require("joi");
const { MongoClient } = require("mongodb");

async function main() {
  dotenv.config();
  const client = new MongoClient(process.env.DB_URI);
  await client.connect();

  const app = express();
  const port = Number(process.env.PORT);

  app.use(express.urlencoded());

  app.post("/api/reviews", (req, res, next) => {
    const schema = Joi.object({
      reviewer: Joi.string().required(),
      reviewee: Joi.string().required(),
      evaluation: Joi.string().required(),
      rating: Joi.number().integer().min(-2).max(2)
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return next(error)
    }

    const Review = client.db().collection("reviews");
    Review.insertOne(value);

    res.send("Success!")
  });

  app.post("/api/timeoffs", (req, res, next) => {
    const schema = Joi.object({
      employee: Joi.string().required(),
      type: Joi.string().valid("vacation", "sick"),
      date: Joi.string().required(),
      hours: Joi.number().integer().min(1).max(8)
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return next(error)
    }

    const TimeOff = client.db().collection("timeoffs");
    TimeOff.insertOne(value);

    res.send("Success!")
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

main();
