const mongodb = require("mongodb");

class ReviewService {
  Review;

  constructor(client) {
    this.Review = client.db().collection("reviews");
  }

  getById(id) {
    return this.Review.findOne({
      _id: mongodb.ObjectId(id),
    });
  }

  getForReviewer(id) {
    return this.Review.find({
      reviewer: mongodb.ObjectId(id),
    }).toArray();
  }

  updateById(id, update) {
    return this.Review.updateOne(
      { _id: mongodb.ObjectId(id) },
      {
        $set: {
          evaluation: update.evaluation,
          rating: update.rating,
        },
      }
    );
  }
}

module.exports = ReviewService;