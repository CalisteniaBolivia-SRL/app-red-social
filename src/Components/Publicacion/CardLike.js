import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SIcon, SImage, SPage, SText, STheme, SView, SNavigation, SPopup, SLoad, SThread } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import BoxMenuLat from './BoxMenuLat';
import BoxMenuLatOtros from './BoxMenuLatOtros';
import Model from '../../Model';
import LikeAnimation from './LikeAnimation';
export type PublicacionLikePropsType = {
    data: any,
    usuario: any,
    onPress?: (obj) => {},
}
class CardLike extends Component<PublicacionLikePropsType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handlePress() {
        if (!this.props.onPress) return null;
        this.props.onPress(this.props.data)
    }

    componentDidMount() {
        console.log(this.props.data.key_usuario + " pppp")
        // this.setState({ loading: true })

        var dataUser = Model.usuario.Action.getByKey(this.props.data.key_usuario)
        if (!dataUser) return
        console.log(dataUser.Nombres + " -uuuu")
        this.setState({ datas: dataUser })
        // this.state.datas = dataUser

        // Model.usuario.Action.getByKey(this.props.data.key_usuario).then((resp) => {
        //     this.setState({ datas: resp })
        //     this.setState({ loading: false })
        // }).catch(e => {
        //     this.setState({ loading: false })
        //     console.error(e);
        // })

        // Model.usuario.Action.getByKey().then(resp => {
        //     this.setState({ dataPaquete: resp.data })
        //     console.log(this.state.dataPaquete)
        // }).catch(e => {

        // })
    }


    render() {
        if (!this.state.datas) return <SLoad />
        return (<SView
            col={"xs-12"}
            style={{
                borderRadius: 10,
                padding: 8,
                borderColor: STheme.color.darkGray,
                borderWidth: 1
            }}
            row center
        >
            <SView col={"xs-4"} row >
                {/* USUARIO */}
                <SView card style={{
                    width: 75,
                    height: 75,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 60,
                    overflow: "hidden"
                }}>
                    <SImage enablePreview src={SSocket.api.root + "usuario/" + this.state?.datas?.key + "?date=" + new Date().getTime()} width={"100%"} height={"100%"}
                        style={{
                            resizeMode: 'cover',
                        }}
                    />
                </SView>
            </SView>
            <SView col={"xs-8"} >
                <SView   col={"xs-12"}>
                    <SView flex col={"xs-12"}>
                        <SText color={STheme.color.text} fontSize={16} bold>
                            {this.state?.datas?.Nombres} {this.state?.datas?.Apellidos}
                        </SText>
                    </SView>
                    <SHr height={2} />
                    <SText color={STheme.color.gray} fontSize={12}>
                        Calistenia Bolivia Cristo
                    </SText>
                    <SHr height={2} />
                </SView>
            </SView>
        </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(CardLike);