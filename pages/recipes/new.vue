<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-alert type="error" :value="displayErrors">{{ errors }}</v-alert>
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-text-field
              v-model="form.link"
              label="link"
              :error-messages="linkErrors"
              required
              @input="$v.form.link.$touch()"
              @blur="$v.form.link.$touch()"
            />
            <v-text-field
              v-model="form.name"
              label="Name"
              :error-messages="nameErrors"
              required
              @input="$v.form.name.$touch()"
              @blur="$v.form.name.$touch()"
            />
            <v-text-field v-model="form.source" label="source" required />
            <v-textarea
              v-model="form.ingredients"
              label="ingredients"
              required
            />
            <v-textarea v-model="form.steps" label="steps" required />
            <v-textarea
              v-model="form.description"
              label="description"
              required
            />
          </v-form>
          <v-card-actions>
            <v-btn
              type="submit"
              color="primary"
              :loading="loading"
              :disabled="loading"
              @click="submitForm"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import _isEmpty from 'lodash/isEmpty'
import { required, url } from 'vuelidate/lib/validators'
import { extractUuid } from '~/utils/apollo'
import createRecipe from '~/mutations/createRecipe'
import { fieldErrors } from '~/utils/vuelidate'

export default {
  data() {
    return {
      errors: [],
      loading: false,
      form: {},
    }
  },
  validations: {
    form: {
      name: { required },
      link: { url },
    },
  },
  computed: {
    linkErrors() {
      return fieldErrors('form.link', this)
    },
    nameErrors() {
      return fieldErrors('form.name', this)
    },
    displayErrors() {
      return !_isEmpty(this.errors)
    },
  },
  methods: {
    submitForm() {
      this.$v.$touch()
      if (this.$v.$invalid) return

      this.loading = true

      return createRecipe({
        apollo: this.$apollo,
        form: this.form,
      })
        .then(({ data }) => {
          if (!data.createRecipe.success) throw data.createRecipe.errors
          const recipe = data.createRecipe.recipe
          const uuid = extractUuid(recipe.id)
          this.$router.push({ path: `/recipes/${uuid}` })
        })
        .catch((e) => {
          this.errors = e
        })
    },
  },
}
</script>
