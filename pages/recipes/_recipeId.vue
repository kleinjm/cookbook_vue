<template>
  <v-container>
    <v-layout>
      <v-flex>
        <h3 class="display-2">{{ recipe.name }}</h3>
      </v-flex>
    </v-layout>
  </v-container>
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
