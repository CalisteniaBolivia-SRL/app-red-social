import React, { Component } from 'react'
import { SIcon, SNavigation, SText, SView } from 'servisofts-component'
import SSocket from 'servisofts-socket';


export default class RankingFiltro extends Component {

    state = {
        data: {}
    }
    key_profile = "985ee69e-b517-4ed6-9807-705465c6eb66"

    componentDidMount() {
        SSocket.sendPromise({
            service: "usuario",
            version: "2.0",
            component: "usuario",
            type: "getAllKeys",
            estado: "cargando",
            keys: [this.key_profile]
        }).then((e2) => {
            // arr.map(a => a.usuario = e2?.data[a.key_usuario]?.usuario)
            this.setState({ data: e2?.data[this.key_profile]?.usuario })
            // this.state.data
            // this.setState({ usuarios: e2.data })
        }).catch((e) => {
            console.error(e)
        })
    }
    render() {
        return <SView col={"xs-12"} row card center height={45} onPress={() => {
            SNavigation.navigate("/perfil/client", { pk: this.key_profile })
        }}>
            <SView col={"xs-2"} row>
                <SView width={15} />
                <SIcon name='LogoSolo' width={13} height={29} />
            </SView>
            <SView col={"xs-9"} height style={{
                justifyContent:"center"
            }}>
                <SText>{this.state?.data?.Nombres} {this.state?.data?.Apellidos}</SText>
            </SView>
        </SView>
    }
}