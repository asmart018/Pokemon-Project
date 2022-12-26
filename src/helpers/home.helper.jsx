function filterPokemon(list, pokemon, type, weakness) {
  let newList = [];
  let typeList = [];
  let weakList = [];
  pokemon = pokemon.toUpperCase();

  newList = list.filter((e) => {
    if (pokemon === "") {
      return e;
    } else {
      return e.name.toUpperCase().startsWith(pokemon);
    }
  });

  typeList = newList.filter((e) => {
    if (Object.values(e.type).indexOf(type) > -1) {
      return e.type;
    } else if (type === "") {
      return e;
    }
  });

  weakList = typeList.filter((e) => {
    if (Object.values(e.weaknesses).indexOf(weakness) > -1) {
      return e.weaknesses;
    } else if (weakness === "") {
      return e;
    }
  });

  return weakList;
}

function getDropdowns(list, filter) {
  let tempList = [];
  let type = {};
  list.map((pokemon) => {
    type = Object.getOwnPropertyDescriptor(pokemon, filter);
    type.value.map((e) => {
      tempList.push(e);
    });
  });
  let sendList = [...new Set(tempList)];
  return sendList;
}

export { filterPokemon, getDropdowns };
