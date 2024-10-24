const bg_color = {
  grass: "#8BD369",
  fire: "#FF603F",
  water: "#3399FF",
  bug: "#aabb22",
  normal: "#AAAA99",
  flying: "#9AA8FA",
  poison: "#B76EA4",
  electric: "#FFD34E",
  ground: "#E2C56A",
  fairy: "#F1A8EC",
  psychic: "#FF6EA4",
  fighting: "#C56E5C",
  rock: "#C5B679",
  dragon: "#7766EE",
  ice: "#66CCFF",
};

//* HTML den çekilen elemanlar
const pokeContainer = document.querySelector(".poke-container");
const search = document.querySelector(".search-container");
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");

const pokemonCount = 151;

//!  addEventListener
searchBtn.addEventListener("click", () => {
  search.classList.toggle("active");
});

searchInput.addEventListener("input", (event) => {
  const value = searchInput.value.toLowerCase();
  // console.log(value);
  const pokemonNames = document.querySelectorAll(".pokemon-name");
  // console.log(pokemonNames);
  pokemonNames.forEach((pokemonName) => {
    if (pokemonName.innerHTML.toLowerCase().includes(value)) {
      pokemonName.parentElement.parentElement.parentElement.style.display =
        "block";
    } else {
      pokemonName.parentElement.parentElement.parentElement.style.display =
        "none";
    }
  });
});

//! API Fetch

const fetchPoke = async () => {
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);
  createPoke(data);
};

const createPoke = (pokemon) => {
  const pokeDiv = document.createElement("div");
  pokeDiv.classList.add("pokemon");

  const pokemonId = pokemon.id.toString().padStart(3, "0");

  const pokemonExp = parseInt(pokemon.base_experience);
  // console.log(pokemonExp);

  const pokemonWeight = parseInt(pokemon.weight);
  // console.log(pokemonType);

  const pokemonType = String(pokemon.types[0].type.name);
  // console.log(pokemonType);

  pokeDiv.innerHTML = `
                    <div class="pokemon">
        <div class="image-container">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemon.id}.png" alt="pokemon-ima" />
        </div>
        <div class="pokemon-info">
          <span class="pokemon-id">#${pokemonId}</span>
          <h3 class="pokemon-name">${pokemon.name}</h3>
          <div class="small">
            <small class="pokemon-experiance"
              ><i class="fa solid fa-flask"></i> ${pokemonExp} exp</small
            >
            <small class="pokemon-weight"
              ><i class="fa solif fa-flask"></i> ${pokemonWeight} kg</small
            >
          </div>
          <div class="pokemon-type">
            <i class="fa-brands fa-uncharted"></i> ${pokemonType}
          </div>
        </div>
      </div>
  `;
  pokeContainer.appendChild(pokeDiv);

  pokeDiv.style.backgroundColor = bg_color[pokemonType];
};
fetchPoke();
