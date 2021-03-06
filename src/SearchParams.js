import { useState, useEffect, useContext  } from 'react'; //
import useBreedList from './UseBreedList';
import Results from './Results';
import ThemeContext from './ThemeContext';
 
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

// const someFunct = (x,y) => {
//     return x + y;
// }
// const implicitReturnFunctExample = (x,y) => x + y;
const SearchParams = () =>{
    // const location = "Roseburg, Oregon";
    const [ location, setLocation ] = useState(""); //Roseburg, Oregon
  
    const [animal, setAnimal] = useState("");
    const [breed, setBreed] = useState("");
    const [breeds] = useBreedList(animal);
    console.log('this is the recieved breeds list: ');
    console.log(breeds);
    const [theme, setTheme] = useContext(ThemeContext); //why use setTheme, lolz?
    const [pets, setPets] = useState([]);

    useEffect(() => {
        requestPets();
    },[]); //eslint-disable-line react-hooks/exhaustive-deps

    async function requestPets(){
        const res = await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`);
        const json = await res.json();

        setPets(json.pets);
    }

    return (
        <div className="search-params">
            <form
                onSubmit={ (e) => {
                    e.preventDefault(); 
                    requestPets();
                }}>
                <label htmlFor="location">
                    Location {location}
                    <input id="location" 
                    placeholder="Location" 
                    value={location} //now this is uncontrolled inpput, because react isn't doing anything to it.
                    onChange = { (e)=>{ setLocation(e.target.value)}}
                    />
                </label>
                <label htmlFor="animal">
                    Animal 
                    <select
                        id="animal"
                        value={animal}
                        onChange={ (e)=>{ 
                            setAnimal(e.target.value);
                            setBreed("");
                        }}
                        onBlur={ (e)=>{
                            setAnimal(e.target.value);
                            setBreed("");
                        }}
                    >
                        <option />
                        {ANIMALS.map((animal) => (
                            <option key={animal} value={animal}>
                                {animal}
                            </option>
                        ))}
                        {/* 
                        because we are transforming 1 to 1 with no logic, 
                        the above code workds :)
                        {ANIMALS.map((animal) =>{
                            return(
                                <option key={animal} value={animal}>{animal}</option>
                            );
                        })} */}
                    </select>
                </label>
                <label htmlFor="breed">
                    Breed 
                    <select
                        id="breed"
                        value={breed}
                        onChange={ (e)=>{ 
                            setBreed(e.target.value);
                        }}
                        onBlur={ (e)=>{
                            setBreed(e.target.value);
                        }}
                    >
                        <option />
                        {breeds.map((breedo) => (
                            <option key={breedo} value={breedo}>
                                {breedo}
                            </option>
                        ))}
                    </select>
                </label>
                <label htmlFor="theme">
                    Theme
                    <select
                        value={theme}
                        onChange = { (e) => setTheme(e.target.value) }
                        onBlur = { (e) => setTheme(e.target.value) }
                    >
                        <option value="peru">Peru</option>
                        <option value="aqua">Aqua</option>
                        <option value="chartreuse">Chartreuse</option>
                        <option value="mediumorchid">Medium Orchid</option>
                        <option value="#f06d06">Fog Dog</option>
                    </select>
                </label>
                <button style={{ backgroundColor: theme }}>Submit</button>
            </form>
            <Results pets={pets}/>
        </div>
    )
}

export default SearchParams;