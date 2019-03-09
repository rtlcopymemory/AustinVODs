import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const myAPI = "https://script.google.com/macros/s/AKfycbxplAP3legxV6uzKfRu7fVyQfgkJ9OUvzoVm3zTe-qS5P2PIQ/exec";

export default class EventsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            data: [],
        }
        this.getResponse.bind(this);
    }

    componentDidMount() {
        this.getResponse();
    }

    getResponse() {
        fetch(myAPI + "?query=events")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    data: result
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
    }

    render() {
        return (
            <div style={{paddingTop: "20px", textAlign: 'center', color: 'white'}}>
            <div>Events:</div>
                {
                    this.state.isLoaded ?
                        (<div>{this.state.data.map((event, index) => {
                            return (<div><Link className="eventList" key={index} id={index} to={"/event/" + event} onMouseOver={this.onHover} onMouseOut={this.onOut} style={{textDecoration: 'none'}}><div style={{
                                                textAlign: 'center',
                                                padding: '5px',
                                                border: '2px solid #4d5256',
                                                borderRadius: '25px',
                                                display: 'inline-block',
                                                width: '30vmax',
                                                transform: 'translateY(' + (5 * index) + 'px)',
                                                backgroundColor: '#4d5256',
                                                boxShadow: '0px 0px 5px 0px rgb(22, 22, 22)'
                                            }} id={event}>{event}</div></Link><br /></div>
                            );
                        })}</div>)
                    :
                        (<p>Loading...</p>)
                }
            </div>
        );
    }
}