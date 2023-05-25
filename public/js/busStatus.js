let jsondata = {}

async function getRequest() {
  const getResponse = await fetch('http://localhost/api', {method: 'get'})
  const getJson = await getResponse.json()
  return getJson
}
