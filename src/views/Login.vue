
<template>
  <div>
      <v-row class="pa-4">
        <v-col cols="1" sm="2" md="3" lg="4" xl="4">
        </v-col>
        
        <v-col cols="10" sm="8" md="6" lg="4" xl="4">
          <v-card
            class="pa-4"
            elevation="4"
            tile

          >
            <p class="text-h4 text-center mt-4">LOGIN</p>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                class="ml-4 mr-4"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                label="Password"
                hint="At least 8 characters"
                @click:append="show1 = !show1"
                class="ml-4 mr-4"
              ></v-text-field>
              <!-- <a href="#" class="text-decoration-underline text-caption ml-4">Lupa password?</a> -->
              <br>
              <v-row
                align="center"
                justify="center"
              >
                <v-btn
                  class="mt-4 mb-4"
                  @click="submit()"
                > LOGIN
                </v-btn>
              </v-row>
            </v-form>
          </v-card>
        </v-col>
        
        <v-col cols="1" sm="2" md="3" lg="4" xl="4">
        </v-col>
      </v-row>
  </div>
</template>

<script>
import {postUsers} from "../plugins/api"
export default {
  name: 'Login',
  components: {
    
  },
  data : () => ({
    show1: false,
    valid: true,
    password: '',
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => (`The email and password you entered don't match`),
    },
     email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
  }),
  methods: {
    async submit(){
      try{
        const id = await postUsers.loginUser(this.email, this.password)
        // console.log(id);
        this.$router.push({ path: `/${id}`})
      }catch{
        this.$router.push({ path: `/`})
      }
    }
  }
}
</script>