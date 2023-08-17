import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SNavigation, SPage, SText, STheme, SThread, SView } from 'servisofts-component';
import { Container } from '../Components';
import LogoAnimado from '../Components/LogoAnimado';
import LogoAnimado2 from '../Components/LogoAnimado2';
import Model from '../Model';
import SSocket from 'servisofts-socket'
import { version } from "../../package.json"
const DURATION_ANIM = 2000;


const versionToNumber = (v) => {
    const array = v.split("\.");
    const vl = 100;
    let vn = 0;
    for (let i = 0; i < array.length; i++) {
        const element = array[array.length - i - 1];
        const vp = Math.pow(vl, i);
        vn += (vp * element)
    }
    console.log(vn)
    return vn;
}

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.run = true;
        new SThread(DURATION_ANIM, "carga_hilo", false).start(() => {
            // Model.usuario.Action.getAll({})
            // new SThread(DURATION_ANIM / 2, "carga_after_user", false).start(() => {
            if (!this.run) return;
            SNavigation.replace("/root")
            // })
        })

        SSocket.sendPromise({
            component: "enviroments",
            type: "getVersion",
        }).then(e => {
            const versionRequired = e.data
            if (versionToNumber(versionRequired) > versionToNumber(version)) {
                SNavigation.replace("/version_required")
            }
        }).catch(e => {
            console.error(e)
        })
        // Model.restaurante.Action.getAll();
        // Model.horario.Action.getAll();
        // Model.pack.Action.getAll();
    }
    componentWillUnmount() {
        this.run = false;
    }

    renderFooter() {
        if (!this.state.layout) return null;
        var h = this.state.layout.width / 4.46
        return <SView col={"xs-12"} height={h} style={{
            position: "absolute",
            bottom: 0,
        }}>
            <SIcon name={"adornocarga"} />
        </SView>
    }
    render() {
        return (
            <SPage hidden disableScroll center>
                {/* <SView col={"xs-12"} flex backgroundColor={STheme.color.primary} center onLayout={(evt) => {
                    this.setState({ layout: evt.nativeEvent.layout })
                }}> */}

                <Container>
                    <SView col={"xs-12"} colSquare center>
                        <LogoAnimado duration={DURATION_ANIM * 0.66} />
                    </SView>
                </Container>
                {/* <SText>Cargando</SText> */}
                {/* <SHr height={100} /> */}
                {/* {this.renderFooter()} */}
                {/* </SView> */}
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);

// export default index;