import env from '../config/env'

export default function(context) {
  return {
    httpEndpoint: env.baseGqlUrl,
  }
}
