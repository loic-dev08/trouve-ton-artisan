CREATE TABLE categorie (
  id_categorie INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL
);

CREATE TABLE specialite (
  id_specialite INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(150) NOT NULL,
  id_categorie INT NOT NULL,
  FOREIGN KEY (id_categorie) REFERENCES categorie(id_categorie)
);

CREATE TABLE artisan (
  id_artisan INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(150) NOT NULL,
  note DECIMAL(2,1) DEFAULT 0,
  ville VARCHAR(100),
  code_postal VARCHAR(10),
  description TEXT,
  image_url VARCHAR(255),
  site_web VARCHAR(255),
  email_contact VARCHAR(255) NOT NULL,
  id_specialite INT NOT NULL,
  FOREIGN KEY (id_specialite) REFERENCES specialite(id_specialite)
);

CREATE TABLE message_contact (
  id_message INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL,
  objet VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  date_envoi DATETIME DEFAULT CURRENT_TIMESTAMP,
  id_artisan INT NOT NULL,
  FOREIGN KEY (id_artisan) REFERENCES artisan(id_artisan)
);