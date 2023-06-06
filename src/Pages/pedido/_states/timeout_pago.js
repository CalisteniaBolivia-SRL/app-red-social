import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SForm, SHr, SIcon, SImage, SLoad, SMarker, SMath, SNavigation, SPage, SPopup, SText, STheme, SView, SMapView } from 'servisofts-component';
import { Container, PButtom, Restaurante, TipoPago } from '../../../Components';
import SSocket from 'servisofts-socket';



export default class listo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: -17.7833276,
                longitude: -63.1821408,
            }
        };
    }


    componentDidMount() {
        this.isRun = true;
    }
    componentWillUnmount() {
        this.isRun = false;
    }






    render() {
        return (<SView col={"xs-12"} backgroundColor={STheme.color.card} height >
            <Container>
                {/* <SHr height={18} /> */}

                <SText>Vencio el tiempo para realizar el pago!</SText>
                <SView col={"xs-2"} height={200} row center>
                    <SIcon fill={STheme.color.secondary} name={"Gusano"} height={200} />
                </SView>

            </Container>
        </SView>
        );


    }
}

