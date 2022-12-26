import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Form, Col, Row, FloatingLabel, Button } from "react-bootstrap";
import { filterPokemon, getDropdowns } from "../helpers/home.helper";
import "../../src/App.css";

function Pokemon(props) {
  let lightMode = props;
  let [list, setList] = useState([]);
  let [searchName, setSearchName] = useState("");
  let [searchType, setSearchType] = useState("");
  let [searchWeakness, setSearchWeakness] = useState("");

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

  let filteredPokemon = filterPokemon(
    newList,
    searchName,
    searchType,
    searchWeakness
  );

  let types = getDropdowns(newList, "type");
  let weaknesses = getDropdowns(newList, "weaknesses");

  function searchForm() {
    return (
      <Form className="m-20 justify" id="filterForm">
        <Row className="mb-3">
          <Col sm={12} lg={5}>
            <FloatingLabel
              controlId="floatingInput"
              label="Pokemon Name"
              onChange={(e) => {
                setSearchName(e.target.value);
              }}
              value={searchName}
            >
              <Form.Control type="text" placeholder="Pokemon" />
            </FloatingLabel>
          </Col>

          <Col sm={12} lg={3}>
            <FloatingLabel controlId="floatingInput" label="Pokemon Type">
              <Form.Select
                defaultValue="Choose..."
                onChange={(e) => {
                  setSearchType(e.target.value);
                }}
                value={searchType}
              >
                <option value="">All</option>
                {types.map((e, idx) => {
                  return (
                    <option key={idx} value={e}>
                      {e}
                    </option>
                  );
                })}
              </Form.Select>
            </FloatingLabel>
          </Col>

          <Col sm={12} lg={3}>
            <FloatingLabel controlId="floatingInput" label="Pokemon Weakness">
              <Form.Select
                defaultValue="Choose..."
                onChange={(e) => {
                  setSearchWeakness(e.target.value);
                }}
                value={searchWeakness}
              >
                <option value="">All</option>
                {weaknesses.map((e, idx) => {
                  return (
                    <option key={idx} value={e}>
                      {e}
                    </option>
                  );
                })}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col sm={1} className="resetBtn">
            <Button className="btn-danger" onClick={() => resetForm()}>
              Reset
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }

  function resetForm() {
    document.getElementById("filterForm").reset();
    setSearchName("");
    setSearchType("");
    setSearchWeakness("");
  }

  function tableData() {
    //Changes table colors from light colors to dark colors based on a button from App.jsx
    if (lightMode.mode) {
      return (
        <Table striped bordered hover>
          <thead className="thead">
            <tr>
              <th>Sprite</th>
              <th>Name</th>
              <th>Pokedex Entry</th>
              <th>Pokemon Type(s)</th>
              <th>Pokemon Weaknesses</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {filteredPokemon.map((pokemon, idx) => {
              return (
                <tr key={idx}>
                  <td>
                    <Link to={`${pokemon.name}`}>
                      <img src={pokemon.img} alt={pokemon.name} />
                    </Link>
                  </td>
                  <td>{pokemon.name}</td>
                  <td>{pokemon.num}</td>
                  <td>
                    {pokemon.type.map((type, idx) => {
                      return <div key={idx}>{type}</div>;
                    })}
                  </td>
                  <td>
                    {pokemon.weaknesses.map((weak, idx) => {
                      return <div key={idx}>{weak}</div>;
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    } else {
      return (
        <Table striped bordered hover variant="dark">
          <thead className="thead">
            <tr>
              <th>Sprite</th>
              <th>Name</th>
              <th>Pokedex Entry</th>
              <th>Pokemon Type(s)</th>
              <th>Pokemon Weaknesses</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {filteredPokemon.map((pokemon, idx) => {
              return (
                <tr key={idx}>
                  <td>
                    <img src={pokemon.img} alt={pokemon.name} />
                  </td>
                  <td>{pokemon.name}</td>
                  <td>{pokemon.num}</td>
                  <td>
                    {pokemon.type.map((type, idx) => {
                      return <div key={idx}>{type}</div>;
                    })}
                  </td>
                  <td>
                    {pokemon.weaknesses.map((weak, idx) => {
                      return <div key={idx}>{weak}</div>;
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    }
  }

  return (
    <div>
      {searchForm()}
      {tableData()}
    </div>
  );
}

export default Pokemon;
