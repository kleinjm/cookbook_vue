<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-alert type="error" :value="displayErrors">{{ errors }}</v-alert>
        <RecipeForm :loading="loading" @submitForm="submitForm" />
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import _isEmpty from 'lodash/isEmpty'
import { extractUuid } from '~/utils/apollo'
import createRecipe from '~/mutations/createRecipe'
import RecipeForm from '~/components/recipes/form'

export default {
  components: { RecipeForm },
  data() {
    return {
      errors: [],
      loading: false,
    }
  },
  computed: {
    displayErrors() {
      return !_isEmpty(this.errors)
    },
  },
  methods: {
    submitForm(form) {
      this.loading = true

      return createRecipe({ apollo: this.$apollo, form })
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
