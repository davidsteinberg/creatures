import getArticle from "./getArticle.ts";

const itemRegex = /^(?:carries|w(?:ears|ields)) a/;

type Parameters = {
  include: {
    adjective: boolean;
    attribute: boolean;
    verb: boolean;
  };
  get: {
    adjective(): string;
    attribute(): string;
    item_attribute(): string;
    species(): string;
    verb(): string;
  };
};

const generateDescription = (p: Parameters): string => {
  const { include, get } = p;
  const parts: string[] = [];

  // Adjective
  if (include.adjective) {
    const adjective = get.adjective();
    parts.push(adjective);
  }

  // Species
  const species = get.species();
  parts.push(species);

  // Attribute
  if (include.attribute) {
    const attribute = get.attribute();
    parts.push(attribute);
  }

  // Verb
  if (include.verb) {
    const verb = get.verb();
    parts.push("that", verb);

    // Item attribute
    if (itemRegex.test(verb)) {
      const item_attribute = get.item_attribute();
      parts.push(item_attribute);
    }
  }

  // Article
  const article = getArticle(parts[0]);
  parts.unshift(article);

  return parts.join(" ");
};

export default generateDescription;
