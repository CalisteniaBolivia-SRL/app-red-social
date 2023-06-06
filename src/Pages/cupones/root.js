import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SText, STheme, SThread, SView } from 'servisofts-component';
import { AccentBar, Container, Cupon, PButtom } from '../../Components';
import Model from '../../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        this.setState({ loading: true })
        Model.cupon.Action.getActivos().then((resp) => {
            this.state.data = resp.data;
            this.setState({ loading: false })
        }).catch(e => {
            this.setState({ loading: false })
            console.error(e);
        })
    }

    render_no_cupones() {
        return <SView col={"xs-12"} center>
            <SHr height={50} />
            <SText bold fontSize={18}>{"¿Tienes un cupón nuevo?"}</SText>
            <SHr />
            <SText fontSize={12} color={STheme.color.lightBlack}>{"Ingresa el código aquí y úsalo cuando quieras."}</SText>
            <SHr height={32} />
            <PButtom onPress={() => {
                SNavigation.navigate("/cupones/add", { onBack: () => { 
                    this.componentDidMount();
                } })
            }}>
                <SText color={STheme.color.secondary}>{"AGREGAR CUPÓN"}</SText>
            </PButtom>
            <SHr height={12} />
            <SView style={{
                padding: 8, borderRadius: 100, backgroundColor: STheme.color.card, paddingLeft: 32, paddingRight: 32
            }} onPress={() => {
                SNavigation.navigate("/cupones/uso")
            }}>
                <SText fontSize={10}>{"¿Cómo uso un cupón?"}</SText>
            </SView>
        </SView>
    }

    getLista() {
        if (this.state.loading) return null;
        return <SList
            initSpace={8}
            data={this.state.data}
            render={(obj => {
                return <Cupon data={obj} />
            })} />

    }
    render() {
        return (
            <SPage header={<AccentBar />}>
                <SView col={"xs-12"} center>
                    <Container>
                        {this.render_no_cupones()}
                        <SHr height={64} />
                        {this.getLista()}
                        <SHr height={64} />
                    </Container>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);