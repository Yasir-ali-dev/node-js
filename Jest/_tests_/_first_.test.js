const sum = require("..");

const a = 9;
const b = 19;
test(`${a} & ${b} should be ${a + b} `, () => {
  expect(sum(a, b)).toBe(a + b);
});

test("arithmetic", () => {
  expect(4 + 4).toBeGreaterThan(7);
  expect(10 + 1).toBeLessThan(20);
});

test("references", () => {
  const arr = [1, 3, 7];
  expect(arr).toEqual([1, 3, 7]);
  expect(arr).toContain(3);
});
