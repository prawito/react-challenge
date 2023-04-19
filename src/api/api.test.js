import apiCall from './'
import globalFetch from '../__mock__/globalFetch'

describe('apiCall', () => {
  afterEach(() => {
    globalFetch.reset()
  })

  it('sends a GET request and receives a successful response', async () => {
    const endpoint = '/test'
    const responseData = { key: 'value' }

    const response = new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })

    globalFetch.mockResponseOnce(response)

    const result = await apiCall(endpoint, 'GET')

    expect(result).toEqual(responseData)
  })

  it('sends a POST request and receives a successful response', async () => {
    const endpoint = '/test'
    const data = { key: 'value' }
    const responseData = { success: true }

    const response = new Response(JSON.stringify(responseData), {
      status: 201,
      headers: { 'content-type': 'application/json' },
    })

    globalFetch.mockResponseOnce(response)

    const result = await apiCall(endpoint, 'POST', data)

    expect(result).toEqual(responseData)
  })

  it('sends a DELETE request and receives a successful response', async () => {
    const endpoint = '/test'

    const response = new Response(null, {
      status: 204,
      headers: { 'content-type': 'application/json' },
    })

    globalFetch.mockResponseOnce(response)

    let errorOccurred = false
    try {
      await apiCall(endpoint, 'DELETE')
    } catch (error) {
      errorOccurred = true
    }

    expect(errorOccurred).toBeFalsy()
  })

  it('throws an error when API call fails', async () => {
    const endpoint = '/test'

    const response = new Response('Not Found', {
      status: 404,
      statusText: 'Not Found',
    })

    globalFetch.mockResponseOnce(response)

    await expect(apiCall(endpoint, 'GET')).rejects.toThrow(
      'API call failed: Not Found',
    )
  })
})
