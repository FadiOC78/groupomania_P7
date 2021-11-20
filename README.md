# Groupomania

Projet 7 de la formation développeur Web d'OpenClassrooms.
Création d'un réseau social interne pour les employés de la société Groupomania.

---

## Technologies

Voici la liste des technologies utilisées pour ce projet :

### Frontend

-   Vue.js : Version 2.6.12

### Backend

-   MySQL2 : Version 2.2.5
-   Sequelize : Version 6.3.5
-   Node.js : Version 12.18.4
-   Express : Version 4.17.1

Vous trouverez [la documentation de l'API](https://documenter.getpostman.com/view/13932892/TVsuBSah)

## Installation

### Base de données

Vous devez avoir MySQL installé en localhost sur le port 3306. Créez la base de données :

```
CREATE DATABASE groupomania;
```

Pour la version MySQL 5.7 ou inférieure, créez l'utilisateur :

```
CREATE USER 'groupomania'@'localhost' IDENTIFIED BY 'knutR66t-st';
```

Pour la version MySQL 8 ou supérieure, créez l'utilisateur de cette façon :

```
CREATE USER 'groupomania'@'localhost'IDENTIFIED WITH mysql_native_password BY 'knutR66t-st';
```

Donnez les droits sur la base de données groupomania à l'utilisateur créé :

```
GRANT ALL PRIVILEGES ON groupomania.* TO 'groupomania'@'localhost';
```

### Application

Vous devez avoir Node.js installé sur votre ordinateur.<br/>
Clonez ce dépôt GitHub. Rendez-vous dans le dossier **backend** et installez les modules nécessaires :

```
npm install
```

Démarrez l'API :

```
node server
```

Pour continuer, vous devez avoir Vue CLI installé :

```
npm install -g @vue/cli
```

Depuis le dossier **frontend**, installez les modules nécessaires :

```
npm install
```

Puis démarrez l'application :

```
npm run serve
```

Rendez-vous sur votre navigateur à l'adresse : http://localhost:8080

### Pour définir un utilisateur en tant qu'administrateur

Rendez-vous dans la base de données groupomania :

```
USE groupomania;
```

Modifier la donnée is_admin en renseignant l'adresse email de votre inscription :

```
UPDATE users SET is_admin = 1 WHERE email = 'votre adresse email';
```
