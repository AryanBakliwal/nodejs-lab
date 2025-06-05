const {fetchFun} = require('../../src/index');

test('the data is Resolved', () => {
  return fetchFun().then(data => {
    expect(data).toBe('Resolved');
  });
});

// we can also use async/await

test('the data is Resolved 2', async () => {
  const data = await fetchFun();
  expect(data).toBe('Resolved');
});

// .resolves/.rejects

test('the data is Resolved 3', () => {
  return expect(fetchFun()).resolves.toBe('Resolved');
});