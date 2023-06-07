import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SNavigation, SPage, SText, SView, STheme, SImage, SInput, SLoad, SButtom, SIcon, SWebView, STable2, SMath, SDate, SList, SList2, SScrollView2 } from 'servisofts-component';
import { WebView } from 'react-native';
import SSocket from 'servisofts-socket';
import Model from '../../Model';
import { AccentBar, BottomNavigator, Container, PButtom, Publicacion } from '../../Components';
import usuario_dato from '../../Model/tapeke/usuario_dato';
import Dia from './components/Dia';

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
        //this?.scroll?.scrollTo({ x: (this.state?.curDay?.getDay() - 1) * 88 })

        Model.asistencia.Action.getByKeyUsuario().then(resp => {
            this.setState({ data: resp.data })
        }).catch(e => {

        })
    }

    renderDias(data, i) {
        // let isSelect = fecha.equalDay(this.state.curDay)
        let hoy = new SDate(this.state.curDay).getDayOfWeek()
        let isSelect = false
        let color = isSelect ? STheme.color.white : STheme.color.text
        console.log(data.asistiendo)
        return <>
            <SView col={"xs-1.7"} height={90} style={{
                borderWidth: 1, borderColor: STheme.color.gray,
                // backgroundColor:  data.asistiendo ? "#D93444": STheme.color.card
                backgroundColor: STheme.color.card
            }} center onPress={() => {
                //this.setState({ curDay: fecha })
            }}>
                {/* <SText font={"Roboto"} fontSize={14} color={color}>{data.fecha}</SText> */}
                <SText font={"Roboto"} fontSize={14} color={color}>{data.diaMes || ""}</SText>
                {data?.dataAsis ?
                    <>
                        <SHr height={3}/>
                        <SView style={{
                            borderWidth: 1,
                            borderRadius: 5,
                            borderColor: "#D93444",
                            padding: 3
                        }}>
                            <SText font={"Roboto"} fontSize={11} color={color}>{data.dataAsis.horario || ""}</SText>
                        </SView>
                        <SHr height={3}/>
                        <SView width={25} height={25} card style={{ borderRadius: 45, overflow: 'hidden' }}>
                            <SImage src={SSocket.api.root + "paquete/" + data.dataAsis.key_paquete} />
                        </SView>
                    </>
                    : null}

                <SHr />
            </SView>
        </>
    }

    getCabecera() {
        return <>
            <SView col={"xs-12"} row >
                <Dia dia="DOM" />
                <Dia dia="LUN" />
                <Dia dia="MAR" />
                <Dia dia="MIE" />
                <Dia dia="JUE" />
                <Dia dia="VIE" />
                <Dia dia="SAB" />
            </SView>
        </>
    }

    getCalendario(mes, ano) {
        let primerDiaSemana = new Date(ano, mes, 1).getDay();
        let fechaFin = new Date(ano, mes + 1, 1);
        fechaFin = fechaFin.setDate(fechaFin.getDate() - 1);
        let ultimoDiaSemana = new Date(fechaFin).getDay();
        let ultimoDiaMes = new Date(fechaFin).getDate()
        var dataAsistencia = this.state.data;
        if (!dataAsistencia) return null;
        let calendario = [];
        var index = 0;
        var diaMes = 0;
        var asisti = false;
        var data;
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                index++;
                if (i == 0 && j < primerDiaSemana) {
                    //primer semana del mes
                    calendario.push({ index, dia_semana: j, semana: i, fecha: null })
                } else {
                    if (diaMes < ultimoDiaMes) {
                        diaMes++;
                        //Aqui verificamos si asistio o no a entrenar

                        let fechaActual = new Date(ano, mes, diaMes)
                        let asistido;
                        // let asistio = Object.values(dataAsistencia).find(obj2 => obj2.fecha_on == fechaActual);
                        Object.values(dataAsistencia).map((obj) => {
                            // dato = Object.values(sucursal_paquetes).find(obj2 => obj2.key_paquete == obj.key);
                            // if (!dato) return null
                            // dataMostrar.push(obj)
                            let formatFecha = new Date(obj.fecha_on)

                            // asistido = Object.values(obj).filter((a) => new SDate(a.fecha_on).toString("yyyy-MM-dd") == new SDate(fechaActual).toString("yyyy-MM-dd"))
                            if (new SDate(obj.fecha_on).toString("yyyy-MM-dd") == new SDate(fechaActual).toString("yyyy-MM-dd")) {
                                console.log("yes")
                                asisti = true
                                data = obj;

                            }
                        })
                        calendario.push({ diaMes, index, dia_semana: j, semana: i, fecha: "", asistiendo: asisti, dataAsis: data })
                        asisti = false
                        data = null;
                    } else {
                        asisti = false
                        data = null;
                        calendario.push({ index, dia_semana: j, semana: i, fecha: null })
                    }
                    // index++;
                }
            }
        }

        return <>
            <SView col={"xs-12"} row
                center
                backgroundColor={STheme.color.secondary}
                style={{
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                }}
            >
                <SView col={"xs-2"} onPress={() => {
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
            {this.getCabecera()}
            <SView col={"xs-12"} row center>
                <SList2
                    horizontal
                    space={0}
                    // data={new Array(SDate.getDaysInMonth(this.state.curDay.getYear(), this.state.curDay.getMonth())).fill(0)}
                    data={calendario}
                    render={this.renderDias.bind(this)}
                />
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
            {this.getCalendario(this.state.curDay.getMonth() - 1, this.state.curDay.getYear())}
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