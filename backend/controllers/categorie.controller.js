const { Categorie, Specialite } = require("../models");

module.exports = {
  // GET /api/categories
  async getCategories(req, res, next) {
    try {
      const categories = await Categorie.findAll({
        attributes: ["id_categorie", "nom"],
      });

      res.json(categories);
    } catch (err) {
      next(err);
    }
  },

  // GET /api/categories/:id/specialites
  async getSpecialitesByCategorie(req, res, next) {
    try {
      const { id } = req.params;

      const specialites = await Specialite.findAll({
        where: { id_categorie: id },
        attributes: ["id_specialite", "nom"],
      });

      res.json(specialites);
    } catch (err) {
      next(err);
    }
  },
};