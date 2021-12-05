<template>
  <b-container>
    <b-row align-h="center">
      <b-col class="text-center" sm="10" lg="8">
        <img class="icon-name" src="../assets/images/icon-name.png" alt="Logo and company name" />
        <h1 class="pb-4">Bienvenue sur votre réseau social d'entreprise</h1>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col cols="12" sm="10" md="10" lg="8">
        <h2 class="mb-3" align="center">Connectez-vous</h2>

        <!--Formulaire de connexion-->
        <b-row>
          <b-col cols="12" offset-sm="1" sm="10" offset-md="2" md="8" offset-lg="2" lg="8">
            <b-card align="center" class="identification-box">
              <div align="center">
                <b-form>
                  <label for="email-adress">Adresse email *</label>
                  <b-form-input
                    class="mb-3 input"
                    id="input-1"
                    v-model="email"
                    type="email"
                    required
                    placeholder="Entrez votre adresse email"
                    @keyup.enter="login"
                  ></b-form-input>
                  <label for="password">Mot de passe *</label>
                  <b-form-input
                    class="input"
                    id="input-2"
                    v-model="password"
                    type="password"
                    required
                    placeholder="Entrez votre mot de passe"
                    @keyup.enter="login"
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
              Pas de compte ?
              <router-link to="/signup">S'inscrire</router-link>
            </p>
          </b-col>
          <b-col align="center" class="mb-3" cols="12" sm="4" md="3" lg="3">
            <b-button pill class="submit-button" type="submit" @click="login">Connexion</b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { url } from "../main";

export default {
  name: "Login",
  data() {
    return {
      email: "", 
      password: "",
      error: "",
    };
  },
  methods: {
    //Fonction de connexion
    login() {
      const user = {
        email: this.email,
        password: this.password,
      };
      this.$http.post(url + "users/login", user)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("currentUser", JSON.stringify(res.data));
            this.$router.push("/");
          }
        })
        .catch((err) => {
          localStorage.clear();
          if (err.response.status === 401) {
            this.error =
              "Nous ne pouvons pas vous connecter. Vérifiez vos identifiants.";
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
.icon-name {
  height: 250px;
}
h1 {
  font-size: 1.5em;
}
h2 {
  font-size: 1.4em;
}
.submit-button {
  background-color: #ffd7d7;
  color: black;
  border: solid 1px #fd2d01;
}
.submit-button:hover {
  background: #ffb3b3;
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