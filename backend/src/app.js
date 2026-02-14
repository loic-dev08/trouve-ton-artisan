require("dotenv").config();
const express = require("express");
const cors = require("cors");
const apiKeyAuth = require("./middleware/apiKeyAuth");
const errorHandler = require("./middleware/errorHandler");

const categorieRoutes = require("./routes/categorie.routes");
const artisanRoutes = require("./routes/artisan.routes");
const contactRoutes = require("./routes/contact.routes");

const app = express();

app.use(cors());
app.use(express.json());

// API sécurisée
app.use("/api", apiKeyAuth);

app.use("/api/categories", categorieRoutes);
app.use("/api/artisans", artisanRoutes);
app.use("/api/artisans", contactRoutes);

// Middleware global d'erreurs
app.use(errorHandler);

module.exports = app;