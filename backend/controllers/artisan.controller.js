const { Artisan, Specialite, Categorie } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  // GET /api/artisans?categorie=batiment&q=martin
  async getArtisans(req, res, next) {
    try {
      const { categorie, q } = req.query;

      const where = {};
      const include = [
        {
          model: Specialite,
          include: [{ model: Categorie }],
        },
      ];

      // Filtre par catégorie (slug)
      if (categorie) {
        include[0].include[0].where = { nom: categorie };
      }

      // Recherche par nom
      if (q) {
        where.nom = { [Op.like]: `%${q}%` };
      }

      const artisans = await Artisan.findAll({
        where,
        include,
      });

      res.json(artisans);
    } catch (err) {
      next(err);
    }
  },

  // GET /api/artisans/top
  async getTopArtisans(req, res, next) {
    try {
      const artisans = await Artisan.findAll({
        limit: 3,
        order: [["note", "DESC"]],
        include: [
          {
            model: Specialite,
            include: [{ model: Categorie }],
          },
        ],
      });

      res.json(artisans);
    } catch (err) {
      next(err);
    }
  },

  // GET /api/artisans/:id
  async getArtisanById(req, res, next) {
    try {
      const { id } = req.params;

      const artisan = await Artisan.findByPk(id, {
        include: [
          {
            model: Specialite,
            include: [{ model: Categorie }],
          },
        ],
      });

      if (!artisan) {
        return res.status(404).json({ message: "Artisan introuvable" });
      }

      res.json(artisan);
    } catch (err) {
      next(err);
    }
  },
};