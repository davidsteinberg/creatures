const makeInclude = (coin: () => boolean) => {
  const include = {
    adjective: coin(),
    attribute: coin(),
    verb: coin(),
  };

  // If nothing is randomly included, include a verb
  if (!Object.values(include).includes(true)) {
    include.verb = true;
  }

  return include;
};

export default makeInclude;
