import gql from 'graphql-tag';

const mutation = gql`
  mutation deleteRecipe($recipeId: ID!) {
    deleteRecipe(input: { recipeId: $recipeId }) {
      errors
    }
  }
`;

export default function({ apollo, recipeId }) {
  return apollo.mutate({
    mutation,
    variables: { recipeId },
  });
}
