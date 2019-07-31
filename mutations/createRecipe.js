import _isEmpty from 'lodash/isEmpty'
import _isNil from 'lodash/isNil'
import gql from 'graphql-tag'
import { AllFieldsFragment, allRecipesQuery } from '~/queries/recipes'

const mutation = gql`
  mutation createRecipe(
    $name: String!
    $ingredients: String
    $link: String
    $description: String
    $source: String
    $steps: String
    $tagIds: [ID!]
  ) {
    createRecipe(
      input: {
        name: $name
        ingredients: $ingredients
        link: $link
        description: $description
        source: $source
        steps: $steps
        tagIds: $tagIds
      }
    ) {
      recipe {
        ...AllFields
      }
      errors
      success
    }
  }
  ${AllFieldsFragment}
`

export default function createRecipe({ apollo, form }) {
  return apollo.mutate({
    mutation,
    variables: form,
    update: (store, { data: { createRecipe } }) => {
      if (!createRecipe.success) throw createRecipe.errors

      // Read the data from our cache for this query.
      const data = store.readQuery({ query: allRecipesQuery })
      // add an empty array if ther are no recipes
      if (_isNil(data.recipes) || _isEmpty(data.recipes)) {
        data.recipes = { nodes: [] }
      }
      data.recipes.nodes.push(createRecipe.recipe)

      // Write our data back to the cache.
      store.writeQuery({ query: allRecipesQuery, data })
    },
  })
}
