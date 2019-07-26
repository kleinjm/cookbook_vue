import gql from 'graphql-tag';
import { AllFieldsFragment } from '~queries/recipes.js';

const mutation = gql`
  mutation scrapeRecipe(
    $recipeId: ID,
    $url: String!,
  ) {
    scrapeRecipe(input: {
      recipeId: $recipeId,
      url: $url,
    }) {
      recipe {
        ...AllFields
      }
      errors
    }
  }
  ${AllFieldsFragment}
`;

export default function scrapeRecipe({
  apollo,
  recipeId,
  url,
}) {
  return apollo.mutate({
    mutation,
    variables: {
      recipeId,
      url,
    },
  });
}
