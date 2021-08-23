const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('students', {
    id: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    age: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    mark1: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    mark2: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    mark3: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'students',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "students_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
