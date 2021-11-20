<template>
  <b-container>
    <b-row align-h="center">
      <b-col class="text-center" sm="10" lg="8">
        <router-link to="/login">
          <img class="icon-name" src="../assets/images/icon-name.png" alt="Logo and company name" />
        </router-link>
        <h1 class="pb-4">Bienvenue sur votre réseau social d'entreprise</h1>
      </b-col>
    </b-row>

    <!--Formulaire d'inscription-->
    <b-row align-h="center">
      <b-col cols="12" sm="10" md="10" lg="8">
        <h2 class="mb-3" align="center">Inscrivez-vous</h2>
        <b-row>
          <b-col cols="12" offset-sm="1" sm="10" offset-md="1" md="10" offset-lg="2" lg="8">
            <b-card class="identification-box">
              <div align="center">
                <b-form>
                  <label for="pseudo">Pseudo *</label>
                  <b-form-input
                    id="input-1"
                    class="mb-3 input"
                    v-model="pseudo"
                    maxlength="10"
                    @input="lenghtCheck(10, pseudo, 'pseudo')"
                    required
                    placeholder="Entrez votre pseudo"
                    @keyup.enter="signup"
                  ></b-form-input>
                  <label for="email-adress">Adresse email *</label>
                  <b-form-input
                    id="input-2"
                    class="mb-3 input"
                    v-model="email"
                    type="email"
                    maxlength="30"
                    @input="lenghtCheck(30, email, 'email')"
                    required
                    placeholder="Entrez votre adresse email"
                    @keyup.enter="signup"
                  ></b-form-input>
                  <label for="password">Mot de passe *</label>
                  <b-form-input
                    id="input-3"
                    class="input"
                    v-model="password"
                    type="password"
                    maxlength="16"
                    @input="lenghtCheck(16, password, 'mot de passe')"
                    required
                    placeholder="Entrez votre mot de passe"
                    @keyup.enter="signup"
                  ></b-form-input>
                </b-form>
              </div>
            </b-card>
            <p class="error-message font-weight-bold text-center mt-2">{{ error }}</p>
          </b-col>
        </b-row>
        <b-row class="mt-2 switch-page">
          <b-col
            align="center"
            cols="12"
            offset-sm="1"
            sm="6"
            offset-md="2"
            md="5"
            offset-lg="2"
            lg="5"
          >
            <p>
              Déjà inscrit ?
              <router-link to="/login">Se connecter</router-link>
            </p>
          </b-col>
          <b-col align="center" class="mb-3" cols="12" sm="4" md="3" lg="3">
            <b-button pill class="submit-button" type="submit" @click="signup">Inscription</b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { url } from "../main";

export default {
  name: "Signup",
  data() {
    return {
      email: "",
      pseudo: "",
      password: "",
      show: true,
      error: "",
      pseudoRegex: /^[a-zA-Z0-9]{3,}$/,
      emailRegex: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      passwordRegex: /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/,
    };
  },
  methods: {
    //Fonction de vérification de la longueur des données
    lenghtCheck(length, object, message) {
      if (object.length === length) {
        this.error = "Votre " + message + " est trop long";
      } else {
        this.error = "";
      }
    },
    //Fonction d'inscription
    signup() {
      let newUser = {
        pseudo: this.pseudo,
        email: this.email,
        password: this.password,
        profil_picture: url.substring(0, url.length - 4) + "images/avatar.png",
      };
      if (!this.emailRegex.test(this.email)) {
        return (this.error = "Vous devez renseigner une adresse email valide");
      } else if (!this.pseudoRegex.test(this.pseudo)) {
        return (this.error =
          "Votre pseudo doit contenir au moins 3 caractères");
      } else if (!this.passwordRegex.test(this.password)) {
        return (this.error =
          "Votre mot de passe doit contenir au moins 8 caractères et au moins 1 lettre et 1 chiffre");
      }
      this.$http.post(url + "users", newUser)
        .then((res) => {
          if (res.status === 200) {
            this.$http.post(url + "users/login", newUser) //si inscription fonctionne = login
              .then((res) => {
                if (res.status === 200) {
                  localStorage.setItem("currentUser", JSON.stringify(res.data));
                  this.$router.push("/");
                }
              })
              .catch(() => {
                localStorage.clear();
                this.error = "Un problème est survenu, veuillez réessayer";
              });
          }
        })
        .catch((err) => {
          if (err.response.status === 409) {
            this.error = "Adresse email déjà utilisée";
          } else {
            this.error = "Un problème est survenu, veuillez réessayer";
          }
        });
    },
  },
};
</script>

<style scoped>
.identification-box {
  background-color: #ffd7d7;
}
.submit-button {
  background-color: #ffd7d7;
  color: black;
  border: solid 1px #fd2d01;
}
.submit-button:hover {
  background: #ffb3b3;
}
h1 {
  font-size: 1.5em;
}
h2 {
  font-size: 1.4em;
}
.icon-name {
  height: 250px;
}
.error-message {
  color: #fd2d01;
}
.input {
  width: 20em;
}
.input:hover {
  outline: none !important;
  border: solid 1px #fd2d01;
  box-shadow: 0 0 10px #ffd7d7;
}
.switch-page {
  line-height: 50px;
}
@media screen and (max-width: 870px) {
  .icon-name {
    height: 200px;
  }
  h1 {
    font-size: 1.2em;
  }
  h2 {
    font-size: 1.3em;
  }
  .input {
    width: 18em;
  }
}
@media screen and (max-width: 560px) {
  .icon-name {
    height: 150px;
  }
  h1 {
    display: 1em;
  }
  h2 {
    font-size: 1.2em;
  }
  .input {
    width: 17em;
  }
  .switch-page {
    line-height: 30px;
  }
}
@media screen and (max-width: 440px) {
  h1 {
    display: none;
  }
  .input {
    width: 15em;
  }
}
</style>