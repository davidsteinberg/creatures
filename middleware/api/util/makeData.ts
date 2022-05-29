type Data = {
  adjectives: string[];
  attributes: string[];
  item_attributes: string[];
  names: string[];
  species: string[];
  verbs: string[];
};

type DataKey = keyof Data;

const makeData = (partial: Partial<Data> = {}): Data => {
  const {
    adjectives = [],
    attributes = [],
    item_attributes = [],
    names = [],
    species = [],
    verbs = [],
  } = partial;

  return { adjectives, attributes, item_attributes, names, species, verbs };
};

export type { Data, DataKey };
export default makeData;
