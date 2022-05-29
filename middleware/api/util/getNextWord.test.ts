import getNextWord from "./getNextWord.ts";
import makeData from "./makeData.ts";
import { assertEquals, assertStrictEquals } from "../../../test_deps.ts";

Deno.test("getNextWord gets random word from unused words", () => {
  const p = {
    type: "adjectives" as const,
    data: makeData(),
    unused: makeData({
      adjectives: ["foo"],
    }),
    randomInt: () => 0,
  };

  const word = getNextWord(p);
  const expectedWord = "foo";

  assertStrictEquals(word, expectedWord);
  assertEquals(p.unused.adjectives, []);
});

Deno.test("getNextWord copies from data if unused words is empty", () => {
  const p = {
    type: "adjectives" as const,
    data: makeData({
      adjectives: ["foo", "bar"],
    }),
    unused: makeData(),
    randomInt: () => 0,
  };

  const word = getNextWord(p);
  const expectedWord = "foo";

  assertStrictEquals(word, expectedWord);
  assertEquals(p.unused.adjectives, ["bar"]);
  assertEquals(p.data.adjectives, ["foo", "bar"]);
});
