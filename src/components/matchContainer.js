import React, { Component } from 'react';
import { Row,
         Col } from "reactstrap";

export default class MatchContainer extends Component {
    //props: p1, p2, link, ch1, ch2
    constructor(props) {
        super(props);
        var color = "#2D2D2D";
        if (this.props.index % 2 === 0) {
            color = "#303030";
        }

        this.state = {
            ID: "",
            imgURL: "",
            bgcolor: color
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
            <Row fluid style={{padding: "20px", color: 'white', backgroundColor: this.state.bgcolor}}>
                <Col sm="12" md="6" style={{textAlign: "center"}} >
                    {this.props.p1} vs {this.props.p2}
                    <hr style={{borderColor: "purple", backgroundColor: "purple"}}/>
                    {this.props.ch1} vs {this.props.ch2}
                </Col>
                <Col sm="12" md="3" style={{textAlign: "center"}}>
                    <a href={this.props.link}><img alt="Thumbnail" src={this.state.imgURL} height="160" width="200" /></a>
                </Col>
            </Row>
        );
    }
}