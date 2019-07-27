import gql from 'graphql-tag'
import { AllFieldsFragment } from '~/queries/recipes'

const mutation = gql`
  mutation updateRecipe(
    $id: ID!
    $name: String
    $ingredients: String
    $link: String
    $description: String
    $source: String
    $steps: String
    $tagIds: [ID!]
  ) {
    updateRecipe(
      input: {
        recipeId: $id
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
      success
      errors
    }
  }
  ${AllFieldsFragment}
`

export default function updateRecipe({ apollo, form }) {
  return apollo.mutate({
    mutation,
    variables: form,
  })
}
