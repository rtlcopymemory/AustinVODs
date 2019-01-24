import React, { Component } from 'react';
import { Container, Row, Col } from "reactstrap";

import SearchBarDubs from "./searchbarDubs";
import EventsListDubs from './eventsListDubs';

class DubsMain extends Component {
  render() {
    return (
      <Container style={{backgroundColor: "#333333"}}>
        <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}><SearchBarDubs /></Col>
        </Row>
        <EventsListDubs />
      </Container>
    );
  }
}

export default DubsMain;
