import makeInclude from "./makeInclude.ts";
import { assertEquals } from "../../../test_deps.ts";

Deno.test("makeInclude ensures verb is included if adjective and attribute aren't", () => {
  const coin = () => false;
  const include = makeInclude(coin);
  const expectedInclude = { adjective: false, attribute: false, verb: true };

  assertEquals(include, expectedInclude);
});

Deno.test("makeInclude doesn't force verb if adjective is included", () => {
  let count = 0;
  const coin = () => {
    count += 1;
    if (count === 1) {
      return true;
    }
    return false;
  };
  const include = makeInclude(coin);
  const expectedInclude = { adjective: true, attribute: false, verb: false };

  assertEquals(include, expectedInclude);
});

Deno.test("makeInclude doesn't force verb if attribute is included", () => {
  let count = 0;
  const coin = () => {
    count += 1;
    if (count === 2) {
      return true;
    }
    return false;
  };
  const include = makeInclude(coin);
  const expectedInclude = { adjective: false, attribute: true, verb: false };

  assertEquals(include, expectedInclude);
});
