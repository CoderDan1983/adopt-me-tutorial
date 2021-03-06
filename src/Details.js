import { Component } from "react";
import { useParams } from 'react-router-dom';
import Carousel from "./Carousel";
import ErrorBoundary from './ErrorBoundary';
import ThemeContext from "./ThemeContext";
import Modal from './Modal';

class Details extends Component {
    // constructor(props){
    //     super(props); //* super says give this to my parent class 
    //     this.state = { loading: true} 
    //     //* this - used to manage state and props.  the instance of Details :)
    // } //* in this case you are passing props to component/react, so it knows you got the props.

    state = { loading: true, showModal: false };

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

    toggleModal = () => this.setState({ showModal: !this.state.showModal });
    render(){
        if(this.state.loading){
            return <h2>Loading ... </h2>
        }

        //throw new Error("lolz.  You crashed")

        const { animal, breed, city, state, description, name, images, showModal } = this.state;
        return(
            <div className="details">
                <Carousel images={images} />
                <div>
                    <h1>{name}</h1>
                    <h2>
                        {animal} - {breed} - {city}, {state}
                    </h2>
                    <ThemeContext.Consumer>
                        {
                            ([theme]) =>( 
                                <button
                                    onClick={this.toggleModal} 
                                    style={ { backgroundColor: theme } }
                                >
                                    Adopt { name }
                                </button>
                            )
                        }
                    </ThemeContext.Consumer>
                    <p>{description}</p>
                    { showModal ? (
                            <Modal>
                                <div>
                                    <h1>Would you like to adopt { name }?</h1>
                                    <div className="buttons">
                                        <a href="https://bit.ly/pet-adopt">Yes</a>
                                        <button onClick={this.toggleModal}>No</button>
                                    </div>
                                </div>
                            </Modal>
                        ) : null }
                </div>
            </div>
        )
    }   
}

const WrappedDetails = () => {
    const params = useParams();
    //easier way -- > const [theme] = useContext(ThemeContext); //this.props.theme 
    return(
        <ErrorBoundary>
            <Details params={params} />
        </ErrorBoundary>
    )
}

// const Details = () => {
//     const { id } = useParams();
//    return <h2>{ id } </h2>
// } 

export default WrappedDetails ;

