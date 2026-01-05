# CV
Ce fichier est le chef d'orchestre de votre application. Il permet de gérer simultanément le frontend (React) et le backend (NestJS) au sein d'un seul et même dépôt GitHub.

## Architecture Fullstack
Le projet est conçu comme une application complète utilisant la stack PERN/MERN (avec MySQL) :

* **Frontend :**
    * **React.js** (situé dans le dossier /client).
* **Backend :**
    * **NestJS** (situé dans le dossier /server).
* **Base de données :**
    * **MySQL.

## Automatisation du Workflow
L'élément clé de ce fichier est l'utilisation de concurrently (v9.2.1). Cela vous permet de lancer toute votre infrastructure de développement avec une seule commande, au lieu d'ouvrir plusieurs terminaux.

## Commandes de Pilotage (Scripts)
Grâce aux scripts configurés, vous pouvez gérer les deux parties du projet depuis la racine :
|Commande|Action|
|--|--|
|npm run dev|La commande principale. Elle lance simultanément le serveur NestJS et le client React en mode développement.|
|npm run dev:server|Lance uniquement le backend NestJS situé dans le sous-dossier server.|
|npm run dev:client|Lance uniquement l'interface React située dans le sous-dossier client.

## Informations de Dépôt
* **Auteur :** DFS-FredRX.
* **Licence :** MIT (Open Source).
* **Dépôt distant :** Hébergé sur GitHub (DFS-FredRX/CV).