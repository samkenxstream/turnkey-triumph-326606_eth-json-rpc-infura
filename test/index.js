const test = require('tape')
const { fetchConfigFromReq } = require('../src/index')

test('fetchConfigFromReq - basic', (t) => {

  const network = 'mainnet'
  const req = {
    method: 'eth_getBlockByNumber',
    params: ['0x482103', true],
  }

  const { fetchUrl, fetchParams } = fetchConfigFromReq({ network, req })
  t.equals(fetchUrl, 'https://api.infura.io/v1/jsonrpc/mainnet/eth_getBlockByNumber?params=%5B%220x482103%22%2Ctrue%5D')
  t.deepEquals(fetchParams, { method: 'GET' })
  t.end()

})

test('fetchConfigFromReq - basic', (t) => {

  const network = 'ropsten'
  const req = {
    method: 'eth_sendRawTransaction',
    params: ['0x0102030405060708090a0b0c0d0e0f'],
  }

  const { fetchUrl, fetchParams } = fetchConfigFromReq({ network, req })
  t.equals(fetchUrl, 'https://api.infura.io/v1/jsonrpc/ropsten')
  t.deepEquals(fetchParams, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
  t.end()

})
