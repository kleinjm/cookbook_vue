import _each from 'lodash/each'
import _findIndex from 'lodash/findIndex'
import _isEmpty from 'lodash/isEmpty'
import _isNil from 'lodash/isNil'
import gql from 'graphql-tag'
import { upNextRecipesQuery } from '~/queries/recipes'

const mutation = gql`
  mutation updateUpNext($recipeIds: [ID!], $upNext: Float!) {
    updateUpNext(input: { recipeIds: $recipeIds, upNext: $upNext }) {
      success
      errors
      recipes {
        id
        uuid
        name
        upNext
      }
    }
  }
`

export default function updateUpNextMutation({ apollo, recipeIds, upNext }) {
  return apollo
    .mutate({
      mutation,
      variables: {
        recipeIds,
        upNext,
      },
      update: (store, { data: { updateUpNext } }) => {
        if (!updateUpNext.success) throw updateUpNext.errors

        const data = store.readQuery({ query: upNextRecipesQuery })

        // add an empty array if ther are no recipes
        if (_isNil(data.recipes) || _isEmpty(data.recipes)) {
          data.recipes = { nodes: [] }
        }

        // add or remove recipes from the list
        if (upNext === 0) {
          _each(recipeIds, (id) => {
            const index = _findIndex(data.recipes.nodes, { id })
            data.recipes.nodes.splice(index, 1)
          })
        } else {
          data.recipes.nodes.push(...updateUpNext.recipes)
        }

        // Write our data back to the cache.
        store.writeQuery({ query: upNextRecipesQuery, data })
      },
    })
    .then((response) => response.data.updateUpNext.recipes)
}
