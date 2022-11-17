const mongodb = require("mongodb");

class EmployeeService {
  PerformanceReview;

  constructor(client) {
    this.Employee = client.db().collection("employees");
  }

  getAll() {
    return this.Employee.find().toArray();
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

  insertOne(employee) {
    return this.Employee.insertOne(employee);
  }
}

module.exports = EmployeeService