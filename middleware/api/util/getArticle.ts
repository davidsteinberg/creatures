const a = /^(?:one-|unicorn)/;
const an = /^(?:herbivore|honest)/;
const vowel = /^[aeiou]/;

const getArticle = (word: string): string => {
  if (a.test(word)) {
    return "A";
  }

  if (an.test(word)) {
    return "An";
  }

  if (vowel.test(word)) {
    return "An";
  }

  return "A";
};

export default getArticle;
