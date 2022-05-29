import { datetime, Middleware } from "../../deps.ts";

const logging: Middleware = async (context, next) => {
  const { ip, method, url } = context.request;
  const { pathname } = url;
  const datetimeString = datetime.format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS");
  const json = { datetime: datetimeString, ip, method, pathname };
  const message = JSON.stringify(json);

  console.log(message);

  await next();
};

export default logging;
