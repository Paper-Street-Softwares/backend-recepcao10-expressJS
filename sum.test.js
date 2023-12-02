const sum = require("./sum");

describe("Equacao", () => {
  test("Isso soma", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
