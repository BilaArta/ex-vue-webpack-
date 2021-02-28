<template>
    <v-toolbar
        
        justify="center"
    >
      <v-toolbar-title class="black--text subtitle-1 text-uppercase">Movie Recommender System</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        <v-btn
            dense
            class="ma-1"
            text
            @click="route('/login')"
        >
            Login
        </v-btn>
        <v-divider vertical></v-divider>
        <v-btn
            dense
            class="ma-1"
            text
            @click="route('/sign-in')"
        >
            Sign In
        </v-btn>
      <hr>
      </div>
    
    </v-toolbar>
</template>

<script>
export default {
    data : () => ({
    }),
    methods: {
        route(url) {
            // console.log(this.$router.currentRoute.path);
            if (url != this.$router.currentRoute.path){
                this.$router.push(url);
            }
        }
    }
}
</script>

<style>
</style>