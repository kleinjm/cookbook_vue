import gql from 'graphql-tag'
import _findIndex from 'lodash/findIndex'
import { allRecipesQuery } from '~/queries/recipes'

const mutation = gql`
  mutation deleteRecipe($recipeId: ID!) {
    deleteRecipe(input: { recipeId: $recipeId }) {
      recipe {
        id
      }
      success
      errors
    }
  }
`

export default function({ apollo, recipeId }) {
  return apollo.mutate({
    mutation,
    variables: { recipeId },
    update: (store, { data: { deleteRecipe } }) => {
      if (!deleteRecipe.success) throw deleteRecipe.errors

      // Read the data from our cache for this query.
      const data = store.readQuery({ query: allRecipesQuery })

      // TL;DR need to use .splice to update the apollo cache so views are
      //   responsive
      //
      // See issue https://github.com/apollographql/apollo-client/issues/3909#issuecomment-475448985
      // v-list caveat https://vuejs.org/v2/guide/list.html#Caveats
      const index = _findIndex(data.recipes.nodes, {
        id: deleteRecipe.recipe.id,
      })
      // Array.splice https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
      data.recipes.nodes.splice(index, 1)

      // Write our data back to the cache.
      store.writeQuery({ query: allRecipesQuery, data })
    },
  })
}
