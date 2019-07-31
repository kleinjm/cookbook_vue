<template>
  <v-layout wrap>
    <v-flex class="center-text" sm12>
      <h2 class="font-weight-thin display-3">Up Next</h2>
      <p class="subtitle-1 font-weight-light font-italic">
        Selected recipes ready to shop for and cook
      </p>
    </v-flex>
    <v-flex v-for="recipe in recipes" :key="recipe.id" sm4>
      <v-card>
        <nuxt-link
          class="no-underline"
          :to="{
            name: 'recipes-recipeId',
            params: { recipeId: recipe.uuid },
          }"
        >
          <v-img
            :src="require('~/assets/images/recipe-placeholder.jpg')"
            class="white--text"
            height="200px"
            gradient="to bottom, rgba(191, 187, 187, 0.41), rgba(0,0,0,.5)"
          >
            <v-card-title class="fill-height align-end">
              {{ recipe.name }}
            </v-card-title>
          </v-img>
        </nuxt-link>

        <v-card-actions>
          <v-spacer></v-spacer>

          <UpNextButton :recipe="recipe" />
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import _get from 'lodash/get'
import { upNextRecipesQuery } from '~/queries/recipes'
import UpNextButton from '~/components/recipes/up-next-button'

export default {
  name: 'UpNext',
  components: { UpNextButton },
  apollo: {
    recipes: {
      query: upNextRecipesQuery,
      update({ recipes }) {
        return _get(recipes, 'nodes', [])
      },
    },
  },
}
</script>
