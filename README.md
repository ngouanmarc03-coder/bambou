# Bambou chez Zhu — site vitrine

Site statique (HTML, CSS, JavaScript), sans base de données ni Cloudinary. Toutes les images sont dans `images/`.

## Les pages
| Fichier | Page |
|---|---|
| `index.html` | Accueil |
| `carte.html` | La carte complète + lexique |
| `brasserie.html` | Brasserie & bar, carte des boissons sur place |
| `restaurant.html` | Le lieu, la cuisine, la vitrine, la galerie |
| `commander.html` | Les 3 façons de commander, FAQ |
| `reserver.html` | Réservation de table + menu à l'avance |
| `contact.html` | Adresse, carte Google Maps, horaires, FAQ |
| `merci.html` | Confirmation après une demande de réservation |
| `mentions-legales.html`, `confidentialite.html` | Pages légales |

## Modifier le contenu
- **Prix, plats, descriptions, catégories, horaires, téléphone, adresse, créneaux de réservation** : `js/data.js`.
- **En-tête, pied de page, bannière cookies** (communs à toutes les pages) : `js/layout.js`.
- **Pages légales** : compléter les mentions surlignées « à compléter ».

## Photos à ajouter
- `images/lieu/salle.jpg` : la grande photo du bar / de la salle.
- `images/lieu/vitrine.jpg` : la photo de la vitrine du traiteur.

Tant qu'elles ne sont pas présentes, le site affiche une image de remplacement.

## Mise en ligne sur Netlify
1. Sur netlify.com : « Add new site » → « Import an existing project » (ce dépôt GitHub), ou glisser le dossier dans « Deploy manually ».
2. Aucune commande de build : `netlify.toml` publie le dossier tel quel.

## Recevoir les réservations (Netlify Forms)
1. Dans Netlify : **Site configuration → Forms → Enable form detection**, puis redéployer.
2. Les demandes apparaissent dans l'onglet **Forms** (formulaire « reservation »).
3. Pour les recevoir par e-mail : **Forms → Form notifications → Add notification → Email notification**.
4. Rappeler le client pour confirmer : le site indique bien que la réservation n'est confirmée qu'après votre appel.

Le formulaire ne fonctionne qu'une fois en ligne sur Netlify (pas en local).

## Voir le site en local
`python3 -m http.server 8000` puis ouvrir http://localhost:8000
