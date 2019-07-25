import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import _map from 'lodash/map'

export function flattenEdgeNodes(data) {
  const key = Object.keys(data)[0]
  const edges = _get(data[key], 'edges', [])
  if (_isEmpty(edges)) return []

  return _map(edges, 'node')
}

export function extractUuid(fullId) {
  return fullId.split('/')[1]
}
