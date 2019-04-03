import { initialProductLogic } from "./CartLogic";

describe("Making sure the library works", () => {
  test("Jest works", () => {
    expect("string").toBe("string");
    expect(2).toBe(2);
  });
});

test("Need output to be the same as input", () => {
  expect(initialProductLogic("abc")).toBe("abc");
});

test("Need function to exist", () => {
  expect(initialProductLogic).toBeDefined();
});

test("Need output to not be the letter b", () => {
  expect(initialProductLogic("a")).not.toBe("b");
});

test("something", () => {
  expect(initialProductLogic(undefined)).toBe(undefined);
});
