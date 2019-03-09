import React, { Component } from 'react';
import { Col,
         Container } from "reactstrap";
import { withRouter } from 'react-router-dom';
//API: https://script.google.com/macros/s/AKfycbxplAP3legxV6uzKfRu7fVyQfgkJ9OUvzoVm3zTe-qS5P2PIQ/exec?query=<search/pr>&player=<STRING>
//get the name from url: this.props.match.params.name

import MatchContainer from './matchContainer';
import InfiniteScroll from 'react-infinite-scroller';

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
        this.setState({
            data: []
        });
        this.getResponse(0);
    }

    componentDidUpdate() {
        this.getResponse(0);
    }

    getResponse(start) {
        fetch(myAPI + "?query=pr")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    data: result.data.map( (item, index) => {
                        if (index < start+50) {
                            return item;
                        }
                    })
                });
                console.log(this.state.data);
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
                        this.state.data.map((juice, index) => {
                            if (juice === undefined) {
                                return;
                            }
                            return (<MatchContainer p1={juice[0]} p2={juice[3]} link={juice[6]} ch1={juice[2]} ch2={juice[5]} index={index} event={juice[7]} key={index} />)
                        })
                    :
                    (<Col>Loading...</Col>)
                }
            </Container>
        );
    }
}

export default withRouter(Results);