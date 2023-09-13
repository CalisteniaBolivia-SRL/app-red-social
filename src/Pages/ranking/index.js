import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SIcon, SImage, SInput, SList, SLoad, SNavigation, SPage, SText, SView, STheme, SHr } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import { Container } from '../../Components';
import PodioItem from './PodioItem';
import ListCard from './ListCard';
import RankingFiltro from './RankingFiltro';
export default class index extends Component {
    constructor(props) {
        super(props);
        const mes = new SDate().setDay(1);
        this.state = {
            curDate: mes.toString("yyyy-MM-dd"),
            endDate: mes.addMonth(1).addDay(-1).toString("yyyy-MM-dd"),
        };
    }

    componentDidMount() {
        SSocket.sendPromise({
            component: "publicacion",
            type: "topLikes",
            estado: "cargando",
            fecha_inicio: this.state.curDate,
            fecha_fin: this.state.endDate,
            top: 10
        }).then(e => {

            const arr = e.data;
            this.state.data = arr;

            let userKeys = arr.map(val => val?.key_usuario);
            if (!userKeys) return;
            const uniqueArr = [...new Set(userKeys)];

            SSocket.sendPromise({
                service: "usuario",
                version: "2.0",
                component: "usuario",
                type: "getAllKeys",
                estado: "cargando",
                keys: uniqueArr
            }).then((e2) => {

                arr.map(a => a.usuario = e2?.data[a.key_usuario]?.usuario)
                this.setState({ ...this.state })
                // this.state.data
                // this.setState({ usuarios: e2.data })
            }).catch((e) => {
                console.error(e)
            })
            // this.setState({ data: e.data })
        }).catch(e => {
            console.error(e);
        })
    }

    render() {
        const data = (this.state?.data ?? [])
        return <SPage
        ><Container>
                <RankingFiltro url={"/ranking"} />
                <SHr height={10} />
                <SView col={"xs-12"} style={{ alignItems: "flex-end" }} >
                    <SView width={140} row>
                        <SInput type='date_my' defaultValue={this.state.curDate} height={35} width={140}
                            style={{
                                padding: 0
                            }} onChangeText={(e) => {
                                console.log(e);
                                const mes = new SDate(e, "yyyy-MM").setDay(1);
                                this.state.curDate = mes.toString("yyyy-MM-dd");
                                this.state.endDate = mes.addMonth(1).addDay(-1).toString("yyyy-MM-dd");
                                this.componentDidMount();
                            }} />
                        <SIcon style={{ position: "absolute", top: 10, right: 15 }} name='IconFiltro' width={17} height={17} fill={STheme.color.text} />
                    </SView>
                </SView>
                <SView col={"xs-12"} center>
                    <SHr height={10} />
                    <SText font="Oswald-Regular" fontSize={25}>TOP LIKES</SText>
                    <SHr height={20} />

                </SView>
                <PodioItem data={this.state?.data} />
                <SList space={15} scrollEnabled data={data.splice(3, data.length)} render={(o, key, index) => <ListCard index={index + 3} data={o} />} />
                <SHr height={30} />
            </Container>
        </SPage>
    }
}

