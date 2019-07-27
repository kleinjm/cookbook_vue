<template>
  <v-layout wrap>
    <v-flex xs12>
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
          <v-list-item
            v-for="ingredient in recipe.ingredients.nodes"
            :key="ingredient.id"
          >
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
import { recipeShowQuery } from '~/queries/recipes'

const DATE_FORMAT = { year: 'numeric', month: 'long', day: 'numeric' }

export default {
  filters: {
    formattedDate(value) {
      return new Date(value).toLocaleDateString(undefined, DATE_FORMAT)
    },
  },
  data() {
    return {
      selectedIngredient: -1,
      selectedStep: -1,
      recipe: {},
    }
  },
  methods: {
    ingredientText({ quantity, unit, name }) {
      return [quantity, unit, name].join(' ')
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
