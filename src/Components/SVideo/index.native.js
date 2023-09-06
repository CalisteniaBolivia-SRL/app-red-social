import React, { Component } from 'react';
import { SView, } from 'servisofts-component';

import Video from 'react-native-video';

export default class SVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return <SView col={"xs-12"} center
            flex
            style={{
                overflow: "hidden"
            }}
            onPress={() => this.setState({ paused: !this.state.paused })}
        >
            <Video
                paused={this.state?.paused}
                source={{
                    uri: this.props.src
                }}
                resizeMode={"contain"}
                style={{
                    height: "100%",
                    width: "100%"
                }}
                {...this.props}
            />
        </SView>
    }
}
