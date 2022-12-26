import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { Evolutions, Devolutions } from "../helpers/details.helper";
import "../../src/pages/details.page.css";

function DetailPokemon(props) {
  let lightMode = props;
  let [list, setList] = useState([]);
  let name = useParams();
  let evolutions = [];
  let devolutions = [];
  let types = [];
  let weaknesses = [];

  function getFilms() {
    fetch(
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
    )
      .then((response) => response.json())
      .then((films) => {
        setList(films);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getFilms();
  }, []);

  let newList = list.pokemon;
  if (newList === undefined)
    return <h1 className="fetchLoading">Loading...</h1>;
  let pokemonName = name.name.toUpperCase();

  let details = newList.filter((e) => {
    return e.name.toUpperCase().startsWith(pokemonName);
  });

  //Get the types
  types = details[0].type.map((e) => {
    return e;
  });
  let multipleTypes = "";
  if (types.length > 1) {
    multipleTypes = "s";
  }
  
  //Get the weaknesses
  weaknesses = details[0].weaknesses.map((e) => {
    return e;
  });
  let es = "";
  if (weaknesses.length > 1) {
    es = "es";
  }

  //Get the evolutions
  if (details[0].next_evolution) {
    evolutions = Evolutions(details[0]);
  } else {
    evolutions = ["No Evolutions"];
  }

  //Get the devolutions
  if (details[0].prev_evolution) {
    devolutions = Devolutions(details[0]);
  } else {
    devolutions = ["No Previous Evolutions"];
  }
  
  if (lightMode.mode) {
    //Light Mode------------------------------------------Light Mode
    return (
      <div className="align lightMode">
        <Container className="top containerBlack">
          <Row className="imageRow">
            <Col>
              <img
                className="image"
                src={details[0].img}
                alt={details[0].name}
              />
            </Col>
          </Row>
          <Row className="nameRow">
            <Col>
              <h2>{details[0].name}</h2>
            </Col>
          </Row>
        </Container>
        <Container className="bottom containerBlack">
          <div className="nameRow">
            <div>
              <Row>
                <h3>
                  <u>Pokemon Type{multipleTypes}</u>
                </h3>
              </Row>
              <Row>
                {types.map((e, idx) => {
                  return (
                    <Col key={idx}>
                      <h5>{e}</h5>
                    </Col>
                  );
                })}
              </Row>
            </div>
            <div>
              <Row>
                <h3>
                  <u>Pokemon weakness{es}</u>
                </h3>
              </Row>
              <Row>
                {weaknesses.map((e, idx) => {
                  return (
                    <Col key={idx}>
                      <h5>{e}</h5>
                    </Col>
                  );
                })}
              </Row>
            </div>
            <div>
              <Row>
                <br />
                <br />
              </Row>
            </div>
            <div>
              <Row>
                <h3>
                  <u>Evolutions</u>
                </h3>
              </Row>
              <Row>
                {evolutions.map((e, idx) => {
                  if (e !== "No Evolutions") {
                    return (
                      <Col key={idx}>
                        <Link className="black" to={`/${e}`}>
                          <h5>{e}</h5>
                        </Link>
                      </Col>
                    );
                  } else {
                    return (
                      <Col key={idx}>
                        <h5>{e}</h5>
                      </Col>
                    );
                  }
                })}
              </Row>
            </div>
            <div>
              <Row>
                <h3>
                  <u>Previous Evolutions</u>
                </h3>
              </Row>
              <Row>
                {devolutions.map((e, idx) => {
                  if (e !== "No Previous Evolutions") {
                    return (
                      <Col key={idx}>
                        <Link className="black" to={`/${e}`}>
                          <h5>{e}</h5>
                        </Link>
                      </Col>
                    );
                  } else {
                    return (
                      <Col key={idx}>
                        <h5>{e}</h5>
                      </Col>
                    );
                  }
                })}
              </Row>
            </div>
          </div>
        </Container>
      </div>
    );
  } else {
    //Dark Mode--------------------------------------------Dark Mode
    return (
      <div className="align darkMode">
        <Container className="top containerWhite">
          <Row className="imageRow">
            <Col>
              <img
                className="image"
                src={details[0].img}
                alt={details[0].name}
              />
            </Col>
          </Row>
          <Row className="nameRow">
            <Col>
              <h2>{details[0].name}</h2>
            </Col>
          </Row>
        </Container>
        <Container className="bottom containerWhite">
          <div className="nameRow">
            <div>
              <Row>
                <h3>
                  <u>Pokemon Type{multipleTypes}</u>
                </h3>
              </Row>
              <Row>
                {types.map((e, idx) => {
                  return (
                    <Col key={idx}>
                      <h5>{e}</h5>
                    </Col>
                  );
                })}
              </Row>
            </div>
            <div>
              <Row>
                <h3>
                  <u>Pokemon weakness{es}</u>
                </h3>
              </Row>
              <Row>
                {weaknesses.map((e, idx) => {
                  return (
                    <Col key={idx}>
                      <h5>{e}</h5>
                    </Col>
                  );
                })}
              </Row>
            </div>
            <div>
              <Row>
                <br />
                <br />
              </Row>
            </div>
            <div>
              <Row>
                <h3>
                  <u>Evolutions</u>
                </h3>
              </Row>
              <Row>
                {evolutions.map((e, idx) => {
                  if (e !== "No Evolutions") {
                    return (
                      <Col key={idx}>
                        <Link className="black" to={`/${e}`}>
                          <h5>{e}</h5>
                        </Link>
                      </Col>
                    );
                  } else {
                    return (
                      <Col key={idx}>
                        <h5>{e}</h5>
                      </Col>
                    );
                  }
                })}
              </Row>
            </div>
            <div>
              <Row>
                <h3>
                  <u>Previous Evolutions</u>
                </h3>
              </Row>
              <Row>
                {devolutions.map((e, idx) => {
                  if (e !== "No Previous Evolutions") {
                    return (
                      <Col key={idx}>
                        <Link className="black" to={`/${e}`}>
                          <h5>{e}</h5>
                        </Link>
                      </Col>
                    );
                  } else {
                    return (
                      <Col key={idx}>
                        <h5>{e}</h5>
                      </Col>
                    );
                  }
                })}
              </Row>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default DetailPokemon;
