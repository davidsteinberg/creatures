import get, { path } from "./get.ts";
import { Status } from "../../deps.ts";
import { assertStrictEquals, testing } from "../../test_deps.ts";

Deno.test("get reports bad request for NaN amount", () => {
  const context = testing.createMockContext<typeof path>({
    params: { amount: "foo" },
  });

  get(context);

  assertStrictEquals(context.response.status, Status.BadRequest);
});

Deno.test("get reports bad request if number is below min", () => {
  const context = testing.createMockContext<typeof path>({
    params: { amount: "0" },
  });

  get(context);

  assertStrictEquals(context.response.status, Status.BadRequest);
});

Deno.test("get reports bad request if number is above max", () => {
  const context = testing.createMockContext<typeof path>({
    params: { amount: "2000" },
  });

  get(context);

  assertStrictEquals(context.response.status, Status.BadRequest);
});

Deno.test("get responds with amount of creatures", async () => {
  const context = testing.createMockContext<typeof path>({
    params: { amount: "2" },
  });

  context.state.getData = () => {
    return {
      adjectives: ["adjective1", "adjective2"],
      attributes: ["attribute1", "attribute2"],
      item_attributes: ["item_attribute1", "item_attribute2"],
      names: ["abc", "def", "ghi", "jkl", "mno", "pqr", "stu", "vwx", "yz"],
      species: ["species1", "species2"],
      verbs: ["verb1", "verb2"],
    };
  };

  await get(context);

  const { status, body } = context.response;
  const creatures = body as { name: string; description: string }[];

  assertStrictEquals(status, Status.OK);
  assertStrictEquals(creatures.length, 2);
});
