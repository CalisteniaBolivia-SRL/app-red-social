import React, { Component } from 'react';
import { SHr, SIcon, SText, STheme, SView } from 'servisofts-component';

export default class Dia extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SView col={"xs-12"} center backgroundColor={STheme.color.primary}>
                <SText>{this.props.dia}</SText>
            </SView>
        );
    }
}
