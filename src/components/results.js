import React, { Component } from 'react';
import { Row,
         Col,
         Container } from "reactstrap";
import { withRouter } from 'react-router-dom';
//API: https://script.google.com/macros/s/AKfycbxplAP3legxV6uzKfRu7fVyQfgkJ9OUvzoVm3zTe-qS5P2PIQ/exec?query=<search/pr>&player=<STRING>
//get the name from url: this.props.match.params.name

import MatchContainer from './matchContainer';

const myAPI = "https://script.google.com/macros/s/AKfycbxplAP3legxV6uzKfRu7fVyQfgkJ9OUvzoVm3zTe-qS5P2PIQ/exec";

class Results extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
        this.getResponse.bind(this);
    }

    componentDidMount() {
        this.getResponse();
    }

    getResponse() {
        fetch(myAPI + ("?query=search&player=" + this.props.match.params.name))
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    data: result.data
                });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                isLoaded: true,
                error
                });
            }
        )
        if (this.state.data[0] === undefined) {
            
        }
    }

    render() {
        return (
            <Container style={{color: 'white'}} >
                {
                    this.state.isLoaded ? 
                    //(<MatchContainer p1={this.state.data[0][0]} p2={this.state.data[0][3]} link={this.state.data[0][6]}/>)
                        (this.state.data[0] === undefined) ?
                        (<Col>No results</Col>)
                        :
                        this.state.data.map((juice) => {
                            return (<MatchContainer p1={juice[0]} p2={juice[3]} link={juice[6]} ch1={juice[2]} ch2={juice[5]} />)
                        })
                    :
                    (<Col>Loading...</Col>)
                }
            </Container>
        );
    }
}

export default withRouter(Results);