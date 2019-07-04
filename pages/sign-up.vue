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
            />
          </v-form>
          <v-card-actions>
            <v-btn @click="signUp">Sign Up</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import { handleErrors } from '~/utils/vuelidate'

export default {
  mixins: [validationMixin],
  auth: 'guest',
  data() {
    return {
      email: '',
      error: null,
      firstName: '',
      lastName: '',
      password: '',
      passwordVisible: false,
    }
  },
  validations: {
    email: { required, email },
    firstName: { required },
    lastName: { required },
    password: { required, minLength: minLength(8) },
  },
  computed: {
    firstNameErrors() {
      return handleErrors('firstName', this)
    },
    lastNameErrors() {
      return handleErrors('lastName', this)
    },
    emailErrors() {
      return handleErrors('email', this)
    },
    passwordErrors() {
      return handleErrors('password', this)
    },
  },
  methods: {
    async signUp() {
      this.$v.$touch()
      if (this.$v.$invalid) return

      try {
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

        this.$router.push('/')
      } catch (e) {
        this.error = e.response.data.message
      }
    },
  },
}
</script>
