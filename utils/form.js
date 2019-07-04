import _startCase from 'lodash/startCase'
import _get from 'lodash/get'

function formattedErrors(errors) {
  let prettyFormat = ''

  Object.keys(errors).forEach((errorName) => {
    const message = errors[errorName][0]
    prettyFormat += `${_startCase(errorName)} ${message}\n`
  })
  return prettyFormat
}

export function formattedAxiosErrors(e) {
  const errors = _get(e, 'response.data.errors')
  const error = _get(e, 'response.data.error')

  if (errors) {
    return formattedErrors(errors)
  } else if (error) {
    return error
  }
}
