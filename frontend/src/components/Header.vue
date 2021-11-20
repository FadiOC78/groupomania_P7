<template>
  <b-container class="mb-4">
    <b-navbar class="pt-3" toggleable="sm" type="light">
      <b-navbar-brand class="header-box" @click="reloadPage">
        <router-link to="/">
          <img class="logo" src="../assets/images/icon-header.png" alt="Logo and company name" />
        </router-link>
      </b-navbar-brand>
      <b-navbar-toggle class="nav-collapse" target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-show="!displayProfile" @click="switchDisplayProfile">Profil</b-nav-item>
          <b-nav-item v-show="displayProfile" @click="switchDisplayProfile">Forum</b-nav-item>
          <b-nav-item @click="logout">Déconnexion</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </b-container>
</template>
 
<script>
export default {
  name: "Header",
  props: {
    displayProfile: {
      type: Boolean,
    },
  },
  methods: {
    switchDisplayProfile() {
      let emitDisplayProfile = !this.displayProfile;
      this.$parent.getPosts();
      this.$emit("display-profile", emitDisplayProfile);
    },
    disableDisplayProfile() {
      this.$emit("display-profile", false);
    },
    reloadPage() {
      location.reload();
    },
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.logo {
  height: 50px;
}
.nav-item {
  text-align: end;
}
@media screen and (max-width: 420px) {
  .logo {
    width: 100%;
    height: 100%;
  }
  .header-box {
    width: 150px;
  }
}
</style>