import { Component } from "react";
import ErrorMessage from "../errorMassage/errorMessage";

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch() {
        
    }

    render() {
        if(this.state.error) {
            return <ErrorMessage/>
        }
        return this.props.children;
    }
}

export default ErrorBoundary;