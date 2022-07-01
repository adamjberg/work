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
}

module.exports = PerformanceReviewService