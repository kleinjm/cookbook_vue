export function ingredientText({ quantity, unit, name }) {
  return [quantity, unit, name].join(' ')
}
