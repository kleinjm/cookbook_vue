export function fieldErrors(fieldName, vueObj) {
  const errors = []
  if (!vueObj.$v[fieldName].$dirty) return errors

  if ('email' in vueObj.$v[fieldName]) {
    !vueObj.$v[fieldName].email && errors.push('This email address is invalid')
  }

  if ('required' in vueObj.$v[fieldName]) {
    !vueObj.$v[fieldName].required && errors.push('This field is required')
  }

  if ('minLength' in vueObj.$v[fieldName]) {
    const length = vueObj.$v[fieldName].$params.minLength.min
    !vueObj.$v[fieldName].minLength &&
      errors.push(`This field must have at least ${length} characters`)
  }

  return errors
}
