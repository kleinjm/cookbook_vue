<template>
  <div>
    <v-card>
      <v-card-title>
        Recipes
        <v-btn text icon router to="/recipes/new">
          <v-icon large class="primary--text">
            add_circle
          </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <no-ssr>
        <v-data-table :headers="headers" :items="recipes" :search="search">
          <template v-slot:item.name="{ item }">
            <nuxt-link :to="recipeRoute(item.id)">{{ item.name }}</nuxt-link>
          </template>
          <template v-slot:item.timesCooked="{ item }">
            {{ item.timesCooked }}
          </template>
          <template v-slot:item.timesCooked="{ item }">
            {{ item.upNext }}
          </template>
        </v-data-table>
      </no-ssr>
    </v-card>
  </div>
</template>
<script>
import _get from 'lodash/get'
import { allRecipesQuery } from '~/queries/recipes'
import { extractUuid } from '~/utils/apollo'

export default {
  data() {
    return {
      headers: [
        {
          text: 'Name',
          align: 'left',
          value: 'name',
        },
        { text: 'Times Cooked', value: 'timesCooked' },
        { text: 'Up Next', value: 'upNext' },
      ],
      recipes: [],
      search: '',
    }
  },
  methods: {
    recipeRoute(recipeId) {
      return {
        name: 'recipes-recipeId',
        params: { recipeId: extractUuid(recipeId) },
      }
    },
  },
  apollo: {
    recipes: {
      query: allRecipesQuery,
      update({ recipes }) {
        return _get(recipes, 'nodes', [])
      },
    },
  },
}
</script>
