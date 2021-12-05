<template>
  <b-container display="flex">
    <Header @display-profile="switchDisplayProfile" :displayProfile="displayProfile" />
    <Profile
      @display-profile="switchDisplayProfile"
      v-show="displayProfile"
      :userId="userId"
      :token="token"
      :displayProfile="displayProfile"
    />

    <!--Insertion post et image-->
    <div v-show="!displayPostByProfile">
      <b-row class="mb-2" v-show="!displayProfile">
        <b-col cols="4" sm="3" md="2" lg="2" align="center">
          <div
            class="image-input"
            :style="{ 'background-image': `url(${imageData})` }"
            @click="chooseImage"
          >
            <span v-if="!imageData" class="image-area">Insérer une image</span>
            <input type="file" class="file-input" ref="file" @input="onSelectFile" />
          </div>
          <a
            @click="removeImage"
            v-show="displayRemoveImage"
            class="remove-image"
            href="#"
            style="display: inline"
          >&#215;</a>
        </b-col>
        <b-col cols="8" sm="9" md="8" lg="8">
          <b-form-textarea
            maxlength="2047"
            id="textarea-rows"
            placeholder="Que voulez-vous dire ?"
            @input="lenghtCheck"
            rows="3"
            class="text-area"
            v-model="postTextArea"
          ></b-form-textarea>
          <p class="error-message font-weight-bold text-center mt-2">{{ postError }}</p>
        </b-col>
        <b-col cols="12" sm="12" md="2" lg="2" align="center">
          <div class="button-col">
            <b-button pill size="sm" class="mb-3 send-button" @click="createPost">Envoyer</b-button>
            <b-button pill size="sm" class="mb-3 reset-button" @click="resetPost">Annuler</b-button>
          </div>
        </b-col>
      </b-row>
    </div>

    <!--Affichage de l'en-tête d'un utilisateur-->
    <b-row v-show="displayPostByProfile" class="mb-4">
      <b-col align="center" offset-lg="2" lg="3">
        <div
          class="profile-picture mb-2"
          :style="{ 'background-image': `url(${userProfilePicture})` }"
          alt="User image"
        ></div>
      </b-col>
      <b-col align="center" lg="5">
        <h1>Profil de {{ userName }}</h1>
        <p>{{ userEmail }}</p>
        <div>
          <b-button
            pill
            size="sm"
            class="back-button"
            @click="
              switchDisplayPostByProfile(false);
              getPosts();
            "
          >Retour vers le forum</b-button>
        </div>
      </b-col>
    </b-row>

    <!--Affichage des posts d'un ou de plusieurs utilisateurs-->
    <b-row v-for="postData in posts" :key="postData.id" v-show="!displayProfile">
      <b-col>
        <Post
          @users-posts="usersPosts"
          @post-by-profile="switchDisplayPostByProfile"
          :post="postData"
          :admin="admin"
          :userId="userId"
          :token="token"
        ></Post>
      </b-col>
    </b-row>
  </b-container>
</template>
 
<script>
import Header from "./Header.vue";
import Post from "./Post.vue";
import Profile from "./Profile.vue";
import { url } from "../main";

export default {
  name: "Forum",
  components: {
    Header,
    Post,
    Profile,
  },

  data() {
    return {
      postError: "",
      userProfilePicture: "",
      userName: "",
      userEmail: "",
      displayPostByProfile: false,
      imageData: null,
      displayCommands: false,
      displayProfile: false,
      posts: [],
      users: [],
      token: "",
      userId: "",
      admin: false,
      error: {},
      postTextArea: "",
      testKey: "",
      file: "",
    };
  },
  watch: {
    //Surveille les posts dans le cas de rechargement
    posts() {
      if (this.posts !== "undefined" && this.posts.length > 0) {
        //evite erreur si aucun post publié
        this.userProfilePicture = this.posts[0].userProfilePicture;
        this.userName = this.posts[0].user;
        if (this.posts[0].email.startsWith("ancien employé")) {
          this.userEmail = "";
        } else {
          this.userEmail = this.posts[0].email;
        }
      }
    },
    displayProfile() {
      if (this.displayProfile === true) {
        this.displayPostByProfile = false;
      }
    },
  },
  computed: {
    headers() {
      return { headers: { Authorization: this.token, userId: this.userId } };
    },
    //data dynamique qui contrôle l'affichage de la croix de suppression de l'image
    displayRemoveImage() {
      if (this.imageData) {
        return true;
      } else {
        return false;
      }
    },
  },
  //Validation du state de l'utilisateur
  created() {
    this.getUser();
  },
  //construction du composant post
  mounted() {
    this.getPosts();
  },

  methods: {
    lenghtCheck() {
      if (this.postTextArea.length === 2047) {
        this.postError = "Votre message est trop long";
      } else {
        this.postError = "";
      }
    },
    removeImage() {
      this.file = "";
      this.imageData = null;
    },
    chooseImage() {
      this.$refs.file.click();
    },
    onSelectFile() {
      //fonction qui récupère l'image du stockage du navigateur pour la préparer pour l'afficher et l'enregistrer
      const input = this.$refs.file;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imageData = event.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.file = this.$refs.file.files[0];
      }
    },
    createPost() {
      if (!this.postTextArea && !this.imageData) {
        this.postError = "Votre publication est vide";
        setTimeout(() => {
          this.postError = "";
        }, 3000);
        return;
      }
      let formData = new FormData();
      formData.append("image", this.file);
      formData.append("content", this.postTextArea);
      formData.append("user_id", this.userId);
      this.$http.post(url + "posts", formData, this.headers)
        .then(() => {
          this.resetPost();
          this.getPosts();
        })
        .catch(() => {
          this.postError = "Un problème est survenu, veuillez réessayer";
        });
    },
    getPosts() {
      //utilisée pour charger les posts et pour recharger le composant
      this.$http.get(url + "posts", this.headers).then((res) => {
        this.posts = res.data;
      });
    },
    usersPosts(data) {
      //charger post par utilisateur
      this.posts = data;
    },
    switchDisplayPostByProfile(data) {
      this.displayPostByProfile = data;
    },
    switchDisplayProfile(data) {
      this.displayProfile = data;
    },
    //lancé a created pour vérifier l'authenticité du user et si admin ou pas
    getUser() {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser) {
        this.token = currentUser.token;
        this.userId = currentUser.userId;
        this.$http.get(url + "users/" + currentUser.userId, this.headers)
          .then((res) => {
            this.admin = res.data.admin;
          })
          .catch(() => {
            this.$router.push("/login");
          });
      } else {
        this.$router.push("/login");
      }
    },
    resetPost() {
      this.imageData = null;
      this.file = "";
      this.postTextArea = "";
      this.$refs.file.value = "";
    },
  },
};
</script>

<style>
body {
  font-family: "montserratregular", Arial, Helvetica, sans-serif;
}
</style>

<style scoped>
.text-area {
  resize: none;
  border: 1px solid#fd2d01;
}
.text-area:focus {
  outline: none !important;
  border: 1px solid #fd2d01;
  box-shadow: 0 0 10px #ffd7d7;
}
.post {
  border-bottom: 0.15em solid #fd2d01;
  padding-right: 0;
  padding-left: 0;
}
.post-header {
  background-color: #ffd7d7;
  font-size: 1em;
  border-radius: 80px 30px;
  text-align: center;
}
.send-button {
  background-color: #ffd7d7;
  color: black;
  border: solid 1px #fd2d01;
}
.send-button:hover {
  background: #ffb3b3;
}
.reset-button {
  background-color: transparent;
  border: solid 1px #ffb3b3;
  color: #e42701;
}
.reset-button:hover {
  background: #ffe4e4;
}
.button-col {
  display: flex;
  width: 7em;
  flex-direction: column;
}
.error-message {
  color: #fd2d01;
}
.image-input {
  width: 5.5em;
  height: 5.5em;
  cursor: pointer;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}
.image-area {
  background: #ffd7d7;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 1em;
  text-align: center;
  border: solid 1px #fd2d01;
  border-radius: 5px;
}
.image-area:hover {
  background: #ffb3b3;
}
.file-input {
  display: none;
}
.profile-picture {
  width: 10em;
  height: 10em;
  cursor: pointer;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 50%;
}
.back-button {
  background-color: transparent;
  border: solid 1px #ffb3b3;
  color: #e42701;
}
.back-button:hover {
  background: #ffe4e4;
}
.remove-image {
  display: none;
  position: absolute;
  top: -0.4em;
  right: 1.5em;
  border-radius: 10em;
  padding: 2px 6px 3px;
  text-decoration: none;
  font: 700 21px/20px sans-serif;
  background: #555;
  border: 3px solid #fff;
  color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(0, 0, 0, 0.3);
}
.remove-image:hover {
  background: #e54e4e;
}
.remove-image:active {
  background: #e54e4e;
}
@media screen and (max-width: 767px) {
  .button-col {
    flex-direction: row-reverse;
    justify-content: space-evenly;
    width: auto;
  }
}
@media screen and (max-width: 560px) {
  .profile-picture {
    width: 8em;
    height: 8em;
  }
  h1 {
    font-size: 2em;
  }
}
</style>