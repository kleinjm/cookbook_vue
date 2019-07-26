import gql from 'graphql-tag';
import { AllFieldsFragment } from '~queries/recipes.js';

const mutation = gql`
  mutation createRecipe(
    $name: String!,
    $categoryIds: [ID!],
    $cookTimeQuantity: String,
    $cookTimeUnit: String,
    $ingredients: String,
    $link: String,
    $notes: String,
    $source: String,
    $stepText: String,
    $tagIds: [ID!]
  ) {
    createRecipe(input: {
      name: $name,
      categoryIds: $categoryIds,
      cookTimeQuantity: $cookTimeQuantity,
      cookTimeUnit: $cookTimeUnit,
      ingredients: $ingredients,
      link: $link,
      notes: $notes,
      source: $source,
      stepText: $stepText,
      tagIds: $tagIds,
    }) {
      recipe {
        ...AllFields
      }
      errors
      success
    }
  }
  ${AllFieldsFragment}
`;

export default function createRecipe({
  apollo,
  name,
  categoryIds,
  cookTimeQuantity,
  cookTimeUnit,
  ingredients,
  link,
  notes,
  source,
  stepText,
  tagIds,
}) {
  return apollo.mutate({
    mutation,
    variables: {
      name,
      categoryIds,
      cookTimeQuantity,
      cookTimeUnit,
      ingredients,
      link,
      notes,
      source,
      stepText,
      tagIds,
    },
  });
}
