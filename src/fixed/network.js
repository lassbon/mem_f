export const noAuthRequestHeaders = () => {
  const headers = new Headers()
  headers.set('Content-type', 'application/form-data')
  headers.set('Accept', 'application/form-data')

  return headers
}

export const authGetRequestHeaders = (token) => {
  const headers = new Headers()
  headers.set('authorization', token)

  return headers
}

export const noAuthPostRequestHeaders = () => {
  const headers = new Headers()
  headers.set('Content-type', 'application/form-data')
  headers.set('Accept', 'application/form-data')

  return headers
}

export const authPostRequestHeaders = (token) => {
  const headers = new Headers()
  headers.set('authorization', token)
  headers.set('Content-type', 'application/form-data')
  headers.set('Accept', 'application/form-data')

  return headers
}

export const networkRequestResponseHandler = () => {}
