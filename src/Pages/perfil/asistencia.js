import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SNavigation, SPage, SText, SView, STheme, SImage, SInput, SLoad, SButtom, SIcon, SWebView, STable2, SMath, SDate, SList, SList2, SScrollView2 } from 'servisofts-component';
import { WebView } from 'react-native';
import SSocket from 'servisofts-socket';
import Model from '../../Model';
import { AccentBar, BottomNavigator, Container, PButtom, Publicacion } from '../../Components';
import usuario_dato from '../../Model/tapeke/usuario_dato';


class asistencia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nroPublicaciones: 0,
            curDay: new SDate()
        };
    }

    componentDidMount() {
        // console.log(this.state.curDay.getDay() * 73 )
        this?.scroll?.scrollTo({ x: (this.state?.curDay?.getDay() - 1) * 88 })
    }

    renderDataHeaderItem({ val, label }) {
        return <SView center col={"xs-4"}>
            <SText bold fontSize={16}>{val}</SText>
            <SText>{label}</SText>
        </SView>
    }
    renderDataHeader = () => {
        return <SView col={"xs-12"} row>
            {this.renderDataHeaderItem({ val: this.state.nroPublicaciones, label: "Publicaci..." })}
            {this.renderDataHeaderItem({ val: 0, label: "Seguidores" })}
            {this.renderDataHeaderItem({ val: 0, label: "Seguidos" })}
        </SView>
    }

    renderDias(data, i) {
        let day = parseFloat(i) + 1
        let fecha = new SDate().setDay(day)
        let isSelect = fecha.equalDay(this.state.curDay)
        let color = isSelect ? STheme.color.white : STheme.color.text
        return <SView width={80} height={90} card style={{
            margin: 4,
            backgroundColor: isSelect ? STheme.color.secondary : STheme.color.card
        }} center onPress={() => {
            this.setState({ curDay: fecha })
        }}>
            <SText font={"Roboto"} fontSize={14} color={color}>{fecha.getDayOfWeekJson().textSmall}</SText>
            <SHr />
            <SText font={"LondonTwo"} fontSize={24} color={color}>{day}</SText>
        </SView>
    }

    getPerfil() {
        var usuario = Model.usuario.Action.getUsuarioLog();
        if (!usuario) return <SLoad />
        return (<SView col={"xs-12"}>
            <SView col={"xs-12"} row center>
                <SView style={{
                    width: 80,
                    height: 80,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <SView style={{
                        width: "100%", height: "100%", backgroundColor: STheme.color.card, borderRadius: 100, overflow: "hidden",
                    }} border={STheme.color.card}>

                        {/* <SImage src={SSocket.api.root + "usuario/" + usuario?.key + "?date=" + new Date().getTime()} style={{ resizeMode: 'cover'}} /> */}
                        <SInput ref={r => this.r_image = r} type={"image"} style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "none"
                        }}
                            defaultValue={SSocket.api.root + "usuario/" + usuario?.key + "?date=" + new Date().getTime()}
                        />
                    </SView>
                </SView>
                <SView width={8} />
                <SView flex center >
                    {this.renderDataHeader()}
                </SView>

            </SView>
            <SHr h={4} />
            <SView col={"xs-12"}>
                <SText bold fontSize={16}>{usuario["Nombres"] + " " + usuario["Apellidos"]}</SText>
                <SText fontSize={14}>{usuario["CI"]}</SText>
            </SView>
        </SView>
        )
    }
    renderMenu() {
        var usuario = Model.usuario.Action.getUsuarioLog();
        if (!usuario) return <SLoad />
        return <SView col={"xs-12"} row>
            <SView card padding={8} row width={130} center onPress={() => {
                SNavigation.navigate("/perfil/editar", { key: usuario.key });
            }}>
                <SText bold>Editar perfil</SText>
            </SView>
            <SView flex />
            <SView card padding={8} row width={130} center onPress={() => {
                SNavigation.navigate("/perfil/editar", { key: usuario.key });
            }}>
                <SText bold>Asistencia</SText>
            </SView>
            <SView flex />
            <SView card padding={8} row width={130} center onPress={() => {
                Model.usuario.Action.unlogin();
                // SNavigation.navigate("/perfil/editar", { key: this.data.key });
            }}>
                <SText bold>Cerrar sesión</SText>
            </SView>
        </SView>
    }
    renderPublicaciones() {
        let publicaciones = Model.publicacion.Action.getAll();
        let usuario = Model.usuario.Action.getUsuarioLog();
        if (!publicaciones) return <SLoad />
        if (!usuario) return <SLoad />
        let publicacionesMias = Object.values(publicaciones).filter(obj => obj.key_usuario == usuario.key);
        this.state.nroPublicaciones = Object.keys(publicacionesMias).length;

        console.log(publicacionesMias)
        //console.log(Object.keys(publicacionesMias).length)

        return <SList
            data={publicacionesMias}
            order={[{ key: "fecha_on", order: "desc" }]}
            space={0}
            render={(a) => {
                // let user = Model.usuario.Action.getByKey(a.key_usuario);
                // if (!user) return <SLoad/>
                // console.log(user);
                return <Publicacion.CardPerfil data={a} col={"xs-4"} row center />
            }}
        />
    }
    getCalendario() {
        return <>
            <SView col={"xs-12"} row
                center
                backgroundColor={STheme.color.secondary}
                style={{
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                }}
            >
                <SView col={"xs-2"}  onPress={() => {
                    this.setState({ curDay: this.state.curDay.addMonth(-1) })
                }}>
                    <SIcon name='Iprevious' height={20} fill={STheme.color.secondary} />
                </SView>
                <SView col={"xs-8"} center height={55}>
                    <SHr />
                    <SText fontSize={18} bold style={{ color: STheme.color.white }}>{this.state.curDay.toString("MONTH, yyyy")}</SText>
                    <SHr />
                </SView>
                <SView col={"xs-2"} onPress={() => {
                    this.setState({ curDay: this.state.curDay.addMonth(1) })
                }}>
                    <SIcon name='Inext' height={20} fill={STheme.color.secondary} />
                </SView>
            </SView>
            <SHr height={3} />
            <SView col={"xs-12"} height={110}>
                <SScrollView2 ref={ref => this.scroll = ref} contentContainerStyle={{
                    width: null
                }}>
                    <SList
                        horizontal
                        // center
                        space={0}
                        data={new Array(SDate.getDaysInMonth(this.state.curDay.getYear(), this.state.curDay.getMonth())).fill(0)}
                        render={this.renderDias.bind(this)}
                    />
                </SScrollView2>
            </SView>
        </>
    }
    getBody() {
        var usuario = Model.usuario.Action.getUsuarioLog();
        if (!usuario) return <SLoad />
        //asistencia
        //getByKeyUsuario
        return <SView col={"xs-12"} row>
            <SText bold fontSize={22}>
                Hola, {usuario.Nombres}
            </SText>
            <SHr height={15} />
            <SText bold fontSize={18}>Mi Plan </SText>
            <SHr />
            <SView col={"xs-6.5"} height={107} row
                backgroundColor={STheme.color.secondary}
                style={{ borderRadius: 10, padding: 8 }}
            >
                <SIcon name='Iplan' width={38} height={38} />
                <SHr />
                <SText bold fontSize={18} color={STheme.color.white}>Calistenia</SText>
                <SHr height={5} />
                <SText fontSize={11} color={STheme.color.white}>1 hora</SText>
            </SView>
            <SView width={10} />
            <SView col={"xs-5"} height={107} row
                backgroundColor={STheme.color.primary}
                style={{ borderRadius: 10, padding: 8, borderColor: STheme.color.gray, borderWidth: 1 }}
            >
                <SIcon name='Icalendar' width={38} height={38} />
                <SHr />
                <SText bold fontSize={18} color={STheme.color.text}>Mensualidad</SText>
                <SHr height={5} />
                <SText fontSize={11} color={STheme.color.text}>18/05/23  -  17-04-23</SText>
            </SView>
            <SHr height={15} />
            {this.getCalendario()}
        </SView>
    }
    render() {
        return (<SPage onRefresh={() => {
            // Model.usuario.Action.CLEAR();

        }}
            title="Asistencia"
            footer={this.footer()}
        >
            <Container>
                {this.getBody()}

            </Container>

        </SPage>
        );
    }

    footer() {
        return <BottomNavigator url={"/perfil"} />
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(asistencia);