import makeData from "./makeData.ts";
import { assertStrictEquals } from "../../../test_deps.ts";

Deno.test("makeData uses passed adjectives", () => {
  const adjectives = ["foo"];
  const data = makeData({ adjectives });

  assertStrictEquals(data.adjectives, adjectives);
});

Deno.test("makeData uses passed attributes", () => {
  const attributes = ["foo"];
  const data = makeData({ attributes });

  assertStrictEquals(data.attributes, attributes);
});

Deno.test("makeData uses passed item_attributes", () => {
  const item_attributes = ["foo"];
  const data = makeData({ item_attributes });

  assertStrictEquals(data.item_attributes, item_attributes);
});

Deno.test("makeData uses passed names", () => {
  const names = ["foo"];
  const data = makeData({ names });

  assertStrictEquals(data.names, names);
});

Deno.test("makeData uses passed species", () => {
  const species = ["foo"];
  const data = makeData({ species });

  assertStrictEquals(data.species, species);
});

Deno.test("makeData uses passed verbs", () => {
  const verbs = ["foo"];
  const data = makeData({ verbs });

  assertStrictEquals(data.verbs, verbs);
});
