import React, { Component } from 'react';
import { SView, } from 'servisofts-component';

import Video from 'react-native-video';

export default class SVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            muted: true,
        };

    }

    render() {
        return <SView col={"xs-12"} center
            flex
            style={{
                overflow: "hidden"
            }}
            activeOpacity={1}
            onPress={() => this.setState({ muted: !this.state.muted })}
        >
            <Video
                muted={this.state?.muted}
                // paused={this.state?.paused}
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
