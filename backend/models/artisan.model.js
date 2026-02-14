//models/artisan.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Artisan = sequelize.define('Artisan', {
  id_artisan: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nom: { type: DataTypes.STRING, allowNull: false },
  note: { type: DataTypes.DECIMAL(2,1), defaultValue: 0 },
  ville: DataTypes.STRING,
  code_postal: DataTypes.STRING,
  description: DataTypes.TEXT,
  image_url: DataTypes.STRING,
  site_web: DataTypes.STRING,
  email_contact: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'artisan',
  timestamps: false,
});

module.exports = Artisan;