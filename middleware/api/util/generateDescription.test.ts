import generateDescription from "./generateDescription.ts";
import { assertStrictEquals } from "../../../test_deps.ts";

Deno.test("generateDescription includes an adjective if told to", () => {
  const p = {
    include: {
      adjective: true,
      attribute: false,
      verb: false,
    },
    get: {
      adjective: () => "adjective",
      attribute: () => "attribute",
      item_attribute: () => "item_attribute",
      species: () => "species",
      verb: () => "verb",
    },
  };

  const description = generateDescription(p);
  const expectedDescription = "An adjective species";

  assertStrictEquals(description, expectedDescription);
});

Deno.test("generateDescription includes an attribute if told to", () => {
  const p = {
    include: {
      adjective: false,
      attribute: true,
      verb: false,
    },
    get: {
      adjective: () => "adjective",
      attribute: () => "attribute",
      item_attribute: () => "item_attribute",
      species: () => "species",
      verb: () => "verb",
    },
  };

  const description = generateDescription(p);
  const expectedDescription = "A species attribute";

  assertStrictEquals(description, expectedDescription);
});

Deno.test("generateDescription includes a verb if told to", () => {
  const p = {
    include: {
      adjective: false,
      attribute: false,
      verb: true,
    },
    get: {
      adjective: () => "adjective",
      attribute: () => "attribute",
      item_attribute: () => "item_attribute",
      species: () => "species",
      verb: () => "verb",
    },
  };

  const description = generateDescription(p);
  const expectedDescription = "A species that verb";

  assertStrictEquals(description, expectedDescription);
});

Deno.test("generateDescription includes an item attribute if verb matches criteria", () => {
  const p = {
    include: {
      adjective: false,
      attribute: false,
      verb: true,
    },
    get: {
      adjective: () => "adjective",
      attribute: () => "attribute",
      item_attribute: () => "item_attribute",
      species: () => "species",
      verb: () => "carries a stick",
    },
  };

  const description = generateDescription(p);
  const expectedDescription = "A species that carries a stick item_attribute";

  assertStrictEquals(description, expectedDescription);
});
