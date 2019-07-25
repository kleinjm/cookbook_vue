// Given an object and string key name, return the value
//   Ex. Object.byString(someObj, 'part3[0].name');
// See https://stackoverflow.com/a/6491621/2418828
export default function valueByString(o, s) {
  s = s.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
  s = s.replace(/^\./, '') // strip a leading dot
  const a = s.split('.')
  for (let i = 0, n = a.length; i < n; ++i) {
    const k = a[i]
    if (k in o) {
      o = o[k]
    } else {
      return
    }
  }
  return o
}
