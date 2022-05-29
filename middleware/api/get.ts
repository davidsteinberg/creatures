import getCreatureGenerator from "./util/getCreatureGenerator.ts";
import { RouterContext, Status } from "../../deps.ts";

const path = "/api/v1/:amount" as const;
const min = 1;
const max = 100;

const get = async (context: RouterContext<typeof path>) => {
  const { params, response } = context;
  const amount = Number(params.amount);

  // Handle invalid amounts
  if (Number.isNaN(amount) || amount < min || amount > max) {
    response.status = Status.BadRequest;
    response.body = `Amount must be a number between ${min} and ${max}`;
    return;
  }

  // Get amount of creatures
  const data = await context.state.getData();
  const generator = getCreatureGenerator(data);
  const creatures = Array.from({ length: amount }, () => {
    return generator.next().value;
  });

  // Allow GET requests from anywhere
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.body = creatures;
};

export { path };
export default get;
