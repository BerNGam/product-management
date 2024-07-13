
# API de Gestion de Produits

## Description

Une API RESTful simple construite avec Node.js et Express pour gérer les produits en utilisant MongoDB. Ce projet permet aux utilisateurs de créer, lire, mettre à jour et supprimer des données de produits de manière efficace.

## Fonctionnalités

- Fonctionnalité CRUD complète pour les produits
- Connexion MongoDB pour un stockage de données robuste
- Authentification de base utilisant JWT (JSON Web Tokens)
- Mises à jour en temps réel via WebSocket (Socket.io)
- Application frontend développée avec React et Material UI

## Tech Stack

-   **Backend:** Node.js, Express, MongoDB, Mongoose
-   **Frontend:** React, Material UI, Redux (non effectué)
-   **WebSocket:** Socket.io
-   **Authentication:** JWT 

## Getting Started

### Prérequis

-   Node.js (version 14.x ou supérieure)
-   MongoDB (installé et en cours d'exécution)

### Installation

1.  Clone the repository:
    
    `git clone https://github.com/BerNGam/product-management.git
    cd product-management` 
    
2.  Installez les dépendances :
    
    `npm install` 

    -> à appliquer dans chaque dossier , le frontEnd et le backEnd
    
3.  Créez un fichier `.env`  dans le répertoire racine et ajoutez les lignes suivantes :
    
`MONGODB_URI=mongodb://127.0.0.1:27017/product_management
 PORT=5000` 
sans les guillemets , l'insérer comme présenter.

### Lancer l'Application (Backend)

1.  Démarrez le service MongoDB s'il n'est pas en cours d'exécution :
    
    `net start MongoDB` 
    
2.  Démarrez le serveur :
    
    `npm run dev` 
    
3.  Ouvrez votre navigateur et naviguez vers `http://localhost:5000`. // vous verrez probablement un cannot GET / -> ce n'est pas un problème passé

    

### API Endpoints

-   **GET** `/api/products` - Points de Terminaison de l'API
-   **POST** `/api/products` - Créer un nouveau produit
-   **PUT** `/api/products/:id` - Mettre à jour un produit existant
-   **DELETE** `/api/products/:id` - Supprimer un produit

### Frontend

Pour exécuter l'application frontend, naviguez vers le répertoire frontend (le cas échéant) et suivez les mêmes étapes d'installation. Ensuite, démarrez l'application React :

`npm start` 

## License

This project is licensed under the MIT License.
