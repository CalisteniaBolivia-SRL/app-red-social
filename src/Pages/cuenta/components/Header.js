import React, { Component } from 'react';
import { SHr, SIcon, SText, STheme, SView } from 'servisofts-component';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SView col={"xs-12"} center >
                <SView center col={"xs-10"} >
                    <SText center font="Oswald-Bold" fontSize={22}
                        style={{
                            textTransform: "uppercase"
                        }}>{this.props.titulo}</SText>
                </SView>
                <SHr height={20} />
                <SView center >
                    <SIcon name={this.props.icon} fill={STheme.color.text} height={154} width={154} />
                </SView>
                <SHr height={25} />
                <SView center col={"xs-10"} >
                    <SText center fontSize={16}>
                        {this.props.descripcion}</SText>
                </SView>
            </SView>
        );
    }
}
