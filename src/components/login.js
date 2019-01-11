import React, { Component } from 'react';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Row, Col, Container} from "reactstrap";
import { createBrowserHistory } from 'history';
import { Redirect } from 'react-router-dom';

const history = createBrowserHistory();

// firebase.initializeApp({
//     apiKey: "AIzaSyDLoqcbTDMFuurtAyDgVEKZ6qwo0j0Osjk",
//     authDomain: "fir-auth-tutorial-ed11f.firebaseapp.com"
//   })

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            isLogged: false
        }
    }

    componentDidMount() {
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

    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccessWithAuthResult: () => false
        }
    }

    render() {
      return (
        <div>
          {this.state.isLogged ? 
            (   
                <Container>
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 5 }} style={{color: "white"}}>You're logged in</Col>
                        {history.push("../")}
                        <Redirect to="" />
                    </Row>
                </Container>
            )
          :
            (<StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />)
          }
        </div>
      );
    }
  }