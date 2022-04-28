import { Component } from "react";
import { useParams } from 'react-router-dom';
import Carousel from "./Carousel";

class Details extends Component {
    // constructor(props){
    //     super(props); //* super says give this to my parent class 
    //     this.state = { loading: true} 
    //     //* this - used to manage state and props.  the instance of Details :)
    // } //* in this case you are passing props to component/react, so it knows you got the props.

    state = { loading: true };

    async componentDidMount(){
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
        )

        const json = await res.json();

        //this.setState(Object.assign({loading: false}, json.pets[0]));
        this.setState({ loading: false, ...json.pets[0] });
        //* the above line is equivalent to the 4 lines below.  It makes sure
        //* that we only render/setState once for this :)
        //* Hopefully react would know to batch changes in one, 
        //*but we can't guarantee this.
        // this.setState({
        //     loading: false
        // });
        // this.setState(json.pets[0]);
    }
    render(){
        if(this.state.loading){
            return <h2>Loading ... </h2>
        }

        const { animal, breed, city, state, description, name, images } = this.state;
        return(
            <div className="details">
                <Carousel images={images} />
                <div>
                    <h1>{name}</h1>
                    <h2>
                        {animal} - {breed} - {city}, {state}
                    </h2>
                    <button>Adopt {name}</button>
                    <p>{description}</p>
                </div>
            </div>
        )
    }   
}

const WrappedDetails = () => {
    const params = useParams();
    return <Details params={params} />
}

// const Details = () => {
//     const { id } = useParams();
//    return <h2>{ id } </h2>
// } 

export default WrappedDetails ;

