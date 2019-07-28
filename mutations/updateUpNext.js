import gql from 'graphql-tag'

const mutation = gql`
  mutation updateUpNext($recipeIds: [ID!], $upNext: Float!) {
    updateUpNext(input: { recipeIds: $recipeIds, upNext: $upNext }) {
      success
      errors
      recipes {
        id
        uuid
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
    })
    .then((response) => response.data.updateUpNext.recipes)
}
