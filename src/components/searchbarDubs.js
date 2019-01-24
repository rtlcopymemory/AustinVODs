import React, { Component } from 'react';
import { InputGroup,
        InputGroupAddon,
        Input,
        Button,
        Form } from "reactstrap";
import { withRouter } from 'react-router-dom';
//import firebase from "firebase";
//API: https://script.google.com/macros/s/AKfycbxplAP3legxV6uzKfRu7fVyQfgkJ9OUvzoVm3zTe-qS5P2PIQ/exec?query=<search/pr>&player=<STRING>

class SearchBarDubs extends Component {
    constructor() {
        super();
        this.state = {
            player: ""
        }

        this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.history.push('/resultsDubs/' + this.state.player);
    }

    render() {
        return (
            <div>
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <InputGroup style={{paddingTop: "10px"}}>
                        <Input  type="text"
                                name="search"
                                placeholder="Player Name"
                                value={this.state.player}
                                onChange={e => this.setState({ player: e.target.value })}/>
                        <InputGroupAddon addonType="append"><Button >Search</Button></InputGroupAddon>
                    </InputGroup>
                </Form>
            </div>
        );
    }
}

export default withRouter(SearchBarDubs);