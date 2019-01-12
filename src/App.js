import React, { Component } from 'react';
import firebase from "firebase";
import { Container, Row, Col } from "reactstrap";

import SearchBar from "./components/searchbar";

class App extends Component {
  constructor() {
    super();
    this.state = {
        isLogged: false
    }
  }

  componentDidMount() {
    var path = window.location.pathname + window.location.hash;
    if (path.includes("/AustinVODs#/AustinVODs#/") || path.includes("AustinVODs/#/AustinVODs#/")) {
        window.location.replace("/AustinVODs");
    }
    firebase.auth().onAuthStateChanged((user) => {
        if (user != null) {
            this.setState({
                isLogged: true
            });
        } else {
            this.setState({
                isLogged: false
            });
        }
      });
  }

  render() {
    return (
      <Container style={{backgroundColor: "#333333"}}>
        <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}><SearchBar /></Col>
        </Row>
      </Container>
    );
  }
}

//Stateless
/*
  export const NAME = (props) => {
    this is already
    the render function
  };
*/
//State
/*
  you need a constructor(props) {
    super(props) // to call the parent constructor
    this.state = {

    };
  }
*/

export default App;
