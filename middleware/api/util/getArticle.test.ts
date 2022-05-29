import getArticle from "./getArticle.ts";
import { assertStrictEquals } from "../../../test_deps.ts";

Deno.test('getArticle returns "An" for vowel-beginning words', () => {
  const word = "anchor";
  const article = getArticle(word);
  const expectedArticle = "An";

  assertStrictEquals(article, expectedArticle);
});

Deno.test('getArticle returns "A" for special-cased vowel-beginning words', () => {
  const words = ["unicorn", "one-hundred-year-old"];

  for (const word of words) {
    const article = getArticle(word);
    const expectedArticle = "A";

    assertStrictEquals(article, expectedArticle);
  }
});

Deno.test('getArticle returns "An" for special-cased consonant-beginning words', () => {
  const words = ["herbivore", "honest"];

  for (const word of words) {
    const article = getArticle(word);
    const expectedArticle = "An";

    assertStrictEquals(article, expectedArticle);
  }
});

Deno.test('getArticle returns "A" for consonant-beginning words', () => {
  const word = "gold";
  const article = getArticle(word);
  const expectedArticle = "A";

  assertStrictEquals(article, expectedArticle);
});
