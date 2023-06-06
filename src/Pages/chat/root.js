import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SNavigation, SPage, SText, SView, STheme, SImage, SLoad, SButtom, SIcon, SWebView, STable2, SMath, SDate, SList, } from 'servisofts-component';
import { Container, PButtom, PButtom2 } from '../../Components';
import Model from '../../Model';


class index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    load_data() {
        this.data = Model.chat.Action.getAll({
            key_usuario: Model.usuario.Action.getKey()
        });
        return this.data;
    }

    _render_item(data) {
        return <SView col={"xs-12"} card style={{
            // backgroundColor: data.color + "33",
            overflow: 'hidden',
        }} onPress={() => {
            SNavigation.navigate("/chat/profile", { pk: data.key })
        }}>
            <SHr />
            <SView row col={"xs-12"} center>
                <SView width={8} />
                <SView card width={50} height={50}>

                </SView>
                <SView width={8} />
                <SView flex>
                    <SText bold>{data.descripcion}</SText>
                    <SText >{data.observacion}</SText>
                    <SHr />
                    <SText fontSize={10}>{data.fecha_on}</SText>
                </SView>
            </SView>
            <SHr />
            <SHr height={4} color={data.color} />
        </SView>
    }
    render_data() {
        if (!this.load_data()) return <SLoad />
        // console.log(this.data)
        var list = Object.values(this.data);
        if (list.length <= 0) {
            return <PButtom onPress={() => {
                Model.chat.Action.registro({
                    data: {
                        descripcion: "Chat de soporte",
                        observacion: "--",
                        color: "#ff0000"
                    },
                    app: "client",
                    key_usuario: Model.usuario.Action.getKey()
                }).then(resp => {
                    SNavigation.navigate("/chat/profile", { pk: resp.data.key })
                    console.log(resp);
                })
            }}>NUEVO CHAT</PButtom>
        }
        return <SView col={"xs-12"}>

            <SList data={this.data}
                initSpace={8}
                render={this._render_item} />
        </SView>
    }
    render() {
        return (<SPage title={'Chats'} onRefresh={()=>{
            Model.chat.Action.CLEAR();
            Model.chat_mensaje.Action.CLEAR();
        }}>
            <Container>
                <SHr/>
                {this.render_data()}
            </Container>
        </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);