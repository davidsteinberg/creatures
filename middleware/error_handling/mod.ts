import { Middleware, Status } from "../../deps.ts";

const errorHandling: Middleware = async (context, next) => {
  try {
    await next();
  } catch (error) {
    console.error(error);
    context.response.status = Status.InternalServerError;
    context.response.body = `
      <!DOCTYPE html>
        <html>
          <body>
            <h1>500 - Internal Server Error</h1>
          </body>
      </html>
    `;
  }
};

export default errorHandling;
