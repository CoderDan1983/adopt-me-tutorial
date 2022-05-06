import { Component } from "react";
import { Link, Navigate } from "react-router-dom";

class ErrorBoundary extends Component {
    //even if we don't read off of redirect, ts now knows about it's type.
    //also, good for documentation
    state = { hasError: false, redirect: false } 
    static getDerivedStateFromError(){
        //* what do you want me to give back when component has an error?
        //we're going to rerender your component.  
        // WHat new state would you like for your component?
        return { hasError: true } 
    } //* method must be named this.

    componentDidCatch(error, info){ //(an error)
        //* you would call something like trackjs here 
        //(it's an error tracking service for javascript)
        //basically, send it to wherever you are catching the errors
        //in our case...
        console.error(error, info); //lolz, get something better :D
    }

    componentDidUpdate(){
        if(this.state.hasError){
            setTimeout(()=> this.setState({ redirect: true}), 5000)
        }
    }

    render(){
        if(this.state.redirect){
            return <Navigate to="/" />
        }
        else if(this.state.hasError){
            return(
                <h2>
                    There was an error.  Oh no.  What are we going to do?  JK. {" "}
                    <Link to="/">Click here</Link> to go back to the homepage.  Or wait 
                    five seconds and we will do it for you.  Or not.  I am not your mom.
                </h2>
            )
        }

        return this.props.children; //* if no error, render normally.
    }
}

export default ErrorBoundary;