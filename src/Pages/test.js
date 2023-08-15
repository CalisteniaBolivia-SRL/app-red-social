import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SNavigation, SPage, SPopup, SText, SLoad, SInput, SView, STheme, SIcon, SButtom, SDate, SImage } from 'servisofts-component';
import Container from '../Components/Container';
import LikeAnimation from '../Components/Publicacion/LikeAnimation';
import Model from '../Model';
import { Image } from 'react-native';

class formulario extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.params = SNavigation.getAllParams();

    }

    render() {

        // let usuarios = Model.usuario.Action.getAll();
        // let ricky = Model.usuario.Action.getByKey("c4310023-4413-42dd-9676-e9ed1bd862dc");
        // let ruddy = Model.usuario.Action.getByKey("a34002d9-c8bc-4e58-b98c-ace4aa15f915");
        return <SPage title={"test"} onRefresh={() => {
        }}>
            <SText fontSize={20}>Esta pagina solo puedo llegar con un deep link</SText>
            <SText>{JSON.stringify(this.params)}</SText>
            {/* <Image source={require("./cool-wallpapers-icegif-1.gif")}/> */}
            {/* <SImage src={} /> */}
            {/* <SText>{Object.keys(usuarios ?? {}).length}</SText> */}
            {/* <SText>{JSON.stringify(ricky ?? {}, "\n", "\t")}</SText> */}
            {/* <SText>{JSON.stringify(ruddy ?? {}, "\n", "\t")}</SText> */}
        </SPage>
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(formulario);