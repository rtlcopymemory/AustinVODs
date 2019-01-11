import React, { Component } from 'react';
import { InputGroup,
        InputGroupAddon,
        Input,
        Button } from "reactstrap";
//import firebase from "firebase";

export default class SearchBar extends Component {
    render() {
        return (
            <div>
                <InputGroup style={{paddingTop: "10px"}}>
                <Input />
                <InputGroupAddon addonType="append"><Button>Search</Button></InputGroupAddon>
                </InputGroup>
            </div>
        );
    }
}