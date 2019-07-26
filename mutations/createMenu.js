import gql from 'graphql-tag';

const mutation = gql`
  mutation createMenu($name: String!, $description: String) {
    createMenu(input: { name: $name, description: $description }) {
      menu {
        id
        name
        description
      }
      success
      errors
    }
  }
`;

export default function createMenu({
  apollo,
  name,
  description,
}) {
  return apollo.mutate({
    mutation,
    variables: {
      name,
      description,
    },
  });
}
