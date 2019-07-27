import valueByString from '~/utils/valueByString'

export function fieldErrors(fieldName, vueObj) {
  const errors = []
  const field = valueByString(vueObj.$v, fieldName)
  if (!field.$dirty) return errors

  if ('email' in field) {
    !field.email && errors.push('This email address is invalid')
  }

  if ('required' in field) {
    !field.required && errors.push('This field is required')
  }

  if ('url' in field) {
    !field.url && errors.push('Must be a valid url')
  }

  if ('minLength' in field) {
    const length = field.$params.minLength.min
    !field.minLength &&
      errors.push(`This field must have at least ${length} characters`)
  }

  return errors
}
