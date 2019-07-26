<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-alert type="error" :value="displayErrors">{{ errors }}</v-alert>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="form.name"
              label="Name"
              :error-messages="nameErrors"
              required
              @input="$v.form.name.$touch()"
              @blur="$v.form.name.$touch()"
            />
          </v-form>
          <v-card-actions>
            <v-btn
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
import { required } from 'vuelidate/lib/validators'
import { extractUuid } from '~/utils/apollo'
import createRecipe from '~/mutations/create-recipe'
import { fieldErrors } from '~/utils/vuelidate'

export default {
  data() {
    return {
      errors: [],
      loading: false,
      form: {
        name: '',
      },
    }
  },
  validations: {
    form: { name: { required } },
  },
  computed: {
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
