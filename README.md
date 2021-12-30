# PROJET 7 - OPENCLASSROOMS - DEVELOPPEUR WEB

## Scénario

Je suis développeuse depuis plus d'un an chez CONNECT-E, une petite agence web regroupant une douzaine d'employés.
Votre directrice, Stéphanie, invite toute l'agence à prendre un verre pour célébrer une bonne nouvelle! Elle vient de signer un contrat pour un nouveau projet ambitieux !
Le client en question est `Groupomania`, un groupe spécialisé dans la grande distribution et l'un des plus fidèles clients de l'agence.
Ma mission consiste à construire un réseau social interne pour les employés de `Groupomania` (développer les parties frontend et backend).

## Dossier Central

Créez un dossier nommé `GROUPOMANIA`. A l'intérieur de ce dossier créez un dossier nommé `Backend`

## Dossier Backend

- Serveur **Node.js**
- Framework **Express.js**
- Base de données **MySQL**
- ORM **Sequelize**
- **Api RESET**
- sécurité **RGPD et OWASP**

### Installation

- Accédez sur https://nodejs.org/en/ pour télécharger puis installer `Node.js` sur votre machine
- cd **Backend**:
  - Chargez le package `nodemon` : `npm install -g nodemon`
  - Pour installer `Express.js`, exécutez la commande : `npm install --save express`
  - pour le téléchargement de fichiers, installez le package `Multer` : `npm install --save multer`
  - Lancez les commandes: `npm i fs`, `npm install body-parser`

**Configuration de la base de données :**

Toujours dans le terminal du dossier `backend`

- Installez `mysql2`: `npm install mysql2`
- Pour installer `Sequelize` et `Sequelize CLI`, exécutez les commandes: `npm install sequelize`, `npm install --save sequelize-cli` puis ` npx sequelize init`. Cela créera les dossiers `config`, `models` et `migrations`.

<h3>- Compétences évaluées :</h3>
<ul>
  <li>  Authentifier un utilisateur et maintenir sa session</li>
  <li>  Personnaliser le contenu envoyé à un client web</li>
  <li>  Gérer un stockage de données à l'aide de SQL</li>
  <li>  Implémenter un stockage de données sécurisé en utilisant SQL</li>
</ul>

### - Technologies utilisées :
NodeJs - VueJs - MySQL - Bootstrap - Sass


  
## INSTALLATION
### Prérequis :
**Pour la sécurité de l'application**, installez:

`npm install --save bcrypt`,

`npm install --save jsonwebtoken`,

`npm install --save express-rate-limit`,

`npm install password-validator `,

`npm install helmet --save `

- lancez le serveur: `nodemon server`
- Exécution de l’api sur http://localhost:3000

Créer un dossier vide puis cloner ce repository à l'intérieur : 

```
https://github.com/FadiOC78/groupomania_P7.git
```
## MySQL
Dans le fichier groupomania/backend/.env ,mettre le mot de passe d'accès à votre base de donnée et votre nom d'utilisateur si besoin (root par défaut)
```
DB_USER=root
DB_PASS=
```
Ouvrir MySql command Line client puis effectuer ces deux lignes de commandes :
```
CREATE DATABASE groupomania;
USE groupomania;
```
Importer le fichier groupomania.sql (qui ce trouve a la racine du projet) : 
```
source (chemin vers le fichier groupomania.sql);
```
Attention a indiquer le chemin avec des "/" et non des "\ ".

## BACK END
Ouvrir un terminal dans le dossier backend puis effectuer les lignes de commandes suivantes :
```
npm install
node server
```
## FRONT END
## Frontend

- Framework **Vue.js** avec l'utilisation de **Vue CLI**
- **Axios**
- **Bootstrap**
- **WCAG**

### Installation

- Ouvrez un terminal dans le dossier central `groupomania_P7`:
  - Installez **Vue CLI** : `npm install -g @vue/cli` (Pour plus d'information je vous conseille de lire la documentation vue-cli https://cli.vuejs.org/guide/ )
  - Puis créez le projet `vue create frontend`
  - Puis cd frontend :
    - Exécuter la commande `npm install` pour installer tous les modules nécessaires au fonctionnement de l'application.
    - Installez **Axios** : `npm install axios`
    - Installez **Bootstrap** : `npm install vue bootstrap bootstrap-vue`
    - Lancez la commande `npm run serve`
- Le serveur est accessible en local via le port 8080: http://localhost:8080/

### Fonctionnalités :
Le site permet de
<ul>
  <li>Partager des posts (avec ou sans photos)</li>
  <li>Commenter et liker des posts</li>
  <li>Personnaliser son profil (changement de photo de profil, description...)</li>
  <li>Modifier et supprimer son compte</li>
</ul>

Un compte admin est présent pour la modération (suppression des posts et commentaires d'autres utilisateurs).
<br>
Voici les codes d'accès admin :
```
admin@admin.com
Admin.31
```

Bonne visite !

![Capture d’écran 2021-12-14 171505](https://user-images.githubusercontent.com/76964599/146037451-051d9dcb-257f-45a3-86a0-9bc53df309fd.png)

