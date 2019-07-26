import gql from 'graphql-tag'

const mutation = gql`
  mutation createTag($name: String!) {
    createTag(input: { name: $name }) {
      tag {
        id
        name
      }
      success
      errors
    }
  }
`

export default function({ apollo, name }) {
  return apollo.mutate({
    mutation,
    variables: {
      name,
    },
  })
}
