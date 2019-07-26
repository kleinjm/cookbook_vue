import gql from 'graphql-tag'

const mutation = gql`
  mutation updateThisWeek($recipeIds: [ID!], $thisWeek: Float!) {
    updateThisWeek(input: { recipeIds: $recipeIds, thisWeek: $thisWeek }) {
      success
      errors
      recipes {
        id
        thisWeek
      }
    }
  }
`

export default function updateThisWeekMutation({
  apollo,
  recipeIds,
  thisWeek,
}) {
  return apollo
    .mutate({
      mutation,
      variables: {
        recipeIds,
        thisWeek,
      },
    })
    .then((response) => response.data.updateRecipe.node)
}
