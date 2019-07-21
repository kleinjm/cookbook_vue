import gql from 'graphql-tag'
import { AllFieldsFragment } from '~/queries/recipes.js'

const mutation = gql`
  mutation createRecipe(
    $name: String!
    $ingredients: String
    $link: String
    $notes: String
    $source: String
    $steps: String
    $tagIds: [ID!]
  ) {
    createRecipe(
      input: {
        name: $name
        ingredients: $ingredients
        link: $link
        notes: $notes
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
    variables: {
      name,
      ...form,
    },
  })
}
