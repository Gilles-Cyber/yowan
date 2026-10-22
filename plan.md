# Portfolio de Yoan Nathan — Plan et direction artistique

## Périmètre
Portfolio web one-page, premium, en français, responsive, présentant le profil de Yoan Nathan Jombwe Mbengué, ses compétences et exactement trois projets : landing page cosmétique, plateforme de réservation sportive et étude de cas UI/UX pour application de suivi sportif.

## Approche d’implémentation
- Stack légère et robuste : HTML sémantique, CSS natif et JavaScript modulaire servi par Vite.
- Sections ancrées : Accueil, À propos, Expertise, Projets, Contact.
- Interactions : navigation mobile, apparition douce au scroll, ouverture d’une fiche projet dans une modale, feedback du formulaire de contact.
- Les visuels de projets sont des compositions CSS originales, sans dépendance à des images externes, afin de garder une identité cohérente et un rendu rapide.
- Aucun backend requis pour la première version ; le formulaire affiche une confirmation côté interface et les coordonnées directes restent disponibles.

## Structure du projet
- `index.html` : structure éditoriale, navigation, contenu des sections et modale projet.
- `src/styles.css` : système visuel, responsive, composants, mockups et animations.
- `src/main.js` : interactions UI et données des trois études de cas.
- `public/manus-routes.json` : manifeste de route requis par Webdev.
- `app.config.ts` : métadonnée logo du projet.
- `TODO.md` : suivi des résultats attendus.

## Design — choix retenu
### Styles explorés
- **Editorial tech premium** — 0,07 : typographie expressive, noir chaud, accents lime et compositions de portfolio.
- **Neo-brutalist coloré** — 0,05 : aplats francs, cadres épais, contraste ludique.
- **Minimalisme clinique** — 0,04 : beaucoup de blanc, rythme très rationnel, palette froide.

### Direction choisie : Editorial tech premium
- **Design Movement** : direction éditoriale digitale inspirée des portfolios de studios indépendants et de la culture tech premium.
- **Core Principles** : contraste maîtrisé, précision typographique, profondeur par halos et surfaces vitrées, contenu prioritaire.
- **Color Philosophy** : un fond graphite presque noir installe la confiance et le sérieux ; l’ivoire rend la lecture chaleureuse ; le vert acide devient la signature énergique de Yoan, entre innovation et sport.
- **Layout Paradigm** : composition asymétrique à deux axes, avec un hero en split-screen, une ligne éditoriale verticale et des cartes projets en alternance plutôt qu’une grille uniforme.
- **Signature Elements** : grand monogramme `YN`, pastilles numérotées, filets lime et mini-maquettes d’interfaces intégrées dans les cartes.
- **Interaction Philosophy** : les interactions doivent être rapides, nettes et utiles : hover avec translation courte, boutons qui changent de surface, modale qui donne plus de contexte sans quitter la page.
- **Animation** : reveal vertical léger à l’entrée, flottement discret des orbites dans le hero, transitions de 220–420 ms, aucun mouvement décoratif permanent qui gêne la lecture.
- **Typography System** : Space Grotesk pour les titres et labels, Inter pour le corps et les métadonnées ; titres très grands et serrés, corps aéré, labels en capitales espacées.
- **Brand Essence** : développeur et designer UI/UX en formation, qui transforme des idées digitales en expériences claires et désirables. Personnalité : dynamique, précis, curieux.
- **Brand Voice** : directe, confiante, humaine. Exemple : « Je conçois des interfaces qui donnent envie d’aller plus loin. » / « Trois projets, une même obsession : rendre le digital plus simple. »
- **Wordmark & Logo** : monogramme `YN` dans un carré arrondi, traversé par une ligne lime évoquant une trajectoire de sprint.
- **Signature Brand Color** : `#D7F36A`, un vert citron électrique propre à la marque, utilisé avec retenue pour les accents, les actions et les états actifs.

## Contenu projet
1. **Auréa** — landing page éditoriale pour une ligne de cosmétiques premium.
2. **Courtly** — plateforme web de réservation de terrains et d’activités sportives.
3. **PulseFit** — étude de cas UI/UX pour une application mobile de suivi sportif.
