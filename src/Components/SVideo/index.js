import React, { Component } from 'react';
import { SText, SView, } from 'servisofts-component';


export default class SVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    componentDidMount() {
        this.video.play()
    }

    render() {
        return <SView col={"xs-12"} flex style={{
            overflow: "hidden"
        }} center onPress={() => {
            this.state.paused = !this.state.paused;
            if (!this.state.paused) {
                this.video.play()
            } else {
                this.video.pause()
            }
            this.setState({ paused: this.state.paused })
        }}>
            <video ref={ref => this.video = ref} src={this.props.src} style={{
                objectFit: "contain",
                ...this.props.style
            }} autoPlay={!this.props.paused}  >

            </video>
        </SView>
    }
}
