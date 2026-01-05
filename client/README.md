# Présentation du Projet

Le projet "**cv-client**" est une application web moderne (Single Page Application) développée avec React 19.

C'est l'interface utilisateur qui permet aux visiteurs d'interagir avec votre système de gestion de CV.

## Architecture Technique

### Coeur du Framework
* **React 19 & React DOM :** Utilisation des dernières versions pour une gestion d'interface fluide et performante.
* **Vite 7 :** Choisi comme outil de build pour sa rapidité exceptionnelle au démarrage et son rechargement à chaud (HMR) pendant le développement.

### Navigation et Communication
* **React Router Dom (v7.11) :** Gère la navigation entre les différentes pages du site (ex: /accueil, /edit-cv) sans recharger le navigateur.
* **Axios (v1.13) :** Client HTTP utilisé pour envoyer des requêtes au serveur (votre cv-server) et récupérer les données des CV.

### Qualité et Standard de Code
* **TypeScript (Types uniquement) :** Bien que le projet soit en JavaScript (.js ou .jsx), il inclut les définitions de types pour React afin de sécuriser le développement.
* **ESLint 9 :** Garantit un code propre en vérifiant automatiquement le respect des bonnes pratiques React.

## Guide de démarrage rapide
Le fichier définit quatre scripts essentiels pour piloter le projet :

|Script|Commande|Usage|
|--|--|--|
Développement|npm run dev|Lance le serveur local avec rafraîchissement en temps réel.|
|Compilation|npm run build|Prépare les fichiers optimisés pour la mise en ligne (production).|
|Nettoyage|npm run lint|Analyse le code pour détecter et corriger les erreurs de syntaxe.|
|Aperçu|npm run preview|Teste localement le rendu final après la compilation.|