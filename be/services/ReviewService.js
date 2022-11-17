const mongodb = require("mongodb");

class ReviewService {
  Review;

  constructor(client) {
    this.Review = client.db().collection("reviews");
  }

  getById(id) {
    return Review.findOne({
      _id: mongodb.ObjectId(req.params.id)
    })
  }

  getForReviewer(id) {
    return this.Review.find({
      reviewer: mongodb.ObjectId(id)
    }).toArray();
  }
}

module.exports = ReviewService