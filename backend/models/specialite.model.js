const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Specialite = sequelize.define(
  "Specialite",
  {
    id_specialite: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    id_categorie: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "specialite",
    timestamps: false,
  }
);

module.exports = Specialite;