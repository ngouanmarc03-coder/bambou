/* =========================================================
   BAMBOU — Toutes les données du site.
   Pour changer un prix, un texte ou une info : c'est ici.
   ========================================================= */

window.BAMBOU = {
  infos: {
    nom: "Bambou",
    signature: "chez Zhu",
    activite: "Bar · Brasserie · Traiteur asiatique",
    adresse: "35 boulevard du Général Leclerc",
    ville: "92000 Nanterre",
    telephone: "+33 9 63 45 01 12",
    telephoneLien: "+33963450112",
    ouverture: "Du lundi au samedi, 10h00 – 20h20",
    /* Horaires d'ouverture (0 = dimanche, 1 = lundi … 6 = samedi).
       null = fermé. Format "HH:MM". */
    horaires: {
      1: ["10:00", "20:20"], 2: ["10:00", "20:20"], 3: ["10:00", "20:20"],
      4: ["10:00", "20:20"], 5: ["10:00", "20:20"], 6: ["10:00", "20:20"],
      0: null,
    },
    deliveroo: "https://deliveroo.fr/fr/menu/paris/nanterre-centre/bambou-nanterre",
    maps: "https://www.google.com/maps/search/?api=1&query=Bambou+35+boulevard+du+G%C3%A9n%C3%A9ral+Leclerc+92000+Nanterre",
    mapsEmbed: "https://www.google.com/maps?q=35+boulevard+du+G%C3%A9n%C3%A9ral+Leclerc,+92000+Nanterre&output=embed",
  },

  /* Réservation : heures d'arrivée proposées dans le formulaire.
     À ADAPTER aux vrais horaires du restaurant. */
  reservation: {
    joursMax: 60,
    creneaux: ["10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00",
               "15:00", "16:00", "17:00", "18:00", "18:30", "19:00", "19:30"],
  },

  /* Catégories de la carte (ordre d'affichage) */
  categories: [
    { id: "menus", nom: "Menus", icone: "bowl",
      intro: "La formule complète pour un repas sans hésiter : un plat chaud au choix et son accompagnement, servis généreusement." },
    { id: "inari", nom: "Inari", icone: "chopsticks",
      intro: "Petits chaussons de tofu frit légèrement sucré, garnis à la main. Une bouchée japonaise tendre et fondante, à composer selon vos envies." },
    { id: "rolls", nom: "Special Rolls", icone: "chopsticks",
      intro: "Nos rolls signature : garnitures généreuses, toppings croustillants et sauces maison. Le coup de cœur des amateurs de sushis." },
    { id: "sushis", nom: "Sushis saumon", icone: "fish",
      intro: "Saumon frais tranché minute sur riz vinaigré. Le grand classique, simple et parfaitement exécuté." },
    { id: "entrees", nom: "Hors-d'œuvre", icone: "dumpling",
      intro: "Nems dorés, gyozas, tempuras, salades fraîches et brochettes : de quoi bien commencer, ou picorer à plusieurs. Tout est halal." },
    { id: "plats", nom: "Plats chauds", icone: "flame",
      intro: "Le cœur de la maison : des plats sautés au wok, minute, à la viande halal ou aux fruits de mer. À associer avec un riz ou des nouilles." },
    { id: "accompagnements", nom: "Accompagnements", icone: "bowl",
      intro: "Riz thaï, riz cantonais, nouilles sautées… le compagnon idéal de chaque plat chaud." },
    { id: "boissons", nom: "Boissons", icone: "cup",
      intro: "Sodas, thé glacé et eaux bien fraîches pour accompagner votre repas." },
    { id: "bieres", nom: "Bière Tsingtao", icone: "beer",
      intro: "La célèbre bière blonde chinoise, légère et désaltérante, parfaite avec la cuisine épicée." },
    { id: "desserts", nom: "Desserts", icone: "dessert",
      intro: "Une note douce pour finir : les incontournables perles de coco." },
  ],

  /* tags possibles : halal, vege, epice, promo, populaire, mer */
  plats: [
    // MENUS
    { cat: "menus", nom: "Menu Viande", prix: 15.90, img: "menu-viande", tags: ["halal", "populaire"],
      desc: "Un plat chaud à la viande au choix et son accompagnement (riz ou nouilles). Le repas complet et copieux." },
    { cat: "menus", nom: "Menu Fruits de mer", prix: 17.90, img: "menu-fruits-de-mer", tags: ["mer"],
      desc: "Crevettes ou poisson sautés au wok, servis avec l'accompagnement de votre choix." },

    // INARI
    { cat: "inari", nom: "Inari avocat saumon", prix: 5.00, img: "inari-avocat-saumon",
      desc: "Saumon frais et avocat crémeux dans son chausson de tofu doré." },
    { cat: "inari", nom: "Inari poulet caramel", prix: 5.00, img: "inari-poulet-caramel",
      desc: "Poulet laqué au caramel, sucré-salé, sur riz vinaigré." },
    { cat: "inari", nom: "Inari anguille", prix: 5.00, img: "inari-anguille",
      desc: "Anguille grillée nappée de sauce unagi et sésame." },
    { cat: "inari", nom: "Inari salade d'algues", prix: 5.00, img: "inari-salade-algues", tags: ["vege"],
      desc: "Salade d'algues wakamé marinée, fraîche et iodée." },
    { cat: "inari", nom: "Inari thon cuit maïs", prix: 5.00, img: "inari-thon-mais",
      desc: "Thon cuit et maïs doux, une touche de mayonnaise épicée." },
    { cat: "inari", nom: "Inari saumon fromage", prix: 5.00, img: "inari-saumon-fromage",
      desc: "Saumon frais et fromage frais, l'accord fondant par excellence." },
    { cat: "inari", nom: "Inari 3 pièces au choix", prix: 11.90, img: "inari-3-pieces", tags: ["populaire"],
      desc: "Composez votre trio parmi toutes nos saveurs d'inari." },

    // SPECIAL ROLLS
    { cat: "rolls", nom: "Roll tempura crevette, avocat", prix: 12.90, img: "roll-tempura-crevette-avocat", tags: ["populaire"],
      desc: "Crevette tempura croustillante et avocat, topping d'oignons frits et sauce maison." },
    { cat: "rolls", nom: "Roll végétarien", prix: 12.90, img: "roll-vegetarien", tags: ["vege"],
      desc: "Concombre, avocat et fromage frais. Frais, croquant et gourmand." },
    { cat: "rolls", nom: "Roll avocat, thon cuit, saumon fumé", prix: 12.90, img: "roll-avocat-thon-saumon",
      desc: "Le trio avocat, thon cuit et saumon fumé, relevé d'un filet de sauce." },
    { cat: "rolls", nom: "Roll poulet croustillant, roquette", prix: 12.90, img: "roll-poulet-roquette",
      desc: "Poulet pané croustillant et roquette poivrée, une création maison." },

    // SUSHIS
    { cat: "sushis", nom: "3 sushis saumon + 8 California avocat saumon", prix: 12.90, img: "sushi-3-saumon-8-california", tags: ["populaire"],
      desc: "12 pièces en deux variantes : 3 nigiris saumon et 8 california saumon-avocat." },
    { cat: "sushis", nom: "8 sushis saumon", prix: 12.90, img: "sushi-8-saumon",
      desc: "8 nigiris au saumon frais, tranché généreusement." },

    // HORS-D'ŒUVRE
    { cat: "entrees", nom: "Nems crevettes (4 pièces)", prix: 6.50, img: "nems-crevettes", tags: ["halal", "mer"],
      desc: "Nems croustillants à la crevette, servis avec leur sauce." },
    { cat: "entrees", nom: "Nems poulet (4 pièces)", prix: 6.50, img: "nems-poulet", tags: ["halal"],
      desc: "Nems dorés au poulet, croustillants dehors, moelleux dedans." },
    { cat: "entrees", nom: "Gyoza au poulet (5 pièces)", prix: 7.00, img: "gyoza-poulet", tags: ["halal", "promo"],
      desc: "Raviolis japonais au poulet, grillés d'un côté, tendres de l'autre." },
    { cat: "entrees", nom: "Tempura aux crevettes (4 pièces)", prix: 8.00, img: "tempura-crevettes", tags: ["halal", "mer", "promo"],
      desc: "Crevettes enrobées d'une panure légère et ultra-croustillante." },
    { cat: "entrees", nom: "Salade de choux", prix: 3.50, img: "salade-choux", tags: ["halal", "vege"],
      desc: "Chou finement émincé, carottes et vinaigrette asiatique." },
    { cat: "entrees", nom: "Salade soja crevettes", prix: 5.90, img: "salade-soja-crevettes", tags: ["halal", "mer"],
      desc: "Salade, pousses de soja, concombre, carottes et crevettes." },
    { cat: "entrees", nom: "Salade d'algues", prix: 6.00, img: "salade-algues", tags: ["halal", "vege"],
      desc: "Algues wakamé marinées au sésame, fraîches et parfumées." },
    { cat: "entrees", nom: "Brochettes bœuf fromage (2 pièces)", prix: 4.90, img: "brochettes-boeuf-fromage", tags: ["halal"],
      desc: "Bœuf roulé autour d'un cœur de fromage fondant, grillé." },
    { cat: "entrees", nom: "Brochette poulet à la citronnelle", prix: 3.90, img: "brochette-poulet-citronnelle", tags: ["halal"],
      desc: "Poulet mariné à la citronnelle, grillé et caramélisé." },
    { cat: "entrees", nom: "Rouleau de printemps", prix: 3.80, img: "rouleau-printemps", tags: ["halal"],
      desc: "Vermicelles, soja, poulet et crevettes dans une galette de riz fraîche." },
    { cat: "entrees", nom: "Bobun bœuf", prix: 14.80, img: "bobun-boeuf", tags: ["halal"],
      desc: "Salade, soja, vermicelles de riz, nem au poulet et bœuf sauté. Un plat complet." },

    // PLATS CHAUDS — Viandes
    { cat: "plats", sub: "viandes", nom: "Légumes sautés", prix: 9.90, img: "legumes-sautes", tags: ["halal", "vege"],
      desc: "Brocolis, chou chinois et légumes croquants sautés au wok." },
    { cat: "plats", sub: "viandes", nom: "Poulet citronnelle", prix: 9.90, img: "poulet-citronnelle", tags: ["halal"],
      desc: "Poulet sauté à la citronnelle fraîche et aux herbes." },
    { cat: "plats", sub: "viandes", nom: "Poulet croustillant", prix: 9.90, img: "poulet-croustillant", tags: ["halal"],
      desc: "Morceaux de poulet frits, dorés et nappés de sauce." },
    { cat: "plats", sub: "viandes", nom: "Poulet caramel", prix: 9.90, img: "poulet-caramel", tags: ["halal", "populaire"],
      desc: "Le grand classique : poulet laqué au caramel, sucré-salé." },
    { cat: "plats", sub: "viandes", nom: "Poulet maison thaï piquant", prix: 9.90, img: "poulet-thai-piquant", tags: ["halal", "epice"],
      desc: "Poulet sauté aux poivrons et piments, à la façon thaïe." },
    { cat: "plats", sub: "viandes", nom: "Poulet curry au lait de coco", prix: 9.90, img: "poulet-curry-coco", tags: ["halal"],
      desc: "Curry doux et parfumé, adouci au lait de coco." },
    { cat: "plats", sub: "viandes", nom: "Boulettes de poulet", prix: 9.90, img: "boulettes-poulet", tags: ["halal"],
      desc: "Boulettes de poulet moelleuses en sauce aigre-douce." },
    { cat: "plats", sub: "viandes", nom: "Bœuf aux oignons", prix: 9.90, img: "boeuf-oignons", tags: ["halal"],
      desc: "Bœuf tendre sauté aux oignons fondants." },
    { cat: "plats", sub: "viandes", nom: "Bœuf piquant", prix: 9.90, img: "boeuf-piquant", tags: ["halal", "epice"],
      desc: "Bœuf sauté aux poivrons et piment, pour les amateurs de sensations." },
    // PLATS CHAUDS — Fruits de mer
    { cat: "plats", sub: "mer", nom: "Poisson sel et poivre", prix: 11.90, img: "poisson-sel-poivre", tags: ["halal", "mer", "populaire"],
      desc: "Poisson frit croustillant, relevé au sel, poivre et piment." },
    { cat: "plats", sub: "mer", nom: "Crevettes sauce piquante", prix: 11.90, img: "crevettes-sauce-piquante", tags: ["halal", "mer", "epice"],
      desc: "Crevettes sautées dans une sauce rouge relevée." },
    { cat: "plats", sub: "mer", nom: "Crevettes sel et poivre", prix: 11.90, img: "crevettes-sel-poivre", tags: ["halal", "mer"],
      desc: "Crevettes croustillantes sautées au sel, poivre et poivrons." },

    // ACCOMPAGNEMENTS
    { cat: "accompagnements", nom: "Riz thaï", prix: 7.90, img: "riz-thai", tags: ["promo"],
      desc: "Riz sauté à la thaïe, coloré et parfumé." },
    { cat: "accompagnements", nom: "Riz cantonais", prix: 7.90, img: "riz-cantonais", tags: ["promo"],
      desc: "Riz sauté aux œufs, petits pois et dés de garniture." },
    { cat: "accompagnements", nom: "Nouilles sautées aux légumes", prix: 7.90, img: "nouilles-sautees-legumes", tags: ["vege"],
      desc: "Nouilles de blé sautées au wok avec légumes et soja." },
    { cat: "accompagnements", nom: "Riz nature", prix: 4.00, img: "riz-nature", tags: ["vege"],
      desc: "Riz blanc parfumé, cuit à la vapeur." },
    { cat: "accompagnements", nom: "Pommes de terre sautées sel et poivre", prix: 6.90, img: "pommes-de-terre-sautees", tags: ["vege", "epice"],
      desc: "Pommes de terre sautées aux oignons et poivrons verts et rouges." },

    // BOISSONS
    { cat: "boissons", nom: "Coca-Cola", prix: 3.00, img: "coca-cola", desc: "Canette 33 cl" },
    { cat: "boissons", nom: "Coca-Cola Zero", prix: 3.00, img: "coca-cola-zero", desc: "Canette 33 cl" },
    { cat: "boissons", nom: "Fanta", prix: 3.00, img: "fanta", desc: "Canette 33 cl" },
    { cat: "boissons", nom: "Ice Tea", prix: 3.00, img: "ice-tea", desc: "Canette 33 cl" },
    { cat: "boissons", nom: "Orangina", prix: 3.00, img: "orangina", desc: "Canette 33 cl" },
    { cat: "boissons", nom: "7 Up Mojito", prix: 3.00, img: "7up-mojito", desc: "Canette 33 cl" },
    { cat: "boissons", nom: "Oasis", prix: 3.00, img: "oasis", desc: "Canette 33 cl" },
    { cat: "boissons", nom: "Evian", prix: 3.00, img: "evian", desc: "Bouteille 50 cl" },
    { cat: "boissons", nom: "San Pellegrino", prix: 3.00, img: "san-pellegrino", desc: "Bouteille 50 cl" },

    // BIÈRES
    { cat: "bieres", nom: "Tsingtao 33 cl", prix: 5.00, img: "biere-tsingtao", desc: "Bière blonde chinoise, bouteille 33 cl." },
    { cat: "bieres", nom: "Tsingtao 64 cl", prix: 8.90, img: "biere-tsingtao", desc: "Le grand format à partager, 64 cl." },

    // DESSERTS
    { cat: "desserts", nom: "Perles de coco", prix: 3.90, img: "perles-de-coco", tags: ["vege"],
      desc: "Boulettes de riz gluant moelleuses, roulées dans la noix de coco râpée." },
  ],

  sauces: [
    { nom: "Soja sucrée", prix: 0.50 },
    { nom: "Soja salée", prix: 0 },
    { nom: "Sauce nems", prix: 0.50 },
    { nom: "Sauce piquante", prix: 0.50 },
    { nom: "Sauce chili", prix: 0.50 },
  ],

  /* Carte de la brasserie (sur place) */
  brasserie: {
    chaudes: [
      ["Café expresso / décaféiné", "2,10 €"], ["Café allongé", "2,20 €"], ["Double expresso", "3,90 €"],
      ["Café noisette", "2,40 €"], ["Crème au lait", "4 €"], ["Cappuccino", "4,50 €"],
      ["Chocolat au lait", "4 €"], ["Thés (vert, jasmin)", "4 €"],
    ],
    fraiches: [
      ["Coca / Coca Zéro 33 cl", "4 €"], ["Fanta, Sprite, Fuze Tea, Schweppes 25 cl", "4 €"],
      ["Limonade 25 cl", "3,50 €"], ["Diabolo 25 cl", "4 €"], ["Jus de fruits 25 cl", "4 €"],
      ["Vittel 25 cl", "3,50 €"], ["Vittel + sirop", "4 €"], ["Perrier 33 cl", "4 €"],
    ],
    pressions: [["Asahi", "25 cl 3,50 € · 50 cl 6 €"], ["Monaco", "25 cl 4 € · 50 cl 6,50 €"]],
    bouteilles: [["Heineken 25 cl", "3,50 €"], ["Super Bock 25 cl", "3,50 €"], ["Leffe blonde 25 cl", "4 €"]],
    vin: [["Pichet / un verre (blanc, rouge, rosé)", "2,80 €"]],
  },
};
