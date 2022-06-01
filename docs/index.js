// UI
const select = (selector) => document.querySelector(selector);
const ui = {
  name: select("#name"),
  description: select("#description"),
  generate: select("#generate"),
  share: select("#share"),
};

// Generate
let currentCreature = null;
const cachedCreatures = [];

ui.generate.addEventListener("click", async () => {
  if (cachedCreatures.length === 0) {
    console.log("Fetching creatures");
    const response = await fetch("https://creaturator.deno.dev/api/v1/50");
    const creatures = await response.json();
    cachedCreatures.push(...creatures);
    ui.share.classList.remove("disabled");
  }

  currentCreature = cachedCreatures.shift();
  const { name, description } = currentCreature;

  ui.name.textContent = name;
  ui.description.textContent = description;
});

// Share
if (!navigator.canShare({ text: "test" })) {
  ui.share.textContent = "Copy";
}

ui.share.addEventListener("click", async () => {
  if (currentCreature === null) {
    console.error("There is nothing to share");
    return;
  }

  const { navigator } = window;
  const { name, description } = currentCreature;
  const text = `${name}: ${description}`;
  const data = { text };

  try {
    if (navigator.canShare(data)) {
      await navigator.share(data);
    } else {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard");
    }
  } catch (error) {
    console.error(error);
  }
});

// Light/dark mode
const lightMode = window.matchMedia("(prefers-color-scheme: light)");
const handleLightModeChange = () => {
  const themeElement = select('meta[name="theme-color"]');
  const { classList } = document.body;

  if (lightMode.matches) {
    themeElement.setAttribute("content", "white");
    classList.add("light-mode");
  } else {
    themeElement.setAttribute("content", "black");
    classList.remove("light-mode");
  }
};

if (lightMode.addEventListener === undefined) {
  lightMode.addListener(handleLightModeChange);
} else {
  lightMode.addEventListener("change", handleLightModeChange);
}

handleLightModeChange();
