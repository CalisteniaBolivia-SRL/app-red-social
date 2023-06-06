import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SList, SLoad, SMath, SNavigation, SPage, SText, STheme, SThread, SView } from 'servisofts-component';
import { AccentBar, Container, PButtom, Cupon } from '../../Components';
import Model from '../../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.onSelect = SNavigation.getParam("onSelect");
    }
    componentDidMount() {
        this.setState({ loading: true })
        Model.cupon.Action.getActivos().then((resp) => {
            this.state.data = resp.data
            this.setState({ loading: false })
        }).catch(e => {
            this.setState({ loading: false })
            console.error(e);
        })
    }


    Item(obj) {
        return <Cupon data={obj} onPress={() => {
            if (this.onSelect) {
                this.onSelect(obj);
            }
        }} />
        
    }
    render_no_cupones() {
        if (this.state.loading) return <SLoad />
        return <SList
            initSpace={8}
            data={this.state.data}
            render={(obj => {
                return this.Item(obj)
            })} />
    }
    render() {
        return (
            <SPage header={<AccentBar />}>
                <SView col={"xs-12"} center>
                    <Container>
                        {this.render_no_cupones()}
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