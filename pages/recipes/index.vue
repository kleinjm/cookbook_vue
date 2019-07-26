<template>
  <div>
    <v-btn flat icon router to="/recipes/new">
      <v-icon large class="primary--text">
        add_circle
      </v-icon>
    </v-btn>
    <v-divider />
    <br />
    <v-data-table :headers="headers" :items="recipes" class="elevation-1">
      <template v-slot:items="props">
        <td>
          <nuxt-link :to="recipeRoute(props.item.id)">{{
            props.item.name
          }}</nuxt-link>
        </td>
        <td class="text-xs-right">{{ props.item.timesCooked }}</td>
        <td class="text-xs-right">{{ props.item.upNext }}</td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
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
        return recipes.nodes
      },
    },
  },
}
</script>
