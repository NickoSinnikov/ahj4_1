import algLuhn from "../algLuhn";

test("should valid card number", () => {
  const result = algLuhn("2221003870040949");

  expect(result).toBe(true);
});

test("should valid card number", () => {
  const result = algLuhn("4024007142200574");
  expect(result).toBe(true);
});

test("should valid card number", () => {
  const result = algLuhn("3318585858588");
  expect(result).toBe(false);
});
