import errorHandling from "./mod.ts";
import { Status } from "../../deps.ts";
import { assertStrictEquals, testing } from "../../test_deps.ts";

Deno.test("errorHandling awaits next", async () => {
  let called = false;

  const context = testing.createMockContext();
  const next = () => {
    called = true;
    return Promise.resolve();
  };

  await errorHandling(context, next);

  assertStrictEquals(called, true);
});

Deno.test("errorHandling catches/logs errors and reports internal server errors to client", async () => {
  const context = testing.createMockContext();
  const error = new Error("foo");
  const next = () => {
    throw error;
  };

  const consoleError = console.error;
  let loggedError: unknown;
  console.error = (...data: unknown[]) => {
    loggedError = data[0];
  };

  await errorHandling(context, next);

  assertStrictEquals(loggedError, error);
  assertStrictEquals(context.response.status, Status.InternalServerError);

  console.error = consoleError;
});
