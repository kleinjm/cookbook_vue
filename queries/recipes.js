import gql from 'graphql-tag'

const AllFieldsFragment = gql`
  fragment AllFields on Recipe {
    id
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
    timesCooked
    source
    lastCooked
    createdAt
    updatedAt
    description
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
        timesCooked
        upNext
        tags {
          nodes {
            id
          }
        }
        lastCooked
      }
    }
  }
`

const upNextRecipesQuery = gql`
  query {
    recipes(upNext: true) {
      nodes {
        id
        name
        timesCooked
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
        timesCooked
        upNext
        lastCooked
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
