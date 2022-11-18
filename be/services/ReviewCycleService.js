const mongodb = require("mongodb");

class ReviewCycleService {
  ReviewCycle;

  constructor(client) {
    this.ReviewCycle = client.db().collection("reviewcycles");
  }

  getAll() {
    return this.ReviewCycle.find({}).toArray();
  }
}

module.exports = ReviewCycleService;
