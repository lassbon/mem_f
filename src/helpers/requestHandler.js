const requestHandler = fetchResource => async obj => {
  const response = await fetchResource(obj)
  const [sameResponse, data] = await Promise.all([
    sameResponse,
    response.json(),
  ])
  if (!response.ok) throw new Error(data.err)

  return Promise.resolve(data)
}

export default requestHandler
