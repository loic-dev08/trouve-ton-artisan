USE trouve_ton_artisan;

-- ============================================================
-- INSERT : catégories
-- ============================================================

INSERT INTO categorie (nom) VALUES
('Bâtiment'),
('Services'),
('Fabrication'),
('Alimentation');

-- ============================================================
-- INSERT : spécialités
-- ============================================================

INSERT INTO specialite (nom, id_categorie) VALUES
-- Bâtiment
('Plomberie', 1),
('Électricité', 1),
('Chauffagiste', 1),
('Menuiserie',1)

-- Services
('Coiffure', 2),
('WebDesign', 2),
('Fleuriste', 2),
('Toiletteur',2)

-- Fabrication
('Bijouterie', 3),
('Couturier', 3),
('Ferronier', 3),

-- Alimentation
('Boulangerie', 4),
('Boucherie', 4),
('Traiteur', 4);
('Chocolaterie',4)

-- ============================================================
-- INSERT : artisans
-- ============================================================

INSERT INTO artisan (nom, note, ville, description, image, site_web, email_contact, id_specialite)
VALUES
-- Bâtiment
('Vallis Bellemare', 4.0, 'Vienne','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem.', './img/favicon-32.png', 'https://plomberie-bellemare.com', 'v.bellemare@gmail.com', 1),
('Orville Salmons', 5.0, 'Evian','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem.', './img/favicon-32.png', NULL, 'o-salmond@live.com', 2),
('Mont Blanc Electricité', 4.5, 'Chaamonix', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem.', './img/favicon-32.png', 'contact@mont-blanc-electricite.com','https://mont-blanc-electricite.com', 3),
('Boutot & fils', 4.7,'Bourg-en-Bresse','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem.','./img/favicon-32.png','boutot-menuiserie@gmail.com', 'https://boutot-menuiserie.com', 4);

-- Services
('Royden Charbonneau', 3.8, 'Saint-Priest','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem.', './img/favicon-32.png', NULL, 'r.charbonneau.com', 5),
('Leala Dennis', 3.8, 'Chambéry','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem.', './img/favicon-32.png', 'https://sup-hair.fr', 'l.dennis@hotmail.fr', 6),
('C'est sup'hair', 4.1, 'Romans-sur-Isere','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem.', './img/favicon-32.png', NULL, 'sup-hair@gmail.com', 7),
('Le Monde des fleurs', 4.6, 'Annonay','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem.','./img/favicon-32.png','https://le-monde-des-fleurs-annonay.fr', 'contact@le-monde-des-fleurs-annonay.fr', 8 )
('Valerie Laredoute', 4.5, 'Valence','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem.', './img/favicon-32.png',NULL,'v-laredoute@gmail.com', 9)
('CM Graphisme', 4.4, 'Valence', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem.', './img/favicon-32.png','https://cm-graphisme.com', 'contact@cm-graphisme.com', 10);

-- Fabrication
('Claude Quinn', 4.2, 'Aix-les-Bains','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem.', './img/favicon-32.png', NULL, 'claude.quinn@gmail.com', 11),
('Amitee Lécuyer', 4.5, 'Annecy','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem.', './img/favicon-32.png','htpps://lecuyer-couture.com', 'a.amitee@hotmail.com', 12),
('Ernest Carignan', 5.0, 'Le Puy-en-Velay','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem.', './img/favicon-32.png', NULL,'e.carignan@hotmail.com', 13);

-- Alimentation
('Boucherie Dumont', 4.5, 'Lyon','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem.', './img/favicon-32.png', NULL, 'boucherie.dumont@gmail.com', 14),
('Au point chaud', 4.8, 'Montélimar','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem.', './img/favicon-32.png', NULL, 'aupainchaud@hotmail.com', 15),
('Chocolaterie Labbé', 4.9, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem.', './img/favicon-32.png','https://chocolaterie.labbe.fr', 'chocolaterie-labbe@gmail.com', 16),
('Traiteur Truchon', 4.1 , 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem.', '/img/favicon-32.png', 'https://truchon-traiteur.fr', 'contact@truchon-traiteur.fr', 17);