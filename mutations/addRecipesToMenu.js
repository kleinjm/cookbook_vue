import gql from 'graphql-tag'

const mutation = gql`
  mutation addRecipesToMenu($recipeIds: [ID!]!, $menuId: ID!) {
    addRecipesToMenu(input: { recipeIds: $recipeIds, menuId: $menuId }) {
      errors
    }
  }
`

export default function addRecipesToMenu({ apollo, recipeIds, menuId }) {
  return apollo.mutate({
    mutation,
    variables: { recipeIds, menuId },
  })
}
