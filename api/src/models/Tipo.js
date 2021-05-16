const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Tipo", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
    },
    image:{
      type: DataTypes.TEXT,
    }
  });
};

