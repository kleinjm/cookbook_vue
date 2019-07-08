<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-alert type="error" :value="error">{{ error }}</v-alert>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="firstName"
              label="First Name"
              :error-messages="firstNameErrors"
              required
              @input="$v.firstName.$touch()"
              @blur="$v.firstName.$touch()"
            />
            <v-text-field
              v-model="lastName"
              label="Last Name"
              :error-messages="lastNameErrors"
              required
              @input="$v.lastName.$touch()"
              @blur="$v.lastName.$touch()"
            />
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
              >Sign Up</v-btn
            >
          </v-card-actions>
          <p class="font-weight-light mt-4">Already have an account?</p>
          <v-card-actions>
            <v-btn to="/login" router :disabled="loading">Log In</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import LoginMixin from '~/mixins/LoginMixin'
import { fieldErrors } from '~/utils/vuelidate'

export default {
  mixins: [LoginMixin],
  auth: false,
  data() {
    return {
      firstName: '',
      lastName: '',
    }
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) },
    firstName: { required },
    lastName: { required },
  },
  computed: {
    firstNameErrors() {
      return fieldErrors('firstName', this)
    },
    lastNameErrors() {
      return fieldErrors('lastName', this)
    },
  },
  methods: {
    ...mapActions(['setGlobalAlert']),
    async formAction() {
      await this.$axios.post('/users', {
        user: {
          first_name: this.firstName,
          last_name: this.lastName,
          email: this.email,
          password: this.password,
        },
      })

      await this.$auth.login({
        data: {
          user: {
            email: this.email,
            password: this.password,
          },
        },
      })
      this.setGlobalAlert({
        message: 'Please check your email to confirm your address',
        type: 'success',
      })
    },
  },
}
</script>
