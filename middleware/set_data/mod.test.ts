import setData, { getCreaturesData, resetData } from "./mod.ts";
import { assertEquals, assertStrictEquals, testing } from "../../test_deps.ts";

Deno.test("getCreaturesData builds an object from trimmed fetched texts", async () => {
  resetData();

  const texts = {
    adjectives: "adjective\n",
    attributes: "attribute\n",
    item_attributes: "item_attribute\n",
    names: "name\n",
    species: "species\n",
    verbs: "verb\n",
  };

  const fetchFn = async (input: string | Request | URL) => {
    if (typeof input === "string") {
      for (const [key, value] of Object.entries(texts)) {
        if (input === `/${key}.txt`) {
          return await Promise.resolve(new Response(value));
        }
      }
    }

    throw new Error(`Unexpected fetch input: ${input}`);
  };

  const getData = getCreaturesData("", fetchFn);
  const data = await getData();
  const expectedData = {
    adjectives: ["adjective"],
    attributes: ["attribute"],
    item_attributes: ["item_attribute"],
    names: ["name"],
    species: ["species"],
    verbs: ["verb"],
  };

  assertEquals(data, expectedData);
});

Deno.test("getCreaturesData does not fetch after first call", async () => {
  resetData();

  const texts = {
    adjectives: "adjective\n",
    attributes: "attribute\n",
    item_attributes: "item_attribute\n",
    names: "name\n",
    species: "species\n",
    verbs: "verb\n",
  };

  let fetchCount = 0;

  const fetchFn = async (input: string | Request | URL) => {
    fetchCount += 1;

    if (typeof input === "string") {
      for (const [key, value] of Object.entries(texts)) {
        if (input === `/${key}.txt`) {
          return await Promise.resolve(new Response(value));
        }
      }
    }

    throw new Error(`Unexpected fetch input: ${input}`);
  };

  const getData = getCreaturesData("", fetchFn);

  await getData();
  await getData();

  assertStrictEquals(fetchCount, Object.keys(texts).length);
});

Deno.test("setData sets a getData function on the context's state", async () => {
  resetData();

  const texts = {
    adjectives: "adjective\n",
    attributes: "attribute\n",
    item_attributes: "item_attribute\n",
    names: "name\n",
    species: "species\n",
    verbs: "verb\n",
  };

  const fetchFn = async (input: string | Request | URL) => {
    if (typeof input === "string") {
      for (const [key, value] of Object.entries(texts)) {
        if (input === `/${key}.txt`) {
          return await Promise.resolve(new Response(value));
        }
      }
    }

    throw new Error(`Unexpected fetch input: ${input}`);
  };

  const middleware = setData("", fetchFn);
  const context = testing.createMockContext();

  let data;
  const next = async () => {
    data = await context.state.getData();
  };

  await middleware(context, next);

  const expectedData = {
    adjectives: ["adjective"],
    attributes: ["attribute"],
    item_attributes: ["item_attribute"],
    names: ["name"],
    species: ["species"],
    verbs: ["verb"],
  };

  assertEquals(data, expectedData);
});
