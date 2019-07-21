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
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.timesCooked }}</td>
        <td class="text-xs-right">{{ props.item.upNext }}</td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { allRecipesQuery } from '~/queries/recipes'
import { flattenEdgeNodes } from '~/utils/apollo'

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
  apollo: {
    recipes: {
      query: allRecipesQuery,
      update: flattenEdgeNodes,
    },
  },
}
</script>
