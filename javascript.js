const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonDetails = document.getElementById("pokemon-details");
const pokemonImage = document.getElementById("pokemon-image");
const pokemonName = document.getElementById("pokemon-name");
const pokemonDescription = document.getElementById("pokemon-description");

searchButton.addEventListener("click", () => {
  const pokemonNameValue = searchInput.value.toLowerCase().trim();
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameValue}`)
    .then(response => response.json())
    .then(data => {
      pokemonImage.style.backgroundImage = `url("${data.sprites.other["official-artwork"].front_default}")`;
      pokemonName.textContent = data.name;
      return fetch(data.species.url);
    })
    .then(response => response.json())
    .then(speciesData => {
      const description = speciesData.flavor_text_entries.find(entry => entry.language.name === "es").flavor_text;
      pokemonDescription.textContent = description;
      pokemonDetails.style.display = "block";
    })
    .catch(error => {
      alert(`No se encontró el Pokemon ${pokemonNameValue}`);
    });
});