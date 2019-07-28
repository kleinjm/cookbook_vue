<template>
  <v-layout v-if="$apollo.loading" wrap>
    Loading
  </v-layout>
  <v-layout v-else wrap>
    <v-flex xs12>
      <v-alert type="error" :value="errors">{{ errors }}</v-alert>
    </v-flex>
    <v-flex xs1>
      <UpNextButton :recipe="recipe" @errors="handleErrors" />
    </v-flex>
    <v-flex xs10>
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
      <RecipeActionMenu
        :recipeId="recipe.id"
        :recipeUuid="recipe.uuid"
        @errors="handleErrors"
      />
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

    <v-flex xs5>
      <v-list>
        <v-subheader class="headline font-weight-medium"
          >Ingredients</v-subheader
        >
        <v-list-item-group v-model="selectedIngredient" color="primary">
          <template v-for="ingredient in ingredients">
            <v-list-item :key="ingredient.id">
              <v-list-item-content>
                {{ ingredientText(ingredient) }}
              </v-list-item-content>
            </v-list-item>
            <v-divider :key="ingredient.id" />
          </template>
        </v-list-item-group>
      </v-list>
    </v-flex>

    <v-flex xs7>
      <v-list>
        <v-subheader class="headline font-weight-medium">Steps</v-subheader>
        <v-list-item-group v-model="selectedStep" color="primary">
          <v-list-item v-for="(step, index) in recipe.stepList" :key="index">
            <v-list-item-content>
              {{ index + 1 }} {{ step }}
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
import RecipeActionMenu from '~/components/recipes/recipe-action-menu'
import UpNextButton from '~/components/recipes/up-next-button'
import { ingredientText } from '~/utils/recipe'

const DATE_FORMAT = { year: 'numeric', month: 'long', day: 'numeric' }

export default {
  components: { RecipeActionMenu, UpNextButton },
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
      errors: null,
    }
  },
  computed: {
    ingredients() {
      return _get(this.recipe, 'ingredients.nodes', [])
    },
  },
  methods: {
    ingredientText(ingredient) {
      return ingredientText(ingredient)
    },
    handleErrors(errors) {
      this.errors = errors
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
