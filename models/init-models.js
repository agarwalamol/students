var DataTypes = require("sequelize").DataTypes;
var _students = require("./students");

function initModels(sequelize) {
  var students = _students(sequelize, DataTypes);


  return {
    students,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
