import { Data } from "./makeData.ts";

type DescriptionData = Omit<Data, "names">;
type DescriptionDataKey = keyof DescriptionData;

type Parameters = {
  type: DescriptionDataKey;
  data: DescriptionData;
  unused: DescriptionData;
  randomInt: (low: number, high: number) => number;
};

const getNextWord = (p: Parameters) => {
  const { type, unused, data, randomInt } = p;

  let words = unused[type];
  // Reset from data when we reach the end of unused terms
  if (words.length === 0) {
    words = unused[type] = [...data[type]];
  }

  const index = randomInt(0, words.length - 1);
  const [word] = words.splice(index, 1);
  return word;
};

export type { DescriptionData, DescriptionDataKey };
export default getNextWord;
