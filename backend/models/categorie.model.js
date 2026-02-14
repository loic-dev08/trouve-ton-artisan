const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Categorie = sequelize.define(
  "Categorie",
  {
    id_categorie: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "categorie",
    timestamps: false,
  }
);

module.exports = Categorie;