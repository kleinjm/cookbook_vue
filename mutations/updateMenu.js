import gql from 'graphql-tag';

const mutation = gql`
  mutation updateMenu($menuId: ID!, $name: String, $description: String) {
    updateMenu(input: {
      menuId: $menuId, name: $name, description: $description
    }) {
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
  menuId,
  name,
  description,
}) {
  return apollo.mutate({
    mutation,
    variables: {
      menuId,
      name,
      description,
    },
  });
}
