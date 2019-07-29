<template>
  <v-layout>
    <v-flex>
      <v-card v-if="!$apollo.loading">
        <v-alert type="error" :value="displayErrors">{{ errors }}</v-alert>
        <RecipeForm
          :formData="formData"
          :loading="loading"
          @submitForm="submitForm"
        />
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import _isEmpty from 'lodash/isEmpty'
import _map from 'lodash/map'
import updateRecipe from '~/mutations/updateRecipe'
import RecipeForm from '~/components/recipes/form'
import { recipeShowQuery } from '~/queries/recipes'
import { ingredientText } from '~/utils/recipe'

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
    formData() {
      // recipe data comes in as lists that need to be normalized for the form
      // do not directly assign to recipe as it will update the cached version
      const formData = Object.assign({}, this.recipe)
      formData.ingredients = _map(formData.ingredients.nodes, (ingredient) => {
        return ingredientText(ingredient)
      }).join('\n')
      formData.steps = this.recipe.stepList.join('\n')
      return formData
    },
  },
  methods: {
    submitForm(form) {
      this.loading = true

      return updateRecipe({ apollo: this.$apollo, form })
        .then(({ data }) => {
          if (!data.updateRecipe.success) throw data.updateRecipe.errors

          this.$router.push({ path: `/recipes/${this.recipe.uuid}` })
        })
        .catch((e) => {
          this.errors = e.join('\n')
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
  apollo: {
    recipe: {
      query: recipeShowQuery,
      variables() {
        return { uuid: this.$route.params.recipeId }
      },
      result({ data: { recipe } }) {
        return recipe
      },
    },
  },
}
</script>
