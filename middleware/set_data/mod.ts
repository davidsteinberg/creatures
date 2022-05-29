import makeData, { Data, DataKey } from "../api/util/makeData.ts";
import { Middleware } from "../../deps.ts";

let data: Data | undefined;
const resetData = () => data = undefined;

const getCreaturesData = (path: string, fetchFn: typeof fetch) => {
  return async (): Promise<Data> => {
    // Return data if its already cached
    if (data !== undefined) {
      return data;
    }

    // Make empty data
    data = makeData();

    // Build promises for getting each data bank
    const names = Object.keys(data) as DataKey[];
    const fetches = names.map(async (name) => {
      const response = await fetchFn(`${path}/${name}.txt`);
      const text = await response.text();
      return text.trim();
    });

    // Resolve to an array of unprocessed lists
    const texts = await Promise.all(fetches);

    // Split and store each list's pieces
    for (const [i, name] of Object.entries(names)) {
      const lines = texts[Number(i)].split("\n");
      data[name] = lines;
    }

    return data;
  };
};

const setData = (path: string, fetchFn: typeof fetch) => {
  const middleware: Middleware = async (context, next) => {
    // Set the function to get data, used later by the API
    context.state.getData = getCreaturesData(path, fetchFn);
    await next();
  };
  return middleware;
};

export { getCreaturesData, resetData };
export default setData;
