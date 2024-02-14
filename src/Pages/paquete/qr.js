import { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SPopup, SText, STheme, SThread, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import { version } from '../../../package.json';
import { BottomNavigator } from '../../Components';
import BarraCargando from '../../Components/BarraCargando';
import Container from '../../Components/Container';
import SShared from '../../Components/SShared';
import Model from '../../Model';
import Card from './components/Card';
const debugData = {
  dataUser: {
    key: "c4310023-4413-42dd-9676-e9ed1bd862dc"
  },
  pk: "7b924269-dad6-47a8-bc5d-b3d48cd3ef98",
  sucursal: "08a66311-af52-4461-8ca8-2c1e445b60aa",
}
class qr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      envio: 0
    };
    this.params = SNavigation.getAllParams();
    // this.params = debugData;
  }


  componentDidMount() {

    this.setState({ loading: true })
    let key_usuario = "";
    if (this.params.dataUser) {
      key_usuario = this.params.dataUser.key
    } else {
      key_usuario = Model.usuario.Action.getKey()
    }
    SSocket.sendPromise({
      component: "paqueteVentaUsuario",
      type: "getQr",
      estado: "cargando",
      version: version,
      key_usuario: key_usuario,
      key_paquete: this.params.pk,
      key_sucursal: this.params.sucursal,
      nit: this.params.dataUser.Nit,
      razon_social: this.params.dataUser.RazonSocial,
      correos: [this.params.dataUser.Correo],

    }, 2 * 60 * 1000).then(e => {
      this.setState({ loading: false, dataqr: e.data })
      this.isRun = true;
      this.hilo()
      console.log(e);
    }).catch(e => {
      this.setState({ loading: false, error: e?.error })
      SPopup.alert(e?.error)
      SNavigation.goBack();
      console.error(e)
    })
  }

  componentWillUnmount() {
    this.isRun = false;
  }

  hilo = () => {
    if (!this.isRun) return;
    new SThread(5000, "verificar_pago", true).start(() => {
      if (!this.isRun) return;
      this.verificarPago();
      this.hilo();
    })
  }

  verificarPago() {
    let key_usuario = "";
    if (this.params.dataUser) {
      key_usuario = this.params.dataUser.key
    } else {
      key_usuario = Model.usuario.Action.getKey()
    }
    SSocket.sendPromise({
      component: "paqueteVentaUsuario",
      type: "verificarPago",
      estado: "cargando",
      qrid: this.state.dataqr.qrid,
      key_usuario: key_usuario,
      key_paquete: this.params.pk,
      key_sucursal: this.params.sucursal,
    }).then(e => {
      if (e.data.fecha_pago) {
        SNavigation.replace("/paquete/compra_exitosa")
      }
    }).catch(e => {
      console.error(e)
    })
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
        return <Card datas={data} pkSucursal={this.params.pk} />
      }}
    />

  }

  getQr() {
    var po = this.state?.dataqr
    if (!po) return null;

    return "data:image/jpeg;base64," + po?.qrImage;
  }

  getQRComponent() {
    if (!this.state?.dataqr) {
      return <SView col={"xs-12"} height center >
        <SText color={STheme.color.gray} col={"xs-10"} center bold>{"Solicitando el código QR al banco.\nEs posible que tome un poco de tiempo."}</SText>
        <SHr h={16} />
        <BarraCargando col={"xs-11"} />
      </SView>
    }
    return <SImage src={this.getQr()} width={"100%"} height={"100%"}
      enablePreview
      style={{
        // resizeMode: "contain"
        // resizeMode: "cover"
      }} />
  }
  render() {
    var defaultData = {
      ...this.params,
    };

    // return <SPage
    //     footer={this.footer()}
    //     title={"Pago QR"}
    //     center
    // >
    //     <Container>
    //         <SText fontSize={24} bold>PROXIMAMENTE!!!</SText>
    //         <SHr />
    //         <SHr />
    //         <SText fontSize={14} center>Proximamente podras adquirir tu subscripcion por medio de un QRSimple.</SText>
    //     </Container>
    // </SPage>
    return (
      <SPage
        footer={this.footer()}
        title={"Pago QR"}
      >
        <Container>
          {/* <SView col={"xs-12"} >
                        <SText fontSize={26} color={STheme.color.white}>Comprar</SText>
                    </SView> */}
          <SHr height={20} />
          <SView center col={"xs-12"} style={{ backgroundColor: STheme.color.card, borderRadius: 16 }} >
            <SView col={"xs-12"} center row flex>
              <SHr height={16} />

              <SView col={"xs-9"} border={'transparent'}  >
                <SText fontSize={16} color='white' center> Para adquirir la membresía seleccionada debe cancelar por QR</SText>
              </SView>
              <SHr height={16} />
              <SView col={"xs-12"} center >

                <SView center col={"xs-9"} colSquare backgroundColor={"#fff"} style={{ borderRadius: 16 }}>
                  {this.getQRComponent()}
                  {/* <SView style={{ position: "absolute", width: 40, height: 40, transform: [{ rotate: "0deg" }], left: 20, top: 20 }} ><SIcon name={"BarraQr"} fill={STheme.color.black}></SIcon></SView>
                                        <SView style={{ position: "absolute", width: 40, height: 40, transform: [{ rotate: "270deg" }], left: 20, bottom: 15 }} ><SIcon name={"BarraQr"} fill={STheme.color.black} ></SIcon></SView>
                                        <SView style={{ position: "absolute", width: 40, height: 40, transform: [{ rotate: "90deg" }], right: 20, top: 20 }} ><SIcon name={"BarraQr"} fill={STheme.color.black}></SIcon></SView>
                                        <SView style={{ position: "absolute", width: 40, height: 40, transform: [{ rotate: "180deg" }], right: 20, bottom: 15 }} ><SIcon name={"BarraQr"} fill={STheme.color.black}></SIcon></SView> */}
                </SView>
                <SHr />
                <SText fontSize={10} color={STheme.color.gray}>{this.state?.dataqr?.qrid}</SText>
              </SView>
              <SHr height={14} />
              <SText color={STheme.color.text} style={{ fontSize: 12 }}>IMPORTANTE</SText>
              <SHr height={4} />
              <SView col={"xs-12"} height={50} row center border="transparent" >
                <SView col={"xs-9"} border="#D70000" backgroundColor='#D70000' style={{ borderRadius: 4, padding: 2 }} center >
                  <SText color={STheme.color.text} style={{ fontSize: 12 }} bold >Este QR es pago único,</SText>
                  <SText color={STheme.color.text} style={{ fontSize: 12 }} bold>para segunda transacción genere nuevo QR</SText>
                </SView>
              </SView>
              <SHr height={16} />
              <SView col={"xs-9"} border="transparent" row >
                <SView flex center>
                  <SView height={60} colSquare center style={{ backgroundColor: 'white', borderRadius: 8, borderColor: STheme.color.black, borderWidth: 2, padding: 8 }} onPress={() => {
                    SShared.saveB64(this.getQr())
                  }}>
                    <SIcon name={"ImgSave"} fill={STheme.color.black} />
                  </SView>
                </SView>
                <SView flex center>
                  <SView height={60} colSquare center style={{ backgroundColor: 'white', borderRadius: 8, borderColor: STheme.color.black, borderWidth: 2, padding: 8 }} onPress={() => {
                    SShared.sharedB64(this.getQr(), { message: "", titulo: "" })
                  }}>
                    <SIcon name={"ImgShare"} fill={STheme.color.black} />
                  </SView>
                </SView>
              </SView>
              <SHr height={32} />
            </SView>
          </SView>
          <SHr />
          <SView onPress={() => {
            this.verificarPago();
          }} padding={8} card><SText>{"VERIFICAR PAGO"}</SText></SView>
          <SHr height={20} />
        </Container>
      </SPage>
    );
  }
  footer() {
    return <BottomNavigator url={"/paquete"} />
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(qr);