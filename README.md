# Creaturator

Creaturator is a little server that vends an API to generate random names and
descriptions for legendary creatures. It uses the [legendata][1] dataset as
input by default.

### API

The API currently takes a number (between 1 and 100) of creatures to generate as
its only parameter:

`https://creaturator.deno.dev/api/v1/{number}`

It returns an array of objects, each with `name` and `description` string
properties. Here is an example of fetching and logging 10 creatures:

```ts
const response = await fetch("https://creaturator.deno.dev/api/v1/10");
const creatures = await response.json();

for (const { name, description } of creatures) {
  console.log(`${name} - ${description}`);
}
```

### Input

The server accepts a command-line argument to use as the base URL for fetching
data:

`deno --allow-net server.ts --data=http://localhost:8000`

It is expected that the following newline-delimited text files can be fetched
from the data URL:

1. adjectives.txt
2. attributes.txt
3. item_attributes.txt
4. names.txt
5. species.txt
6. verbs.txt

If no data URL is provided, the [legendata][1] dataset is used as the default
input.

### Implementation

Names are generated using the [namerator][2] module, and descriptions are
generated by randomly picking parts of speech/phrases to fill in with data. The
project is built using [Deno][3], and the server is implemented using [Oak][4].

### Future directions

Description generation is currently quite basic, and there are countless ways
descriptions could be more interesting. A couple ideas for manual improvements:

1. The description generator "flips a coin" to include adjectives, attributes,
   and verbs. This could be expanded to optionally include multiples of a part
   of speech, increase the probability of including more content based on the
   current length of the description, etc.

2. Some combinations of parts of speech currently don't make much sense, e.g.
   the API can generate a "flightless" creature that "flies". Metadata/tags
   could be used to ensure opposing concepts aren't put together (or related
   concepts have a higher likelihood of being put together). It would probably
   make sense for this to be done using semantic analysis libraries instead of
   tracking things by hand.

[1]: https://github.com/davidsteinberg/legendata
[2]: https://github.com/davidsteinberg/namerator
[3]: https://deno.land
[4]: https://oakserver.github.io/oak
