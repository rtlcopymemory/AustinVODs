import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import firebase from "firebase";
//import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

firebase.initializeApp({
  apiKey: "AIzaSyCIPlwX5hVrpR42ETE1O7bwpQNNxMZB2mQ",
  authDomain: "austinvods.firebaseapp.com"
})
  
export default class NavThing extends Component {
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }

    state = { isSignedIn: false }
    uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccess: () => false
      }
    }

    componentDidMount = () => {
      firebase.auth().onAuthStateChanged(user => {
        this.setState({ isSignedIn: !!user });
        //console.log("user", user);
        firebase.auth().currentUser.getIdToken().then(data => this.setState({theThing: data}))
      });
    }

    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    logOut() {
      firebase.auth().signOut();
    }
    //Render Function --------------------------------------------------------------
    render() {
      return (
        <div>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">AustinVODs</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  {this.state.isSignedIn ? 
                  //("" + firebase.auth().currentUser.getIdToken().i)
                  (<NavLink onClick={this.logOut}>{firebase.auth().currentUser.displayName}</NavLink>)
                  :
                  (<NavLink href="#/login">Login</NavLink>)
                  }
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
}