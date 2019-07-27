<template>
  <v-card-text>
    <v-form @submit.prevent="submitForm">
      <v-text-field
        v-model="form.name"
        label="Name"
        :error-messages="nameErrors"
        required
        @input="$v.form.name.$touch()"
        @blur="$v.form.name.$touch()"
      />
      <v-text-field
        v-model="form.link"
        label="Link"
        :error-messages="linkErrors"
        required
        @input="$v.form.link.$touch()"
        @blur="$v.form.link.$touch()"
      />
      <v-text-field v-model="form.source" label="Source" required />
      <v-textarea v-model="form.ingredients" label="Ingredients" required />
      <v-textarea v-model="form.steps" label="Steps" required />
      <v-textarea v-model="form.description" label="Description" required />
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
      <v-btn
        color="default"
        :loading="loading"
        :disabled="loading"
        @click="$router.back()"
        >Cancel</v-btn
      >
    </v-card-actions>
  </v-card-text>
</template>
<script>
import { required, url } from 'vuelidate/lib/validators'
import { fieldErrors } from '~/utils/vuelidate'

export default {
  name: 'RecipeForm',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data: function() {
    return {
      form: {},
    }
  },
  computed: {
    linkErrors() {
      return fieldErrors('form.link', this)
    },
    nameErrors() {
      return fieldErrors('form.name', this)
    },
  },
  validations: {
    form: {
      name: { required },
      link: { url },
    },
  },
  methods: {
    submitForm() {
      this.$v.$touch()
      if (this.$v.$invalid) return

      this.$emit('submitForm', this.form)
    },
  },
}
</script>
