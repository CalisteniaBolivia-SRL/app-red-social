import React, { Component } from 'react';
import { SIcon, SNavigation, STheme, SView } from 'servisofts-component';

export default class BackButtom extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    handlePress = () => {
        SNavigation.goBack();
    }

    render() {
        return (
            <SView style={{
                position: "absolute",
                width: 50,
                height: 50,
                top: 0,
                left: 0,
            }} center onPress={this.handlePress}>
                <SView style={{
                    height: 36,
                    width: 36,
                    borderRadius: 100,
                    padding: 10,
                    backgroundColor: STheme.color.card
                }} center>
                    <SIcon name={"Iback"} fill={STheme.color.background} />

                </SView>
            </SView>
        );
    }
}
