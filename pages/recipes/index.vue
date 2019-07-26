<template>
  <div>
    <v-card>
      <v-alert type="error" :value="displayErrors">{{ errors }}</v-alert>
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
        <v-data-table
          v-model="selectedRecipes"
          item-key="uuid"
          show-select
          class="elevation-1"
          :headers="headers"
          :items="recipes"
          :search="search"
        >
          <template v-slot:item.name="{ item }">
            <nuxt-link :to="recipeRoute(item.uuid)">{{ item.name }}</nuxt-link>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon small class="mr-2" @click="editRecipe(item)">
              edit
            </v-icon>
            <v-icon small @click="deleteRecipe(item)">
              delete
            </v-icon>
          </template>
        </v-data-table>
      </no-ssr>
    </v-card>
  </div>
</template>
<script>
import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import { allRecipesQuery } from '~/queries/recipes'
import deleteRecipe from '~/mutations/deleteRecipe'

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
        { text: 'Actions', value: 'action', sortable: false },
      ],
      recipes: [],
      search: '',
      selectedRecipes: [],
      errors: [],
    }
  },
  computed: {
    displayErrors() {
      return !_isEmpty(this.errors)
    },
  },
  methods: {
    recipeRoute(recipeId) {
      return {
        name: 'recipes-recipeId',
        params: { recipeId },
      }
    },
    editRecipe(recipe) {
      this.$router.push(`recipes/${recipe.uuid}`)
    },
    deleteRecipe(recipe) {
      if (!confirm('Are you sure you want to delete this recipe?')) return
      deleteRecipe({ apollo: this.$apollo, recipeId: recipe.id }).catch(
        (errors) => {
          this.errors = errors
        },
      )
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
