# CV Server

<p align="center">
    <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" />
    <img src="https://img.shields.io/badge/TypeORM-%23FE0803.svg?style=for-the-badge&logo=typeorm&logoColor=white">
</p>

Ce serveur est le backend d'une application de gestion de CV. Il est robuste, suit les standards de l'industrie (**NestJS**, **TypeORM**) et est conçu pour un environnement professionnel grâce à sa configuration complète de tests et de migrations.

## Caractéristiques Techniques

### Langage et Framework <img align="right" src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" /> <img align="right" src="https://img.shields.io/badge/typescript-%233178C6.svg?style=for-the-badge&logo=typescript&logoColor=white" />
* **TypeScript :** Le projet utilise la **version 5.7** pour un code fortement typé.
* **NestJS :** Utilisation de la **version 11** pour une architecture modulaire et évolutive.

### Base de Données et Sécurité <img align="right" src="https://img.shields.io/badge/mysql-%234479A1.svg?style=for-the-badge&logo=mysql&logoColor=white" /> <img align="right" src="https://img.shields.io/badge/TypeORM-%23FE0803.svg?style=for-the-badge&logo=typeorm&logoColor=white"> <img align="right" src="https://img.shields.io/badge/Argon2-%234E5751.svg?style=for-the-badge"> <img align="right" src="https://img.shields.io/badge/dotenv-%23ECD53F.svg?style=for-the-badge&logo=dotenv&logoColor=black"> <img align="right" src="https://img.shields.io/badge/Validation-%23212121.svg?style=for-the-badge">
* **TypeORM :** L'ORM utilisé pour la gestion des données et des relations.
* **MySQL :** Communication avec la base de données via la pilote **mysql2**.
* **Sécurité :** Utilisation d'**Argon2** pour le hachage sécurisé des mots de passe.
* **Validation :** Intégration de **class-validator** et **class-transformer** pour le contrôle des données entrantes (DTOs).
* **Configuration :** Gestion des variables d'environnement avec **dotenv**.

### Qualité du Code et Tests <img align="right" src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white"> <img align="right" src="https://img.shields.io/badge/eslint-%234B32C3.svg?style=for-the-badge&logo=eslint&logoColor=white"> <img align="right" src="https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black"> <img align="right" src="https://img.shields.io/badge/Supertest-%23212121.svg?style=for-the-badge">
* **Tests :** Configuration complète avec **Jest** incluant les tests unitaires, le suivi de couverture (coverage) et les tests e2e (end-to-end) via **Supertest**.
* **Linting et Formatage :** Utilisation d'**ESLint** et **Prettier** pour garantir un code propre et uniforme.

## Structure du Projet
```text
├── src/                                        # Code source de l'application
│   ├── app.controller.ts                       # Point d'entrée des requêtes HTTP de base
│   ├── app.module.ts                           # Module racine regroupant les dépendances (TypeORM User, etc.)
│   ├── app.service.ts                          # Logique métier globale (ex: version statut health-check)
│   ├── main.ts                                 # Configuration du bootstrap
│   ├── config/                                 # Centralisation des configurations
│   │   ├── db.config.ts                        # Paramètres de connexions MySQL via TypeORM
│   │   └── migration.config.ts                 # Configuration dédiée aux outils CLI de TypeORM
│   ├── migrations/                             # Historique des modifications de la base de données
│   │   └── 1767743184437-CreateDatabase.ts     # Script de création des tables User
│   └── user/                                   # Domaine fonctionnel "Utilisateur"
│       ├── user.module.ts                      # Orchestration du module User (liens entre Controller et Service)
│       ├── controller/
│       │   └── user.controller.ts              # Définition des routes API (GET, POST, PATCH /user)
│       ├── dto/                                # Data Transfer Objects (Validation des entrées)
│       │   ├── createUser.dto.ts               # Schéma de validation pour la création
│       │   └── updateUser.dto.ts               # Schéma de validation pour la mise à jour
│       ├── entity/
│       │   └── user.entity.ts                  # Modèle de données mappé sur la table MySQL
│       └── service/
│           └── user.service.ts                 # Logique métier (Hachage argon2, appels Repository)
├── test/                                       # Espace dédié à la qualité et validation
│   ├── app.controller.spec.ts                  # Tests unitaires du contrôleur de base
│   └── user/
│       ├── user.controller.e2e-spec.ts         # Tests d'intégration HTTP (Supertest + SQLite in-memory)
│       └── user.service.spec.ts                # Tests unitaires isolés (Mocks du repository TypeORM)
├── .env.sample                                 # Exemple des variables requises (DB_HOST, DB_USER, etc.)
└── package.json                                # Scripts (test:e2e, migration:up) et dépendances du projet
```

## Installation <img align="right" src="https://img.shields.io/badge/Git-%23F05032.svg?style=for-the-badge&logo=git&logoColor=white"> <img align="right" src="https://img.shields.io/badge/Bash-%234EAA25.svg?style=for-the-badge&logo=gnu-bash&logoColor=white"> <img align="right" src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white"> <img align="right" src="https://img.shields.io/badge/dotenv-%23ECD53F.svg?style=for-the-badge&logo=dotenv&logoColor=black">

**Prérequis :**
* **Node.js** (v20+ recommandé)
* **MySQL** (v8+)
* **NPM**

Suivez ces étapes pour installer et lancer le projet localement :
1. **Cloner le dépôt**
    ```Bash
    git clone <url-du-repo>
    cd cv-server
    ```
2. **Installer les dépendances**
    ```Bash
    npm install
    ```
3. **Configurer l'environnement**  
    Créez un fichier **.env** à la racine du projet et configurez vos accès à la base de données MySQL (utilisé par **dotenv**).
    ```Extrait de code
    DB_HOST = localhost
    DB_PORT = 3306
    DB_USER = votre_user
    DB_PASSWORD = votre_password
    ```

4. **Lancer l'application**
    ```Bash
    # Mode développement (avec auto-reload)
    npm run start:dev
    # Mode production
    npm run build
    npm run start:prod
    ```

## API Endpoints (Aperçu)
|Méthode|Endpoint|Description|
|--|--|--|
|POST|/user|Créer un nouvel utilisateur|
|GET|/user|Lister tous les utilisateurs|

## Gestion des Migrations <img align="right" src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" /> <img align="right" src="https://img.shields.io/badge/mysql-%234479A1.svg?style=for-the-badge&logo=mysql&logoColor=white" /> <img align="right" src="https://img.shields.io/badge/TypeORM-%23FE0803.svg?style=for-the-badge&logo=typeorm&logoColor=white"> <img align="right" src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white">
Le projet utilise **TypeORM** pour gérer les évolutions du schéma de base de données de manière versionnée.
* **Générer une migration :** Compare vos entités actuelles avec le schéma de la base de données et crée un fichier de migration.
    ```Bash
    npm run migration:generate -- name=NomDeLaMigration
    ```
* **Appliquer les migrations :** Met à jour la structure de votre base de données **MySQL**.
    ```Bash
    npm run migration:up
    ```
* **Annuler une migration :** Revient en arrière sur la dernière migration appliquée.
    ```Bash
    npm run migration:down
    ```

## Tests <img align="right" src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white"> <img align="right" src="https://img.shields.io/badge/Better--SQLite3-%23003B57.svg?style=for-the-badge&logo=sqlite&logoColor=white">
Le projet inclut une suite complète de tests pour assurer la stabilité du code :

|Commande|Action|
|--|--|
|npm run test|Exécute les tests unitaires avec **Jest**.|
|npm run test:watch|Lance les tests en mode observation.|
|npm run test:cov|Génère un rapport de couverture de code.|
|npm run test:e2e|Exécute les tests de bout en bout (end-to-end).|
|npm run test:debug|Lance les tests en mode debug.|

Les tests **E2E** utilisent une base de données **better-sqlite3** en mémoire pour garantir l'isolation et ne pas polluer votre base de données locale.

## Licence
Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](../LICENSE) pour plus de détails.
