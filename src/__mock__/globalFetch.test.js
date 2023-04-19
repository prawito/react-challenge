import globalFetch from './globalFetch'

describe('globalFetch', () => {
  afterEach(() => {
    globalFetch.reset()
  })

  test('fetch function returns mock response when available', async () => {
    const mockResponse = { data: 'test data' }
    globalFetch.mockResponseOnce(mockResponse)

    const response = await globalFetch.fetch()
    expect(response).toEqual(mockResponse)
  })

  test('fetch function throws error when no mock response is available', async () => {
    expect.assertions(1)
    try {
      await globalFetch.fetch()
    } catch (error) {
      expect(error.message).toEqual('No mock response provided')
    }
  })

  test('mockResponseOnce function adds a response to the internal responses', () => {
    const mockResponse = { data: 'test data' }
    globalFetch.mockResponseOnce(mockResponse)

    expect(globalFetch.__internal.responses).toHaveLength(1)
    expect(globalFetch.__internal.responses[0]).toEqual(mockResponse)
  })

  test('reset function clears internal responses', () => {
    const mockResponse1 = { data: 'test data 1' }
    const mockResponse2 = { data: 'test data 2' }
    globalFetch.mockResponseOnce(mockResponse1)
    globalFetch.mockResponseOnce(mockResponse2)

    expect(globalFetch.__internal.responses).toHaveLength(2)

    globalFetch.reset()

    expect(globalFetch.__internal.responses).toHaveLength(0)
  })
})
