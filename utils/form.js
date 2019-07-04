import _startCase from 'lodash/startCase'
import _get from 'lodash/get'

export function formattedAxiosErrors(e) {
  const errors = _get(e, 'response.data.errors', [])
  let prettyFormat = ''

  Object.keys(errors).forEach((errorName) => {
    const message = errors[errorName][0]
    prettyFormat += `${_startCase(errorName)} ${message}\n`
  })

  return prettyFormat
}
