import gql from 'graphql-tag'

const AllFieldsFragment = gql`
  fragment AllFields on Recipe {
    id
    uuid
    name
    ingredients {
      nodes {
        id
        name
        quantity
        unit
      }
    }
    stepList
    link
    tags {
      nodes {
        id
        name
      }
    }
    upNext
    source
    createdAt
    updatedAt
    description
    timesCooked
    lastCookedAt
  }
`

const recipeShowQuery = gql`
  query($uuid: ID!) {
    recipe(uuid: $uuid) {
      ...AllFields
    }
  }
  ${AllFieldsFragment}
`

const allRecipesQuery = gql`
  query($searchText: String, $tagIds: [ID!]) {
    recipes(searchQuery: $searchText, tagIds: $tagIds) {
      nodes {
        id
        uuid
        name
        upNext
        tags {
          nodes {
            id
          }
        }
      }
    }
  }
`

const upNextRecipesQuery = gql`
  query {
    recipes(upNext: true) {
      nodes {
        id
        uuid
        name
        upNext
      }
    }
  }
`

const ingredientSearchQuery = gql`
  query($ingredientSearch: String) {
    recipes(ingredientSearch: $ingredientSearch) {
      nodes {
        id
        name
        upNext
      }
    }
  }
`

export {
  AllFieldsFragment,
  allRecipesQuery,
  ingredientSearchQuery,
  recipeShowQuery,
  upNextRecipesQuery,
}
