import gql from 'graphql-tag'

const mutation = gql`
  mutation updateCookedAtDates($recipeUuid: ID!, $amount: Int!) {
    updateCookedAtDates(input: { recipeUuid: $recipeUuid, amount: $amount }) {
      success
      errors
      recipe {
        id
        uuid
        timesCooked
        lastCookedAt
      }
    }
  }
`

export default function updateCookedAtDates({ apollo, recipeUuid, amount }) {
  return apollo.mutate({
    mutation,
    variables: {
      recipeUuid,
      amount,
    },
  })
}
