import {
  api,
  errorHandling,
  logging,
  notAPI,
  setData,
} from "./middleware/mod.ts";
import { Application, parse } from "./deps.ts";

const {
  port = 8000,
  data: dataURL = "https://davidsteinberg.github.io/legendata/data",
} = parse(Deno.args);

const app = new Application()
  .use(logging)
  .use(errorHandling)
  .use(setData(dataURL, fetch))
  .use(api.allowedMethods())
  .use(api.routes())
  .use(notAPI);

app.addEventListener("listen", ({ hostname, port }) => {
  console.log(`Listening on ${hostname}:${port}`);
});

await app.listen({ port });
