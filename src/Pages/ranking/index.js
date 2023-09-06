import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SImage, SLoad, SPage, SText, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import { Container } from '../../Components';
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        SSocket.sendPromise({
            component: "publicacion",
            type: "topLikes",
            estado: "cargando",
            top: 10
        }).then(e => {
            this.setState({ data: e.data })
        }).catch(e => {
            console.error(e);
        })
    }

    render() {
        return <SPage>
            <Container>
                <Podio data={this.state?.data} />
            </Container>
        </SPage>
    }
}

const styleItem = {
    position: "absolute",
    top: 120,
    borderRadius: 100,
}
const Podio = ({ data }) => {
    if (!data) return <SLoad />
    return <SView col={"xs-12"} row center height={20}>
        <SView col={"xs-3.7"} colSquare center border={"#f0f"} style={{
            ...styleItem,
            left: 0,
        }}>
            <SImage src={SSocket.api.root + "usuario/" + data[1]?.key_usuario} />
        </SView>
        <SView col={"xs-4"} colSquare center border={"#f0f"} style={{
            borderRadius: 100,
        }}>
            <SImage src={SSocket.api.root + "usuario/" + data[0]?.key_usuario} />
        </SView>
        <SView col={"xs-3.7"} colSquare center border={"#f0f"} style={{
            ...styleItem,
            right: 0,
        }}>
            <SImage src={SSocket.api.root + "usuario/" + data[2]?.key_usuario} />
        </SView>
    </SView>
}