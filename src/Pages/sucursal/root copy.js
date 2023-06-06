import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SNavigation, SPage, SPopup, SText, STheme, SView, SIcon, SLoad, SList } from 'servisofts-component';
import { AccentBar } from '../../Components';
import Container from '../../Components/Container';
import Model from '../../Model';
import Card from './components/Card';


class root extends Component {
    constructor(props) {
        super(props);
        this.state = {
            envio: 0
        };
        this.params = SNavigation.getAllParams();
    }

    render_with_data() {
        var paquete = Model.paquete.Action.getAll();
        if (!paquete) return <SLoad />

        return <SList
            buscador={"true"}
            center
            space={15}
            initSpace={15}
            data={Object.values(paquete)}
            // order={[{ key: "fecha_on", order: "desc", peso: 1, }]}
            render={(data) => {
                return <Card datas={data} />
            }}
        />

    }

    render() {
        var defaultData = {
            ...this.params,
        };


        return (
            <SPage  >
                <Container>
                    <SView col={"xs-12"} >
                        <SText fontSize={26} color={STheme.color.white}>Comprar</SText>
                    </SView>
                    <SHr height={20} />
                    <SView col={"xs-12"} >
                        <SView
                            height={30}
                            width={100}
                            backgroundColor={STheme.color.darkGray}
                            style={{ borderRadius: 10 }}
                            center
                        >
                            <SText fontSize={15} color={STheme.color.text}>Membresía</SText>
                        </SView>
                    </SView>

                    <SHr height={20} />
                    {this.render_with_data()}
                    <SHr height={20} />
                    {/* <BtnSend onPress={() => this.form.submit()}>{"Registrar"}</BtnSend> */}
                    {/* <SHr height={30} /> */}
                </Container>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(root);