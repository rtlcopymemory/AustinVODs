import React, { Component } from 'react';
import { Row,
         Col } from "reactstrap";
import { withRouter } from 'react-router-dom';

export default class MatchContainer extends Component {
    //props: p1, p2, link
    constructor() {
        super();
        this.state = {
            ID: "",
            imgURL: ""
        }
    }

    componentDidMount() {
        var videoID = this.props.link.split("/");
        var imgthing = "https://img.youtube.com/vi/" + videoID[3] + "/hqdefault.jpg";
        this.setState({ID: videoID, imgURL: imgthing});
        console.log(this.props.link, videoID, imgthing);
    }

    render() {
        return(
            <Row style={{padding: "20px"}}>
                <Col sm="12" md="6">
                    {this.props.p1} vs {this.props.p2}
                </Col>
                <Col sm="12" md={{size: 6, offset: 20}}>
                    <a href={this.props.link}><img alt="Thumbnail" src={this.state.imgURL} height="160" width="200" /></a>
                </Col>
            </Row>
        );
    }
}