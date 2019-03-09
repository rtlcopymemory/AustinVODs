import React, { Component } from 'react';
import { Col,
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
            data: [],
            page: 1
        }
        this.getResponse.bind(this);
        this.next50 = this.next50.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        this.setState({
            data: []
        });
        this.getResponse(0);
    }

    // componentDidUpdate() {
    //     this.getResponse(0);
    // }

    getResponse(start) {
        fetch(myAPI + "?query=pr")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    data: result.data.map( (item, index) => {
                        if (index < start+50 && index >= start) {
                            return item;
                        } return undefined;
                    })
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

    next50() {
        this.getResponse(50*(this.state.page));
        this.setState({
            page: this.state.page+1
        });
    }

    refresh() {
        this.setState({
            data: []
        });
        this.getResponse(50*(this.state.page));
    }

    render() {
        function isEmpty(array) {
            for (let i = 0; i < array.length; i++) {
                if (array[i] !== undefined) return false;
            }
            return true;
        }
        return (
            <Container style={{color: 'white'}} >
                {
                    this.state.isLoaded ? 
                    //(<MatchContainer p1={this.state.data[0][0]} p2={this.state.data[0][3]} link={this.state.data[0][6]}/>)
                    // This code was from before I started the algorythms class and I regret this SOOOOO MUCH
                        (isEmpty(this.state.data)) ?
                        (<Col>No results</Col>)
                        :
                        this.state.data.map((juice, index) => {
                            if (index === ((this.state.page * 50) + 1)) {
                                return (<div onClick={this.next50} key={index} index={index} className="NextButton">Next</div>);
                            }
                            if (juice === undefined) {
                                return undefined;
                            }
                            return (<MatchContainer refresh={this.refresh} p1={juice[0]} p2={juice[3]} link={juice[6]} ch1={juice[2]} ch2={juice[5]} index={index} event={juice[7]} key={index} />)
                        })
                    :
                    (<Col>Loading...</Col>)
                }
            </Container>
        );
    }
}

export default withRouter(Results);