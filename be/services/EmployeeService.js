const mongodb = require("mongodb");

class EmployeeService {
  PerformanceReview;

  constructor(client) {
    this.Employee = client.db().collection("employees");
  }

  getById(id) {
    return this.Employee.findOne({
      _id: mongodb.ObjectId(id)
    });
  }
}

module.exports = EmployeeService