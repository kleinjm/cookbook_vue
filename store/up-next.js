import _map from 'lodash/map'
import _filter from 'lodash/filter'
import _includes from 'lodash/includes'
import { fetchUpNextRecipes } from '~/queries/recipes'

export const state = {
  upNextRecipes: [],
}

export const getters = {
  upNextRecipes: (state) => {
    return state.upNextRecipes
  },
}

export const mutations = {
  clearUpNextRecipes(state) {
    state.upNextRecipes = []
  },
  addUpNextRecipe(state, upNextRecipe) {
    const recipeIds = _map(state.upNextRecipes, 'id')
    if (!_includes(recipeIds, upNextRecipe.id)) {
      // only take fields we care about
      const recipe = (({ id, upNext }) => ({ id, upNext }))(upNextRecipe)
      state.upNextRecipes.push(recipe)
    }
  },
  removeUpNextRecipe(state, upNextRecipe) {
    state.upNextRecipes = _filter(state.upNextRecipes, (recipe) => {
      return recipe.id !== upNextRecipe.id
    })
  },
  setUpNextRecipes(state, upNextRecipes) {
    state.upNextRecipes = _map(upNextRecipes, (recipe) => {
      return { id: recipe.id, upNext: recipe.upNext }
    })
  },
}

export const actions = {
  addUpNextRecipe(context, upNextRecipe) {
    context.commit('addUpNextRecipe', upNextRecipe)
  },
  removeUpNextRecipe(context, upNextRecipe) {
    context.commit('removeUpNextRecipe', upNextRecipe)
  },
  clearUpNextRecipes(context) {
    context.commit('clearUpNextRecipes')
  },
  fetchUpNextRecipes(context, apollo) {
    fetchUpNextRecipes({ apollo }).then((recipes) => {
      context.commit('setUpNextRecipes', recipes)
    })
  },
}
