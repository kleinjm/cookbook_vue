<template>
  <v-layout wrap>
    <v-flex xs11>
      <div class="center-text">
        <h3 class="display-2">
          {{ recipe.name }}
          <a
            class="no-underline"
            :href="recipe.link"
            rel="nofollow"
            target="_blank"
          >
            <v-icon>
              mdi-open-in-new
            </v-icon>
          </a>
        </h3>
      </div>
    </v-flex>
    <v-flex xs1>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>
        <v-list dense flat>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-square-edit-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Edit</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list dense flat>
          <v-list-item @click="deleteRecipe">
            <v-list-item-icon>
              <v-icon>mdi-delete</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Delete</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-flex>

    <v-flex xs12>
      <hr />
      <p class="subtitle-1">
        {{ recipe.source }}
        |
        {{ recipe.createdAt | formattedDate }}
      </p>
      <p class="font-weight-medium">{{ recipe.description }}</p>
    </v-flex>

    <v-flex xs6>
      <v-list>
        <v-subheader>Ingredients</v-subheader>
        <v-list-item-group v-model="selectedIngredient" color="primary">
          <v-list-item v-for="ingredient in ingredients" :key="ingredient.id">
            <v-list-item-content>
              <v-list-item-title
                v-text="ingredientText(ingredient)"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-flex>

    <v-flex xs6>
      <v-list>
        <v-subheader>Steps</v-subheader>
        <v-list-item-group v-model="selectedStep" color="primary">
          <v-list-item v-for="(step, index) in recipe.stepList" :key="index">
            <v-list-item-content>
              <v-list-item-title>{{ index + 1 }} {{ step }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
import _get from 'lodash/get'
import { recipeShowQuery } from '~/queries/recipes'
import deleteRecipe from '~/mutations/deleteRecipe'

const DATE_FORMAT = { year: 'numeric', month: 'long', day: 'numeric' }

export default {
  filters: {
    formattedDate(value) {
      return new Date(value).toLocaleDateString(undefined, DATE_FORMAT)
    },
  },
  data() {
    return {
      recipe: {},
      selectedIngredient: undefined,
      selectedStep: undefined,
    }
  },
  computed: {
    ingredients() {
      return _get(this.recipe, 'ingredients.nodes', [])
    },
  },
  methods: {
    ingredientText({ quantity, unit, name }) {
      return [quantity, unit, name].join(' ')
    },
    deleteRecipe() {
      if (!confirm('Are you sure you want to delete this recipe?')) return

      deleteRecipe({
        apollo: this.$apollo,
        recipeId: this.recipe.id,
      })
        .then(() => {
          this.$router.push('/recipes')
        })
        .catch((errors) => {
          this.errors = errors
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
