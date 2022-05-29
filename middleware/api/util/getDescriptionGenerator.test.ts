import getDescriptionGenerator from "./getDescriptionGenerator.ts";
import { assertStrictEquals } from "../../../test_deps.ts";

Deno.test("getDescriptionGenerator returns a unique (at least to start) description generator", () => {
  const length = 200;
  const array = (base: string) =>
    Array.from({ length }, (_, i) => `${base}${i}`);
  const data = {
    adjectives: array("adjective"),
    attributes: array("attribute"),
    item_attributes: array("item_attribute"),
    species: array("species"),
    verbs: array("carries a"),
  };
  const generator = getDescriptionGenerator(data);
  const getNextDescription = () => generator.next().value;
  const descriptions = Array.from({ length }, getNextDescription);
  const set = new Set(descriptions);

  assertStrictEquals(set.size, length);
});
