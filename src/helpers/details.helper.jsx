function Evolutions(details) {
  return details.next_evolution.map((e) => {
    return e.name;
  });
}

function Devolutions(details) {
  return details.prev_evolution.map((e) => {
    return e.name;
  });
}

export { Evolutions, Devolutions };
