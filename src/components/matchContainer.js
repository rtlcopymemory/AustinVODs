import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row,
         Col } from "reactstrap";
import YouTube from 'react-youtube';

var context = require.context('./Icons', true, /\.(png)$/);
var files={};

context.keys().forEach((filename)=>{
files[filename] = context(filename);
});
export default class MatchContainer extends Component {
    //props: p1, p2, link, ch1, ch2
    constructor(props) {
        super(props);

        var color = "#2D2D2D";
        if (this.props.index % 2 === 0) {
            color = "#303030";
        }
        
        var character1 = this.props.ch1.split('/');
        for (let i = 0; i < character1.length; i++) {
            character1[i] = character1[i].trim().replace(/ /g, '_');
        }
        var character2 = this.props.ch2.split('/');
        for (let i = 0; i < character2.length; i++) {
            character2[i] = character2[i].trim().replace(/ /g, '_');
        }


        this.state = {
            ID: "",
            imgURL: "",
            bgcolor: color,
            isOpen: false,
            char1: character1,
            char2: character2
        }

        this.openCollapse = this.openCollapse.bind(this);
    }

    componentDidMount() {
        var videoID = this.props.link.split("/");
        var imgthing = "https://img.youtube.com/vi/" + videoID[3] + "/hqdefault.jpg";
        this.setState({ID: videoID[3], imgURL: imgthing});
    }

    openCollapse() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const opts = {
            height: '260',
            width: '100%',
            playerVars: { // https://developers.google.com/youtube/player_parameters
              autoplay: 0
            }
          };
        
        return(
            <div>
                <button className={"collapsible"} onClick={this.openCollapse} style={{backgroundColor: this.state.bgcolor}}>
                    <Row fluid>
                        <Col xs="3" className="containersMatch">
                            <Link onClick={() => this.props.refresh(this.props.p1)} to={"/results/" + this.props.p1}><b>{this.props.p1}</b></Link> {
                                this.state.char1.map( element => {
                                    return (<img alt={element} src={files[("./" + element.toLowerCase() + ".png")]} heigth="25" width="25"></img>)
                                })
                            }
                        </Col>
                        <Col xs="1" className="containersMatch">
                            <span>vs</span>
                        </Col>
                        <Col xs="4" className="containersMatch">
                            <Link onClick={() => this.props.refresh(this.props.p2)} to={"/results/" + this.props.p2}><b>{this.props.p2}</b></Link> {
                                this.state.char2.map( element => {
                                    return (<img alt={element} src={files[("./" + element.toLowerCase() + ".png")]} heigth="25" width="25"></img>)
                                })
                            }
                        </Col>
                        <Col xs="3" className="containersMatch">
                            <Link to={"/event/" + this.props.event}>{this.props.event}</Link>
                        </Col>
                    </Row>
                </button>
                <div className={"content" + (this.state.isOpen ? " in" : "")} style={{backgroundColor: this.state.bgcolor}}>
                    <YouTube
                        videoId = {this.state.ID}
                        opts = {opts}
                        onReady = {this._onReady}
                    />
                </div>
            </div>
        );
    }

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }
}