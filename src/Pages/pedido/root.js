import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SLoad, SMarker, SNavigation, SPage, SText, STheme, SThread, SView } from 'servisofts-component';
import { AccentBar, BotonRecargar, Container, FloatButtomTap, PButtom, Restaurante } from '../../Components';
import Model from '../../Model';
import _states from './_states';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.pk = SNavigation.getParam("pk");
        this.isRun = false;
    }
    componentDidMount() {
        // Model.pedido.Action.getDetalle(this.pk).then((resp) => {
        //     console.log(resp);
        // })
        this.isRun = true;
        this.hilo();
    }
    componentWillUnmount() {
        this.isRun = false;
    }
    hilo() {
        if (!this.isRun) return;
        this.state.data = Model.pedido.Action.getDetalle(this.pk);
        this.setState({ ...this.state })
        new SThread(10000, "hilo_pedido", true).start(() => {
            this.hilo();
            if (!this.isRun) return;
            Model.pedido.Action.getDetalle(this.pk, true);
            // console.log("Entro al hilo del pedido = ", this.pk)

        })
    }

    load_data() {
        var data = Model.pedido.Action.getDetalle(this.pk);
        if (!this.state.data) {
            if (!data) return null;
            this.state.data = data;
        } else {
            if (data) {
                if (this.state.data != data.state) {
                    this.state.data = data;
                }
            }
        }
        return this.state.data;
    }


    render_data() {
        this.data = this.load_data();
        if (!this.load_data()) return <SLoad />

        var ITEM = _states[this.data.state];
        if (!ITEM) {
            ITEM = (props) => <SText>{"State not found " + this.data.state}</SText>
        }
        return <SView col={"xs-12"} center flex>
            <ITEM data={this.data} />
            {/* <SText>{JSON.stringify(this.data, "\n", "\t")}</SText> */}

            <BotonRecargar onPress={() => { this.data = Model.pedido.Action.getDetalle(this.pk, true); }} />

        </SView>
    }
    render() {
        return (<SPage
        // header={<AccentBar />}
        >
            {this.render_data()}
        </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);