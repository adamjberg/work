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

  getByEmail(email) {
    return this.Employee.findOne({
      email
    });
  }
}

module.exports = EmployeeService