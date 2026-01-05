# Présentation du Projet

Ce projet, nommé "**cv-server**", est une application backend développée avec le framework NestJS (version 11).

NestJS est un framework Node.js moderne, hautement structuré et conçu pour créer des applications côté serveur efficaces et évolutives en TypeScript.

## Caractéristiques Techniques

### Langage et Framework
* **TypeScript :** Le projet utilise la version 5.7, ce qui garantit un code fortement typé et sécurisé.
* **NestJS :** Utilisation des modules fondamentaux (@nestjs/core, @nestjs/common) pour une architecture modulaire.

### Base de Données
* **TypeORM :** C'est l'ORM (Object-Relational Mapper) choisi pour interagir avec la base de données. Il permet de manipuler les données sous forme d'objets TypeScript.
* **MySQL :** Le pilote mysql2 indique que le serveur est conçu pour communiquer avec une base de données MySQL.
* **Système de Migrations :** Le projet inclut des scripts spécifiques (migration:generate, migration:up) pour gérer l'évolution du schéma de la base de données de manière versionnée.

### Qualité du Code et Tests

* **Tests Automatisés :** Le projet intègre Jest pour les tests unitaires et dispose d'une configuration pour les tests e2e (end-to-end) via Supertest.
* **Linting et Formatage :** ESLint et Prettier sont configurés pour maintenir une qualité de code constante et un style uniforme.

## Commandes Principales (Scripts)
Le serveur peut être piloté via les commandes suivantes :
|Commande|Action|
|--|--|
|npm run start:dev|Lance le serveur en mode développement avec auto-reload (le serveur redémarre à chaque modification).|
|npm run build|Compile le code TypeScript en JavaScript pour la production.|
|npm run start:prod|Exécute l'application compilée située dans le dossier dist/.|
|npm run migration:up|Applique les dernières modifications de structure à votre base de données MySQL.|
|npm run test|Exécute la suite de tests avec Jest.|