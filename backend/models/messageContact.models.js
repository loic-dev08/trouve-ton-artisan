const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const MessageContact = sequelize.define(
  "MessageContact",
  {
    id_message: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    objet: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date_envoi: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    id_artisan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "message_contact",
    timestamps: false,
  }
);

module.exports = MessageContact;