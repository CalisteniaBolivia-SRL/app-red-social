import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SNavigation, SPage, SPopup, SText, SLoad, SInput, SView, STheme, SIcon, SButtom, SDate, SImage } from 'servisofts-component';

import SVideo from '../Components/SVideo';

class formulario extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.params = SNavigation.getAllParams();

    }

    render() {
        return <SPage >
            <SVideo
                // poster={"http://192.168.2.1:30018/paquete/7a2274ad-3fec-4d54-a956-d8c2142aa311?time=1693970176258"}
                source={{ uri: `https://repo.servisofts.com/class/kubernetes/001.-%20Todo%20lo%20que%20aprenderás%20sobre%20Kubernetes%20-%20Platzi1.mp4` }}
                resizeMode={"contain"}
                style={{
                    width: 300,
                    height: 500
                }} />

        </SPage >
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(formulario);