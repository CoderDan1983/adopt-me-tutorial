import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { StrictMode, useState } from "react";
import ThemeContext from "./ThemeContext";
import SearchParams from "./SearchParams";
import Details from './Details';

const App = () => {
    const theme = useState("aqua");
    return (
        <StrictMode>
            <ThemeContext.Provider value={theme}>
                <BrowserRouter>
                    <header>
                        <Link to="/">Adopt Me!</Link>
                    </header>
                    <Routes>
                        <Route path="/details/:id" element={<Details />} />
                        <Route path="/" element={<SearchParams />} />
                    </Routes>
                </BrowserRouter>
            </ThemeContext.Provider>
        </StrictMode>
    )
}

render(<App />, document.getElementById("root"));

//write code here
// const App = () => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", { id: "brand" }, "Adopt Me!"),
//     React.createElement(Pet, {
//       name: "Sol",
//       animal: "Salamander",
//       breed: "Bernese",
//     }),
//     React.createElement(Pet, {
//       name: "salty",
//       animal: "chicken",
//       breed: "deep fried",
//     }),
//     React.createElement(Pet, { name: "Boink", animal: "cat", breed: "Pix" }),
//   ]);
// };
//render(React.createElement(App), document.getElementById("root"));
