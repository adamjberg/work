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
    }).sort({ _id: -1 }).toArray();
  }

  insertOne(data) {
    return this.Review.insertOne({
      reviewee: mongodb.ObjectId(data.reviewee),
      reviewer: mongodb.ObjectId(data.reviewer),
      cycle: mongodb.ObjectId(data.cycle),
      evaluation: data.evaluation,
      rating: data.rating,
      type: data.type
    });
  }

  updateById(id, update) {
    return this.Review.updateOne(
      { _id: mongodb.ObjectId(id) },
      {
        $set: {
          cycle: mongodb.ObjectId(update.cycle),
          evaluation: update.evaluation,
          rating: update.rating,
        },
      }
    );
  }
}

module.exports = ReviewService;
