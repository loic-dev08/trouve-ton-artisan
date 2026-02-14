// ============================================================
// MODELS INDEX - Centralisation Sequelize + Associations
// ============================================================

const sequelize = require("../config/db");

// Import des modèles
const Categorie = require("./categorie.model");
const Specialite = require("./specialite.model");
const Artisan = require("./artisan.model");
const MessageContact = require("./messageContact.model");

// ============================================================
// ASSOCIATIONS
// ============================================================

// CATEGORIE 1 → N SPECIALITE
Categorie.hasMany(Specialite, {
  foreignKey: "id_categorie",
  as: "specialites",
});
Specialite.belongsTo(Categorie, {
  foreignKey: "id_categorie",
  as: "categorie",
});

// SPECIALITE 1 → N ARTISAN
Specialite.hasMany(Artisan, {
  foreignKey: "id_specialite",
  as: "artisans",
});
Artisan.belongsTo(Specialite, {
  foreignKey: "id_specialite",
  as: "specialite",
});

// ARTISAN 1 → N MESSAGE_CONTACT
Artisan.hasMany(MessageContact, {
  foreignKey: "id_artisan",
  as: "messages",
});
MessageContact.belongsTo(Artisan, {
  foreignKey: "id_artisan",
  as: "artisan",
});

// ============================================================
// EXPORT
// ============================================================

module.exports = {
  sequelize,
  Categorie,
  Specialite,
  Artisan,
  MessageContact,
};