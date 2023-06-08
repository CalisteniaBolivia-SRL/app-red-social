import React, { Component } from 'react';
import { SHr, SIcon, SText, STheme, SView, SList2, SLoad } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Model from '../../../Model';

export default class MiPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataPaquete: []
        };
    }

    componentDidMount() {

        Model.paquete_venta.Action.getAllByUsuario().then(resp => {
            this.setState({ dataPaquete: resp.data })
        }).catch(e => {

        })

    }

    getPaquetes() {
        let data = Object.values(this.state.dataPaquete).filter(datas => new Date().getTime() >= new Date(datas.fecha_inicio).getTime() && new Date().getTime() <= new Date(datas.fecha_fin).getTime())

        let paqueteAll;
        let paqueteData;
        if (Object.keys(data).length === 0) return <SView col="xs-12" center style={{
            borderWidth: 2,
            padding: 5,
            borderColor: STheme.color.secondary,
            borderRadius: 8
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
                if (!paqueteData) return <SLoad />
                return <SView col={"xs-12"} row>
                    <SView col={"xs-6.5"} height row
                        backgroundColor={STheme.color.secondary}
                        style={{ borderRadius: 10, padding: 8 }}
                    >
                        <SIcon name='Iplan' width={38} height={38} />
                        <SHr />
                        <SView col={"xs-12"}>
                        <SText bold fontSize={14} color={STheme.color.white}>Paquete: {paqueteData?.descripcion}</SText>
                        </SView>
                        <SHr height={5} />
                        <SText fontSize={11} color={STheme.color.white}>Duración: {paqueteData?.dias} días</SText>
                    </SView>
                    <SView width={10} />
                    <SView col={"xs-5"} height={107} row
                        backgroundColor={STheme.color.primary}
                        style={{ borderRadius: 10, padding: 8, borderColor: STheme.color.gray, borderWidth: 1 }}
                    >
                        <SIcon name='Icalendar' width={38} height={38} />
                        <SHr />
                        <SText bold fontSize={14} color={STheme.color.text}>Mensualidad</SText>
                        <SHr height={5} />
                        <SText fontSize={11} color={STheme.color.text}>{obj.fecha_inicio}  /  {obj.fecha_fin}</SText>
                    </SView>
                </SView>
            }}
        />
    }

    render() {
        return (
            <>
                <SText bold fontSize={18}>Mi Plan Actual</SText>
                <SHr />

                {this.getPaquetes()}

            </>
        );
    }
}
