import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SLoad, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import { AccentBar, BtnNavegar, Container, PButtom, Restaurante } from '../../Components';
import Model from '../../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.pk = SNavigation.getParam("pk");
    }
    load_data() {
        this.data = Model.restaurante.Action.getByKeyRecursive(this.pk);
        if (!this.data) return null;
        return this.data;
    }

    getInfo() {

        // var auxRestaurante = restaurante.Actions.getByKeyDetalle(this.key_restaurante, this.props)
        // if (!auxRestaurante) return <SLoad />

        return <SView col={"xs-11 sm-7 lg-4"} style={{ position: 'absolute', borderRadius: 20, bottom: 20 }} backgroundColor={'#ffffff'} row center>
            <SView width={12} />
            <SView col={"xs-3"} style={{
                maxWidth: 100,
            }} colSquare>
                <Restaurante.FotoPortada data={this.data} style={{ width: "100%", position: "relative", resizeMode: "cover", borderRadius: 10 }} />

                {/* <SImage src={`${SSocket.api.root}restaurante/${auxRestaurante.key}`} style={{ width: "100%", position: "relative", resizeMode: "cover", borderRadius: 10 }} /> */}
            </SView>
            <SView width={10} />
            <SView flex height  >
                <SHr height={10} />
                <SText color={STheme.color.text} fontSize={14} style={{ fontWeight: "bold" }}  >{this.data.nombre}</SText>
                <SHr height={3} />
                <SView col={"xs-12"} height={15} row center style={{ justifyContent: 'flex-start', }}>
                    <Restaurante.ProximoHorario data={this.data} col={"xs-12"} fontSize={12} />


                </SView>
                <SHr height={3} />
                <SView row >
                    <SIcon name={"Marker"} width={11} fill={"#000"} />
                    <SView width={4} />
                    <SView col={"xs-11"}>
                        <SText color={STheme.color.text} fontSize={12} >{this.data.direccion} </SText>
                    </SView>

                </SView>
                <SHr height={3} />
                <SView style={{ justifyContent: 'flex-end', }} row center>


                    <BtnNavegar latLng={{ latitude: this.data?.latitude, longitude: this.data?.longitude }}
                    >
                        <SView center backgroundColor={STheme.color.primary} width={80} height={24} style={{
                            borderRadius: 4,
                        }} >
                            <SView center row>
                                <SView col={"xs-3"} center>
                                    <SIcon name={"Marker"} width={10} fill={"#fff"} />
                                </SView>
                                <SView col={"xs-1"} />
                                <SView col={"xs-8"}>
                                    <SText color={"#fff"} center fontSize={10} >VIAJAR</SText>
                                </SView>
                            </SView>
                        </SView>
                    </BtnNavegar>
                </SView>
                <SHr />
                <SHr height={8} />


            </SView>
            <SView width={12} />
        </SView>
    }


    render_data() {
        if (!this.load_data()) return <SLoad />
        return <SView col={"xs-12"} center height>
            <SView col={"xs-12"} flex  >
                <Restaurante.Mapa data={this.data} height />
                {/* <SView col={"xs-12"} height backgroundColor={STheme.color.primary} /> */}
            </SView>

            {this.getInfo()}
        </SView>
    }
    render() {
        return (
            <SPage header={<AccentBar />}>
                {this.render_data()}
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);