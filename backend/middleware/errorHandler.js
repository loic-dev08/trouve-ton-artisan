module.exports = (err, req, res, next) => {
  console.error("Erreur API :", err);

  res.status(err.status || 500).json({
    message: err.message || "Erreur interne du serveur",
  });
};