import { createContext } from "react";

const ThemeContext = createContext(["#f06g06", ()=>{}]);
//* we're basically mimicing a useState hook :)
//* we put the value in so that typescript knows it's type, even if we aren't using typescript.

export default ThemeContext;