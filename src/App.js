import React, { Component } from 'react';
import { Container, Row, Col } from "reactstrap";

import SearchBar from "./components/searchbar";
import EventsList from './components/eventsList';

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
  }

  render() {
    return (
      <Container style={{backgroundColor: "#333333"}}>
        <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}><SearchBar /></Col>
        </Row>
        <EventsList />
      </Container>
    );
  }
}

export default App;
