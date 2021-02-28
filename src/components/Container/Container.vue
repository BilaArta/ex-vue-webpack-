<template>
  <v-app>
    <v-main>
    <Header></Header>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
export default {
  components: {
    Header,
    Footer
    
  }
}
</script>

<style>
</style>