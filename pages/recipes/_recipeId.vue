<template>
  <v-layout>
    <v-flex>
      <p>{{ recipe.name }}</p>
    </v-flex>
  </v-layout>
</template>

<script>
import { recipeShowQuery } from '~/queries/recipes'

export default {
  data() {
    return {
      recipe: {},
    }
  },
  apollo: {
    recipe: {
      query: recipeShowQuery,
      variables() {
        return { uuid: this.$route.params.recipeId }
      },
      result({ data }) {},
    },
  },
}
</script>
