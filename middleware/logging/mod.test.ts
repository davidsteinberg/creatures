import logging from "./mod.ts";
import { datetime } from "../../deps.ts";
import { assertStrictEquals, testing } from "../../test_deps.ts";

Deno.test("logging", async () => {
  const context = testing.createMockContext({
    ip: "ip",
    path: "/path",
    method: "method",
  });

  const next = testing.createMockNext();
  const consoleLog = console.log;

  let message = "";
  console.log = (...data: string[]) => {
    message = data[0];
  };

  await logging(context, next);

  const now = new Date();
  const { datetime: datetimeString, ip, pathname, method } = JSON.parse(
    message,
  );
  const date = datetime.parse(datetimeString, "yyyy-MM-dd HH:mm:ss.SSS");

  assertStrictEquals(date.getFullYear(), now.getFullYear());
  assertStrictEquals(date.getMonth(), now.getMonth());
  assertStrictEquals(date.getDay(), now.getDay());
  assertStrictEquals(date.getHours(), now.getHours());
  assertStrictEquals(date.getMinutes(), now.getMinutes());
  assertStrictEquals(date.getSeconds(), now.getSeconds());

  assertStrictEquals(ip, "ip");
  assertStrictEquals(pathname, "/path");
  assertStrictEquals(method, "method");

  console.log = consoleLog;
});
