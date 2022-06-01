import { Middleware, Status } from "../../deps.ts";

const body = (url: URL) => {
  const { protocol, host } = url;
  const urlPrefix = `${protocol}${host}/api/v1/`;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Creaturator</title>
        <style>
          body {
            max-width: 600px;
            margin: auto;
            font-family: sans-serif;
          }
        </style>
      </head>
      <body>
        <h1>Creaturator</h1>
        <p>Creaturator is an API to generate random names and descriptions for legendary creatures. It takes a number between 1 and 100 as a parameter for the amount of creatures to generate:</p>
        <p><code>${urlPrefix}{number}</code></p>
        <p>The API returns an array of objects, each with <code>name</code> and <code>description</code> string properties. Here is an example of fetching and logging 10 creatures:</p>
        <pre><code>const response = await fetch("${urlPrefix}10");
const creatures = await response.json();

for (const { name, description } of creatures) {
  console.log(\`\${name} - \${description}\`);
}</code></pre>
        <p>For more information, see the <a href="https://github.com/davidsteinberg/creaturator">project on GitHub</a>.</p>
      </body>
    </html>
  `;
};

const notAPI: Middleware = (context) => {
  const { request, response } = context;
  const { url } = request;
  const { pathname } = url;

  response.status = (pathname === "/") ? Status.OK : Status.NotFound;
  response.body = body(url);
};

export default notAPI;
