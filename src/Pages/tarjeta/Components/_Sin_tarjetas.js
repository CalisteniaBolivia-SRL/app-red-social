import React, { Component } from 'react';
import { SButtom, SHr, SIcon, SImage, SNavigation, SPage, SText, STheme, SThread, SView } from 'servisofts-component';
import { Container, PButtom } from '../../../Components';

export default class Sin_tarjetas extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (<Container flex>
            {/* <SText>No tiene tarjeta registrada</SText> */}
            <SHr height={30} />
            <SView col={"xs-12"} center row style={{ backgroundColor: STheme.color.primary, borderRadius: 12 }}>
                <SView col={"xs-12"} row center   >
                    <SView col={"xs-11"} border={'transparent'}  >
                        <SHr height={20} />
                        <SText fontSize={24} color={STheme.color.white}   bold center> No hay tarjeta registrada</SText>
                        <SHr height={20} />
                        <SText fontSize={18} color={STheme.color.white} bold center   >Agrega tu tarjeta de crédito o débito para usarla en cualquier momento</SText>
                    </SView>
                </SView>
                <SView col={"xs-11"} center height={400} style={{ overflow: 'hidden' }}>
                    <SHr height={20} />
                    <SView center col={"xs-12"}
                        style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            right: "0%",
                            // bottom: "-10%",
                        }} >
                        {/* <SIcon name="SinTarjeta" height={380}></SIcon > */}
                        <SImage src={require('../../../Assets/img/sinTarjeta.png')} style={{ height: 400 }} />
                    </SView>
                </SView>
                <SView col={"xs-12"} row center   >
                    <SView col={"xs-10"} border={'transparent'} center>
                        <SHr height={20} />
                        {/* <PButtom3 secondary props={{ type: "outline" }} onPress={() => { SNavigation.navigate(Parent.component + "/registro", { callback: this.callback, keyPedido: this.keyPedido }); }} >AÑADIR TARJETA</PButtom3> */}
                        <PButtom fontSize={20} width={"100%"} height={50} bold withe center onPress={() => {
                            SNavigation.navigate("/tarjeta/new")
                        }} >AÑADIR TARJETA</PButtom>
                    </SView>
                    <SHr height={30} />
                </SView>
            </SView>
            <SHr height={30} />
        </Container >
        );
    }
}