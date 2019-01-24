import React, { Component } from 'react';
import { Col,
         Container } from "reactstrap";
import { withRouter } from 'react-router-dom';
//API: https://script.google.com/macros/s/AKfycbxplAP3legxV6uzKfRu7fVyQfgkJ9OUvzoVm3zTe-qS5P2PIQ/exec?query=<search/pr>&player=<STRING>
//get the name from url: this.props.match.params.name

import MatchContainerDubs from './matchContainerDubs';

const myAPI = "https://script.google.com/macros/s/AKfycbzqYgUH1HiHm-ymWcdhy8NGtSm1ye-1eZSZqwdnQWwWekydTpI/exec";

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

    componentDidUpdate() {
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
                    // {"data":[["p1t1","p2t1","p1pr","p2pr","p1ch","p2ch","p1t2","p2t2","p1pr","p2pr","p1ch","p2ch","link","event"]]}
                    this.state.isLoaded ? 
                        (this.state.data[0] === undefined) ?
                        (<Col>No results</Col>)
                        :
                        this.state.data.map((juice, index) => {
                            return (<MatchContainerDubs p1t1={juice[0]} p2t1={juice[1]} p1t1ch={juice[4]} p2t1ch={juice[5]} p1t2={juice[6]} p2t2={juice[7]} p1t2ch={juice[10]} p2t2ch={juice[11]} link={juice[12]} event={juice[13]} index={index} />)
                        })
                    :
                    (<Col>Loading...</Col>)
                }
            </Container>
        );
    }
}

export default withRouter(Results);