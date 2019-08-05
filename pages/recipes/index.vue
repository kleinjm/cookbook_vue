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
          :loading="$apollo.loading"
          loading-text="Recipes loading ... Please wait"
        >
          <template v-slot:item="{ item, select, isSelected }">
            <tr :class="rowClass(item)">
              <td class="text-start">
                <div @click="select(!isSelected)">
                  <v-icon v-if="isSelected">mdi-checkbox-marked</v-icon>
                  <v-icon v-else>mdi-checkbox-blank-outline</v-icon>
                </div>
              </td>
              <td class="text-left">
                <nuxt-link
                  :to="recipeRoute(item.uuid)"
                  class="no-underline text--white"
                  >{{ item.name | truncate(70) }}</nuxt-link
                >
              </td>
              <td class="text-start">
                <v-icon small class="mr-2" @click="editRecipe(item)">
                  edit
                </v-icon>
                <v-icon small @click="deleteRecipe(item)">
                  delete
                </v-icon>
              </td>
            </tr>
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
  filters: {
    truncate(text, length) {
      if (text.length <= length) return text
      const truncated = text.substring(0, length - 3)
      return `${truncated}...`
    },
  },
  data() {
    return {
      headers: [
        {
          text: 'Name',
          align: 'left',
          value: 'name',
        },
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
    rowClass({ upNext }) {
      let selectedColor = ''
      if (this.$vuetify.theme.dark) {
        selectedColor = 'grey darken-2'
      } else {
        selectedColor = 'light-blue lighten-5'
      }

      return upNext ? selectedColor : ''
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
