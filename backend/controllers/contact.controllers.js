const { MessageContact, Artisan } = require("../models");

module.exports = {
  // POST /api/artisans/:id/contact
  async sendMessage(req, res, next) {
    try {
      const { id } = req.params;
      const { nom, email, objet, message } = req.body;

      const artisan = await Artisan.findByPk(id);
      if (!artisan) {
        return res.status(404).json({ message: "Artisan introuvable" });
      }

      // Enregistrement du message
      await MessageContact.create({
        nom,
        email,
        objet,
        message,
        id_artisan: id,
      });

      // (Optionnel) Envoi d'email réel ici

      res.json({ message: "Message envoyé avec succès" });
    } catch (err) {
      next(err);
    }
  },
};