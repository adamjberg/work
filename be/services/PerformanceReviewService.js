const mongodb = require("mongodb");

class PerformanceReviewService {
  PerformanceReview;

  constructor(client) {
    this.PerformanceReview = client.db().collection("performance-reviews");
  }

  getById(id) {
    return this.PerformanceReview.findOne({
      _id: mongodb.ObjectId(id)
    });
  }

  updateById(id, update) {
    return this.PerformanceReview.updateOne({
      _id: mongodb.ObjectId(id)
    }, {
      $set: update
    })
  }
}

module.exports = PerformanceReviewService