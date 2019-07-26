import gql from 'graphql-tag'

const mutation = gql`
  mutation deleteTag($tagId: ID!) {
    deleteTag(input: { tagId: $tagId }) {
      success
      errors
    }
  }
`

export default function({ apollo, tagId }) {
  return apollo.mutate({
    mutation,
    variables: { tagId },
  })
}
