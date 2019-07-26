import gql from 'graphql-tag';

const mutation = gql`
  mutation deleteMenu($menuId: ID!) {
    deleteMenu(input: { menuId: $menuId }) {
      errors
    }
  }
`;

export default function({ apollo, menuId }) {
  return apollo.mutate({
    mutation,
    variables: { menuId },
  });
}
