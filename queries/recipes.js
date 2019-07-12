import gql from 'graphql-tag'

const allRecipesQuery = gql`
  query {
    recipes {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`

export { allRecipesQuery }
