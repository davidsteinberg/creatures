// UI
const select = (selector) => document.querySelector(selector);
const ui = {
  about: select("#about"),
  content: select("#content"),
  name: select("#name"),
  description: select("#description"),
  previous: select("#previous"),
  next: select("#next"),
  toggle: select("#toggle"),
};

// Navigation
const history = {
  entries: [],
  index: -1,
};

const showCurrentEntry = () => {
  const { name, description } = history.entries[history.index];
  ui.name.textContent = name;
  ui.description.textContent = description;
};

ui.previous.onpointerup = () => {
  if (history.index === 0) {
    // Can't go back further
    return;
  }

  history.index -= 1;

  // Disable button when we've reached the beginning
  if (history.index === 0) {
    ui.previous.classList.add("disabled");
  }

  showCurrentEntry();
};

let fetching = false;
ui.next.onpointerup = async () => {
  // Don't do anything while fetching
  if (fetching) {
    return;
  }

  if (history.index === history.entries.length - 1) {
    // Need to fetch more
    ui.next.classList.add("disabled");
    fetching = true;
    console.log("Fetching creatures");
    const response = await fetch("https://creaturator.deno.dev/api/v1/50");
    const creatures = await response.json();
    history.entries.push(...creatures);
    ui.next.classList.remove("disabled");
    fetching = false;
  }

  // Enable previous button when leaving first entry
  if (history.index === 0) {
    ui.previous.classList.remove("disabled");
  }

  history.index += 1;
  showCurrentEntry();
};

// Toggle
ui.toggle.onpointerup = () => {
  ui.about.classList.toggle("hidden");
  ui.content.classList.toggle("hidden");
};
