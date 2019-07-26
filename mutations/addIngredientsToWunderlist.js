import gql from 'graphql-tag'

const mutation = gql`
  mutation addToWunderlist($recipeId: ID!, $multiplier: Float) {
    addIngredientsToWunderlist(
      input: { recipeId: $recipeId, multiplier: $multiplier }
    ) {
      node(id: $recipeId) {
        ... on Recipe {
          id
        }
      }
    }
  }
`

export default function({ apollo, recipeId, multiplier }) {
  return apollo.mutate({ mutation, variables: { recipeId, multiplier } })
}
