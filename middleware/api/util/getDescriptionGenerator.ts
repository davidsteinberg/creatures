import generateDescription from "./generateDescription.ts";
import getNextWord, {
  DescriptionData,
  DescriptionDataKey,
} from "./getNextWord.ts";
import makeData from "./makeData.ts";
import makeInclude from "./makeInclude.ts";
import { random } from "../../../deps.ts";

const getDescriptionGenerator = (data: DescriptionData) => {
  const unused = makeData();

  // Get from unused data using random int
  const getNext = (type: DescriptionDataKey) =>
    getNextWord({
      type,
      unused,
      data,
      randomInt: random.int,
    });

  // Set up gets for each part of descriptions
  const get = {
    adjective: () => getNext("adjectives"),
    attribute: () => getNext("attributes"),
    item_attribute: () => getNext("item_attributes"),
    species: () => getNext("species"),
    verb: () => getNext("verbs"),
  };

  const descriptionGenerator = function* () {
    while (true) {
      const include = makeInclude(random.coin);
      yield generateDescription({ include, get });
    }
  };

  return descriptionGenerator();
};

export default getDescriptionGenerator;
