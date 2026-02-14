// ============================================================
// SERVER.JS - Point d'entrée de l'API Trouve ton artisan
// ============================================================

require("dotenv").config();
const app = require("./src/app");
const sequelize = require("./src/config/db");

// Port défini dans .env ou fallback 3001
const PORT = process.env.PORT || 3001;

// Connexion à la base + lancement du serveur
(async () => {
  try {
    console.log("⏳ Connexion à la base de données...");

    await sequelize.authenticate();
    console.log("✅ Base de données connectée avec succès.");

    app.listen(PORT, () => {
      console.log(`🚀 API lancée sur http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("❌ Erreur lors du démarrage du serveur :", error);
    process.exit(1);
  }
})();