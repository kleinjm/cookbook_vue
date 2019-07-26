import gql from 'graphql-tag';

const mutation = gql`
  mutation updateTag($tagId: ID!, $name: String!) {
    updateTag(input: { tagId: $tagId, name: $name }) {
      tag {
        id
        name
      }
      success
      errors
    }
  }
`;

export default function({
  apollo,
  tagId,
  name,
}) {
  return apollo.mutate({
    mutation,
    variables: {
      tagId,
      name,
    },
  });
}
