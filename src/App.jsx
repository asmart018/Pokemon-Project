import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import Pokemon from "./pages/home.page";
import DetailPokemon from "./pages/details.page";

function App() {
  let [lightMode, setLightMode] = useState(true);

  function ChooseMode() {
    let root = document.getElementById("root");

    if (lightMode) {
      root.setAttribute("class", "lightMode");
      return (
        <BrowserRouter className="lightMode">
          <div className="btnDiv">
            <Button className="m-20" variant="danger">
              <NavLink className="white" to={"/"}>
                Home
              </NavLink>
            </Button>
            <Button
              className="mode m-20"
              onClick={() => setLightMode(false)}
              variant="dark"
            >
              Dark Mode
            </Button>
          </div>
          <h1 className="pokedex black">Pokedex</h1>

          <Routes>
            <Route path="/" element={<Pokemon mode={lightMode} />}></Route>
            <Route
              path=":name"
              element={<DetailPokemon mode={lightMode} />}
            ></Route>
          </Routes>
        </BrowserRouter>
      );
    } else {
      root.setAttribute("class", "darkMode");

      return (
        <BrowserRouter className="darkMode">
          <div className="btnDiv">
            <Button className="m-20" variant="danger">
              <NavLink className="white" to={"/"}>
                Home
              </NavLink>
            </Button>
            <Button
              className="mode m-20"
              onClick={() => setLightMode(true)}
              variant="light"
            >
              Light Mode
            </Button>
          </div>
          <h1 className="pokedex white">Pokedex</h1>

          <Routes>
            <Route path="/" element={<Pokemon mode={lightMode} />} />
            <Route path=":name" element={<DetailPokemon mode={lightMode} />} />
          </Routes>
        </BrowserRouter>
      );
    }
  }

  return <div>{<ChooseMode />}</div>;
}

export default App;
