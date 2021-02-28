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
            <p class="text-h4 text-center mt-4">Sign-in</p>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
                <v-text-field
                    v-model="user.name"
                    :rules="[rule]"
                    label="Name"
                    class="ml-4 mr-4"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="user.birthday"
                    :rules="[rule]"
                    label="Birthday"
                    class="ml-4 mr-4"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="user.phoneNumber"
                    :rules="[rule]"
                    label="Phone Number"
                    class="ml-4 mr-4"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="user.email"
                    :rules="emailRules"
                    label="E-mail"
                    class="ml-4 mr-4"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="user.password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    label="Password"
                    hint="At least 8 characters"
                    @click:append="show1 = !show1"
                    class="ml-4 mr-4"
                ></v-text-field>
                <v-text-field
                    v-model="confirmPassword"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    label="Confirm Password"
                    name="confirmPassword"
                    :type="show2 ? 'text' : 'password'"
                    :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                    @click:append="show2 = !show2"
                    class="ml-4 mr-4"
                ></v-text-field>
                <br>
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-btn
                    class="mt-4 mb-4"
                    @click="submit()"
                    > SIGN IN
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
import { postUsers } from "@Plugins/api.js";
export default {
  name: 'Signin',
  components: {
    
  },
  data : () => ({
    show1: false,
    show2: false,
    valid: true,
    user : {
        name: '',
        password: '',
        birthday: '',
        phoneNumber: '',
        email: '',
    },
    rule : v => !!v || 'Required.',
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
    },
    emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    confirmPassword: '',
    confirmPasswordRules: [v => !!v || "Password is required"]
  }),
  methods: {
    submit() {
    //   console.log(this.user);
      postUsers.createUser(this.user).then(result => {
          console.log(result)
          this.$router.push({name:'Login'})
      }).catch(err => console.log(err))
    }
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.user.password === this.confirmPassword || "Password must match";
    }
  }
}
</script>