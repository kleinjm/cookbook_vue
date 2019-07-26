import gql from 'graphql-tag';
import { AllFieldsFragment } from '~queries/recipes.js';

const mutation = gql`
  mutation updateRecipe(
    $id: ID!,
    $name: String,
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
    updateRecipe(input: {
      recipeId: $id,
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
      success
      errors
    }
  }
  ${AllFieldsFragment}
`;

export default function updateRecipe({
  apollo,
  id,
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
      id,
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
