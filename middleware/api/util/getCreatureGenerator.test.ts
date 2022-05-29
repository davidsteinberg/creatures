import getCreatureGenerator from "./getCreatureGenerator.ts";
import { assertNotStrictEquals } from "../../../test_deps.ts";

Deno.test("getCreatureGenerator returns a unique (at least to start) creature generator", () => {
  const data = {
    adjectives: ["adjective1", "adjective2"],
    attributes: ["attribute1", "attribute2"],
    item_attributes: ["item_attribute1", "item_attribute2"],
    names: ["abc", "def", "ghi", "jkl", "mno", "pqr", "stu", "vwx", "yz"],
    species: ["species1", "species2"],
    verbs: ["verb1", "verb2"],
  };
  const generator = getCreatureGenerator(data);
  const creature1 = generator.next().value;
  const creature2 = generator.next().value;

  assertNotStrictEquals(creature1.name, creature2.name);
  assertNotStrictEquals(creature1.description, creature2.description);
});
