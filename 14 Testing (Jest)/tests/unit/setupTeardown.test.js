function isCity(city) {
  return true;
}

// for each test
// beforeEach(() => {
//   console.log('Start Test');
// });

// afterEach(() => {
//   console.log('End Test');
// });

// only once
beforeAll(() => {
  console.log('Start Test');
});

afterAll(() => {
  console.log('End Test');
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

describe('describe test', () => {
  // Applies only to tests in this describe block
  beforeEach(() => {
    console.log('Describe setup');
  });

  test('city database has Vienna', () => {
    expect(isCity('Vienna')).toBeTruthy();
  });

});