import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SNavigation, SPage, SPopup, SText, SLoad, SInput, SView, STheme, SIcon } from 'servisofts-component';
import Container from '../Components/Container';
import LikeAnimation from '../Components/Publicacion/LikeAnimation';

class formulario extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return <SPage title={"test"}>
            <LikeAnimation />
        </SPage>
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(formulario);