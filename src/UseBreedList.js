import { useState, useEffect } from 'react';

const localCache = {}; //ie - some "local storage" in this case ^_^

export default function useBreedList(animal) {
    const [breedList, setBreedList ] = useState([]);
    const [status, setStatus] = useState("unloaded"); //unloaded, pending, loaded.
    
    useEffect(()=>{
        if(!animal){
            setBreedList([]);
        }
        else if (localCache[animal]){
            setBreedList(localCache[animal]);
        }
        else {
            requestBreedList();
        }

        async function requestBreedList(){
            setBreedList([]);
            setStatus("loading");

            const res = await fetch(`http://pets-v2.dev-apis.com/breeds?animal=${animal}`);
            const json = await res.json();
            localCache[animal] = json.breeds || [];
            setBreedList(localCache[animal]);
            setStatus("loaded");
        }
    }, [animal]);

    return [breedList, status];
}