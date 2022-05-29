import notAPI from "./mod.ts";
import { Status } from "../../deps.ts";
import { assertStrictEquals, testing } from "../../test_deps.ts";

Deno.test("notAPI returns status ok for /", async () => {
  const context = testing.createMockContext({ path: "/" });
  const next = testing.createMockNext();

  await notAPI(context, next);

  assertStrictEquals(context.response.status, Status.OK);
});

Deno.test("notAPI returns status not found for not /", async () => {
  const context = testing.createMockContext({ path: "foo" });
  const next = testing.createMockNext();

  await notAPI(context, next);

  assertStrictEquals(context.response.status, Status.NotFound);
});
