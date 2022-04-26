// import React from "react";
import { render } from "react-dom";
import SearchParams from "./SearchParams";
// import Pet from "./Pet";

const App = () => {
    return (
        <div >
            <h1>Adopt Me!</h1>
            <SearchParams />
        </div>
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
