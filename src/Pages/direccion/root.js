import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import { AccentBar, Container, FloatButtomTap } from '../../Components';
import Model from '../../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        if (!Model.usuario.Action.getKey()) {
            SNavigation.replace("/direccion/mapa", {
                hiddeDescripcion: true,
                callback: (data) => {
                    Model.filtros.Action.select('direccion', data)
                    SNavigation.replace("/root");
                    // console.log(data)
                }
            })
        }
    }
    load_data() {
        this.data = Model.direccion_usuario.Action.getAll();
        return this.data;
    }

    render_list() {
        if (!this.load_data()) return <SLoad />
        // if(Object.values())
        return <SList
            buscador
            data={this.data}
            space={16}
            render={(obj) => {
                const { descripcion, direccion, latitude, longitude, key } = obj;
                const space = 8;
                return <SView col={"xs-12"} onPress={() => {
                    Model.filtros.Action.select('direccion', obj)
                    SNavigation.goBack();
                }}>
                    <SView col={"xs-12"} row>
                        <SView center height>
                            <SView style={{ width: 40, height: 40, borderRadius: 100, backgroundColor: STheme.color.primary, padding: 8 }}>
                                <SIcon name={"Location"} fill={STheme.color.white} />
                            </SView>
                            <SHr height={space} />
                        </SView>
                        <SView width={8} />
                        <SView flex>
                            <SText fontSize={16} color={STheme.color.primary}>{descripcion}</SText>
                            <SHr height={space / 2} />
                            <SText fontSize={12} color={STheme.color.gray}>{direccion}</SText>
                            <SHr height={space} />
                            <SHr height={1} color={STheme.color.gray} />
                        </SView>
                        <SView center height onPress={() => {
                            Model.direccion_usuario.Action.editar({
                                data: {
                                    ...obj,
                                    estado: 0
                                },
                            }
                            );
                            // SNavigation.reset();
                            Model.direccion_usuario.Action.CLEAR() //Limpiar caché
                        }}>
                            <SView style={{ width: 40, height: 40, borderRadius: 100, padding: 8 }}>
                                <SIcon name={"DeleteDir"} />
                            </SView>
                            <SHr height={space} />
                        </SView>
                    </SView>

                </SView>
            }}
        />
    }
    render() {
        return (
            <>
                <SPage title={"Mis direcciones"} header={<AccentBar />}>
                    <Container>
                        <SHr />
                        {this.render_list()}
                    </Container>
                </SPage>
                <FloatButtomTap onPress={() => {
                    SNavigation.navigate("/direccion/mapa");
                    // this.props.state.direccion_usuarioReducer.estado = 0;
                }} />
            </>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);