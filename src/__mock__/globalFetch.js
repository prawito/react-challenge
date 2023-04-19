const globalFetch = {
  __internal: {
    responses: [],
  },
  fetch: () => {
    const response = globalFetch.__internal.responses.shift()
    if (response) {
      return Promise.resolve(response)
    }
    return Promise.reject(new Error('No mock response provided'))
  },
  mockResponseOnce: function (response) {
    this.__internal.responses.push(response)
  },
  reset: function () {
    this.__internal.responses = []
  },
}

export default globalFetch
