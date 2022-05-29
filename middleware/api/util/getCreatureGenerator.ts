import getDescriptionGenerator from "./getDescriptionGenerator.ts";
import { Data } from "./makeData.ts";
import { namerator } from "../../../deps.ts";

const creatureGenerator = function* (data: Data) {
  const nameGenerator = namerator(data.names, { unique: true });
  const descriptionGenerator = getDescriptionGenerator(data);

  while (true) {
    const name = nameGenerator.next().value;
    const description = descriptionGenerator.next().value;

    yield { name, description };
  }
};

const getCreatureGenerator = (data: Data) => creatureGenerator(data);

export default getCreatureGenerator;
