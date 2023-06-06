import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SLoad, SMarker, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import SMapView from 'servisofts-component/Component/SMapView';
import { AccentBar, Container, PButtom, Restaurante } from '../../Components';
import MediaRestaurante from '../../Components/MediaRestaurante';
import Model from '../../Model';

const testLatd = -17.74239701654446;
const testLong = -63.169187267973264;

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

    recoger() {
        return <>
            <SView col={"xs-12"} center style={{ backgroundColor: STheme.color.white }}>
                <Container>
                    <SView col={"xs-12"} style={{ backgroundColor: STheme.color.white }}>
                        <SView col={"xs-11"} row>
                            <SHr height={15} />
                            <SText fontSize={12} style={{ fontWeight: "bold" }}>RECOGE TU PACK AQUÍ</SText>
                            <SHr height={15} />
                        </SView>
                        <Restaurante.Mapa data={this.data} height={200} />
                        {/* <SView col={"xs-12"} height={200} card /> */}
                        <SView center col={"xs-12"} row style={{ borderBottomWidth: 1, borderTopWidth: 1, borderColor: STheme.color.lightGray }}>
                            <SView col={"xs-6"} row center style={{ borderRightWidth: 1, borderColor: STheme.color.lightGray }}
                                onPress={() => { SNavigation.navigate("/restaurante/detalle", { pk: this.pk }); }}>
                                <SHr height={20} />
                                <SIcon name={'Detalle'} height={17} width={22} />
                                <SText center color={STheme.color.primary} fontSize={15} style={{ fontWeight: "bold" }}>Detalles</SText>
                                <SHr height={20} />
                            </SView>
                            <SView col={"xs-6"} center row onPress={() => { SNavigation.navigate("/restaurante/comollegar", { pk: this.pk }); }}>
                                <SIcon name={'ComoLlegar'} height={26} width={26} />
                                <SText color={STheme.color.primary} fontSize={15} style={{ fontWeight: "bold" }}>Cómo llegar</SText>
                            </SView>
                        </SView>
                        {this.hayDelivery(this.data?.delivery)}
                    </SView>

                </Container>
            </SView>
            <SHr height={18} />
        </>
    }

    hayDelivery(delivery) {
        if (delivery == true) {
            return <>
                <SView col={"xs-12"} center row  >
                    <SHr height={30} />
                    <SView col={"xs-4"} center >
                        <SIcon name={'Moto'} height={66} width={102} />
                    </SView>
                    <SView col={"xs-8"} center >
                        <SText color={STheme.color.gray} fontSize={15} style={{ fontWeight: "bold" }}>Este establecimiento te proporcionará todo lo necesario para llevarte tu pack a casa.</SText>
                    </SView>
                    <SHr height={30} />
                </SView>
            </>
        }
    }

    render_data() {
        if (!this.load_data()) return <SLoad />

        console.log("primero ", this.data);
        return <SView col={"xs-12"} center style={{ backgroundColor: STheme.color.card }}>

            <Restaurante.FotoPortada data={this.data} height={150} />


            <SView col={"xs-12"} row style={{ backgroundColor: STheme.color.white }} center>
                <SHr height={20} />
                <Container>
                    <Restaurante.FotoPerfil data={this.data} width={60} height={60} style={{ borderRadius: 100, position: "absolute", top: -100 }} />
                    <Restaurante.Favorito data={this.data} style={{ position: "absolute", top: -45, right: 0 }} />

                    <SText col={"xs-12"} bold fontSize={16}>{this.data?.nombre}</SText>
                    <SHr />
                    <Restaurante.ProximoHorario data={this.data} col={"xs-12"} />
                </Container>
                <SHr height={20} />
            </SView>

            <SHr height={20} />
            <Container>
                <SView col={"xs-12"} center style={{ backgroundColor: STheme.color.white, borderRadius: 16, overflow: "hidden", borderWidth: 2, borderColor: STheme.color.card }}>
                    <SView col={"xs-11"} row >
                        <SHr height={15} />
                        <SText fontSize={16} style={{ fontWeight: "bold" }}>Sobre nosotros</SText>
                        <SHr height={10} />
                        <SText style={{ textAlign: "justify" }} fontSize={14}   >{this.data?.descripcion}</SText>
                        <SHr height={15} />
                    </SView>
                </SView>
                {/* <SHr height={18} /> */}

                <MediaRestaurante data={this.data} />

                {/* <SView col={"xs-12"} center style={{ backgroundColor: STheme.color.white, borderRadius: 16, overflow: "hidden", borderWidth: 2, borderColor: STheme.color.card }}>
                    <SView col={"xs-11"}>
                        <SHr height={15} />
                        <SText fontSize={16} style={{ fontWeight: "bold" }}>Que piensan de nosotros</SText>
                        <SHr height={8} />
                        <SView col={"xs-12"} center row>
                            <SView col={"xs-2"} flex center>
                                <SIcon name={'MeGusta'} height={25} width={25} />
                            </SView>
                            <SView col={"xs-10"}>
                                <SText style={{ textAlign: "justify" }} fontSize={14}>Buen servicio</SText>
                            </SView>
                        </SView>
                        <SHr height={18} />
                    </SView>
                </SView> */}
            </Container>

            <SView col={"xs-12"} height={18} card />
            {this.recoger()}
            <PButtom onPress={() => {
                if (!this.data?.proximo_horario?.pack?.cantidad_disponibles) {
                    SPopup.alert("Agotado")
                    return;
                }
                SNavigation.navigate("/restaurante/reserva", { pk: this.pk })
            }}>RESERVAR</PButtom>
            <SHr height={20} />

            {/* <Restaurante.FotoPerfil data={this.data} width={60} height={60}
                style={{ borderRadius: 100, position: "absolute", top: -76 }} />

            <Restaurante.Favorito data={this.data} style={{
                position: "absolute",
                top: 125, right: 0
            }} /> */}
            {/* <SText>{JSON.stringify(this.data, "\n", "\t")}</SText> */}
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