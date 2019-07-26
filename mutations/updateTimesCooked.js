import gql from 'graphql-tag'

const mutation = gql`
  mutation updateTimesCooked($recipeId: ID!, $timesCooked: Int) {
    updateRecipe(input: { recipeId: $recipeId, timesCooked: $timesCooked }) {
      node(id: $recipeId) {
        ... on Recipe {
          id
          timesCooked
          lastCooked
        }
      }
    }
  }
`

export default function updateTimesCooked({ apollo, recipeId, timesCooked }) {
  return apollo.mutate({
    mutation,
    variables: {
      recipeId,
      timesCooked,
    },
  })
}
