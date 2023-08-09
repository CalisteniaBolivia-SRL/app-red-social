import React, { Component } from 'react';
import { SHr, SIcon, SText, STheme, SView, SList2, SLoad, SDate, SNavigation, SImage } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Model from '../../../Model';

export default class MiPaqueteActivo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataPaquete: []
        };
    }

    componentDidMount() {

        Model.paquete_venta.Action.getAllByUsuario().then(resp => {
            this.setState({ dataPaquete: resp.data })
            if (this.props.onLoad) {
                this.props.onLoad(resp.data);
            }
        }).catch(e => {

        })

    }

    getPaquetes() {
        let data = Object.values(this.state.dataPaquete).filter(datas => (new SDate().equalDay(new SDate(datas.fecha_fin, "yyyy-MM-dd")) || (new Date().getTime() >= new Date(datas.fecha_inicio).getTime() && new Date().getTime() <= new Date(datas.fecha_fin).getTime())))

        let paqueteAll;
        let paqueteData;
        let sucursalData;
        if (Object.keys(data).length === 0) return <SView col="xs-12" center style={{
            borderWidth: 2,
            padding: 5,
            borderColor: STheme.color.secondary,
            borderRadius: 8
        }} onPress={() => {
            SNavigation.navigate("/perfil/paquetes", { key: Model.usuario.Action.getKey() });
        }}>
            <SHr height={5} />
            <SText bold>NO TIENES PAQUETE ACTIVO</SText>
            <SHr height={5} />
        </SView>;



        return <SList2
            data={data}
            order={[{ key: "fecha_inicio", order: "desc", peso: 1 }]}
            space={5}
            render={(obj) => {
                paqueteData = Model.paquete.Action.getByKey(obj.key_paquete);
                sucursalData = Model.sucursal.Action.getByKey(obj.key_sucursal);
                if (!paqueteData) return <SLoad />
                if (!sucursalData) return <SLoad />
                return <SView col={"xs-12"} row>
                    <SView col={"xs-12"} height row center
                        backgroundColor={STheme.color.card}
                        style={{ borderRadius: 10, overflow: "hidden" }}
                        onPress={() => {
                            SNavigation.navigate("/perfil/paquetes", { key: Model.usuario.Action.getKey() });
                        }}
                    >
                        <SImage src={require('../../../Assets/img/fpublicidad.png')} style={{ resizeMode: 'cover', position: 'absolute' }} />
                        <SView col={"xs-11"} center row>
                            <SHr height={10} />

                            <SView col={"xs-3.5"} style={{ alignItems: "flex-end" }}>
                                <SView style={{
                                    backgroundColor: STheme.color.card, borderRadius: 8, width: 60, height: 60, overflow: "hidden"
                                }}>
                                    <SImage src={SSocket.api.root + "sucursal/portada/" + obj.key_sucursal} style={{
                                        resizeMode: "cover"
                                    }} />
                                </SView>
                            </SView>
                            <SView col={"xs-0.5"}></SView>
                            <SView col={"xs-8"}>
                                <SText fontSize={15} font="Oswald-Bold" color={STheme.color.white} style={{ textTransform: "uppercase" }}>Paquete: {paqueteData?.descripcion}</SText>
                                <SText bold fontSize={14} color={STheme.color.gray} style={{ textTransform: "uppercase" }}>{sucursalData?.descripcion}</SText>
                                <SView col={"xs-12"} row>

                                    <SText fontSize={11} color={STheme.color.white}>Duración: {paqueteData?.dias} días</SText>
                                    <SView width={20} />
                                    <SText fontSize={11} color={STheme.color.white}>Vence: {obj.fecha_fin}</SText>
                                </SView>

                            </SView>

                            <SHr height={10} />
                        </SView>
                    </SView>
                </SView>
            }}
        />
    }

    render() {
        return (
            <>
                {this.getPaquetes()}
            </>
        );
    }
}
