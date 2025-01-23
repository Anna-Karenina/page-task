import { stringify } from 'qs'

export function withQuery<T extends Record<string, any>>(
  url: string,
  queryParams: T
): string {
  const queryStr = stringify(queryParams, {
    arrayFormat: 'comma',
    encode: false
  })

  const prefix = url.indexOf('?') > -1 ? '&' : '?'
  return url + prefix + queryStr
}

