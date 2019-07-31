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
            v-if="recipe.link"
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
        {{ subtitle }}
      </p>
      <p class="font-weight-medium">{{ recipe.description }}</p>
      <v-text-field
        v-model="recipe.timesCooked"
        prepend-inner-icon="mdi-minus-circle-outline"
        append-icon="mdi-plus-circle-outline"
        readonly
        solo
        flat
        rounded
        class="times-cooked center-text"
        @click:prepend-inner="changeCookedAt(-1)"
        @click:append="changeCookedAt(1)"
      ></v-text-field>
      <p>Last Cooked {{ formattedDate(recipe.lastCookedAt) }}</p>
    </v-flex>

    <v-flex sm5>
      <v-list>
        <v-subheader class="headline font-weight-medium"
          >Ingredients</v-subheader
        >
        <v-list-item-group v-model="selectedIngredient" color="primary">
          <template v-for="ingredient in ingredients">
            <div :key="ingredient.id">
              <v-list-item>
                <v-list-item-content>
                  {{ ingredientText(ingredient) }}
                </v-list-item-content>
              </v-list-item>
              <v-divider />
            </div>
          </template>
        </v-list-item-group>
      </v-list>
    </v-flex>

    <v-flex sm7>
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
import updateCookedAtDates from '~/mutations/updateCookedAtDates'

const DATE_FORMAT = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
}

export default {
  components: { RecipeActionMenu, UpNextButton },
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
    subtitle() {
      const formattedDate = this.formattedDate(this.recipe.createdAt)
      if (this.recipe.source !== '' && this.recipe.source !== null) {
        return [this.recipe.source, formattedDate].join(' | ')
      }
      return formattedDate
    },
  },
  methods: {
    formattedDate(value) {
      return new Date(value).toLocaleDateString('en-US', DATE_FORMAT)
    },
    ingredientText(ingredient) {
      return ingredientText(ingredient)
    },
    handleErrors(errors) {
      this.errors = errors
    },
    changeCookedAt(amount) {
      updateCookedAtDates({
        apollo: this.$apollo,
        recipeUuid: this.recipe.uuid,
        amount,
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
