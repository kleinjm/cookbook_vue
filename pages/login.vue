<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-alert type="error" :value="error">{{ error }}</v-alert>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              label="Email"
              :error-messages="emailErrors"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            />
            <v-text-field
              v-model="password"
              label="Password"
              :error-messages="passwordErrors"
              required
              :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
              :type="passwordVisible ? 'text' : 'password'"
              counter
              @click:append="passwordVisible = !passwordVisible"
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
              @keyup.enter="submitForm"
            />
          </v-form>
          <v-card-actions>
            <v-btn
              color="info"
              :loading="loading"
              :disabled="loading"
              @click="submitForm"
              >Log In</v-btn
            >
          </v-card-actions>
          <p class="font-weight-light mt-4">Don't have an account?</p>
          <v-card-actions>
            <v-btn to="/sign-up" router :disabled="loading">Sign Up</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import LoginMixin from '~/mixins/LoginMixin'

export default {
  mixins: [LoginMixin],
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) },
  },
  methods: {
    async formAction() {
      await this.$auth.login({
        data: {
          user: {
            email: this.email,
            password: this.password,
          },
        },
      })
      const token = this.$auth.$storage._state['_token.local'].split(
        'Bearer ',
      )[1]
      await this.$apolloHelpers.onLogin(token)
    },
  },
}
</script>
