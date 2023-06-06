import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SHr, SImage, SText, SView } from 'servisofts-component';

export default class HeaderTarjeta extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SView col={"xs-12"}>
                <SHr height={30} />
                <SText fontSize={16} bold>Tarjetas de crédito o débito</SText>
                <SHr />
                <SText fontSize={14} >Tapeke acepta la mayoría de tarjetas de crédito y débito.</SText>
                <SHr />
                <SView col={"xs-12"} row height={30}>
                    <SImage src={require('../../../Assets/img/tarjeta1.png')} style={{ width: 40 }} />
                    <SImage src={require('../../../Assets/img/tarjeta2.png')} style={{ width: 40 }} />
                    <SImage src={require('../../../Assets/img/tarjeta3.png')} style={{ width: 40 }} />
                </SView>
                <SHr />
                <SHr />
                <SView col={"xs-12"} height={18} card />
            </SView>
        );
    }
}
