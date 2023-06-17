import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SIcon, SImage, SPage, SText, STheme, SView, SNavigation, SPopup, SLoad, SThread } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import BoxMenuLat from './BoxMenuLat';
import BoxMenuLatOtros from './BoxMenuLatOtros';
import Model from '../../Model';
import LikeAnimation from './LikeAnimation';
export type PublicacionPropsType = {
    data: any,
    usuario: any,
    onPress?: (obj) => {},
}
class index extends Component<PublicacionPropsType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handlePress() {
        if (!this.props.onPress) return null;

        this.props.onPress(this.props.data)
        // this.props.onPress(this.props.usuario)
    }

    renderAuthor() {
        // var key_usuario = Model.usuario.Action.getKey() ?? null;
        var key_usuario = Model.usuario.Action.getKey();
        let user = Model.usuario.Action.getByKey(this.props.data?.key_usuario);
        // if (!user) return null
        // let user = this.props.usuario;
        // let user = {
        //     Nombres: "Name",
        //     Apellidos: "Last Name"
        // }
        return <SView col={"xs-12"} row height={50} center>
            <SView width={50} height style={{
                justifyContent: "center"
            }} >
                <SView style={{
                    backgroundColor: STheme.color.card, borderRadius: 100, width: 40, height: 40, overflow: "hidden"
                }}>
                    <SImage src={Model.usuario._get_image_download_path(SSocket.api, this.props.data.key_usuario)} style={{
                        resizeMode: "cover"
                    }} />
                </SView>
            </SView>
            <SView flex height style={{
                justifyContent: "center"
            }}>
                <SText bold>{user?.Nombres} {user?.Apellidos}</SText>
            </SView>
            <SView width={30} center onPress={() => {
                SPopup.open({ key: "menuLat", content: (key_usuario == this.props.data.key_usuario) ? <BoxMenuLat datas={this.props.data} /> : <BoxMenuLatOtros datas={this.props.data} /> });
            }} >
                <SIcon name={"MenuLat"} fill={STheme.color.text} width={24} height={24} />
                <SView width={5} />
            </SView>
        </SView>
    }

    handleLike = () => {
        this.likeanim.start();
        Model.publicacion_like.Action.registro({
            key_usuario: Model.usuario.Action.getKey(),
            key_publicacion: this.props.data.key,
        }).then((e) => {
            Model.publicacion.Action._dispatch({
                component: "publicacion",
                type: "onLike",
                key_publicacion: this.props.data.key,
                key_usuario: Model.usuario.Action.getKey(),
                cantidad: 1,
            })
        })
    }
    renderImage() {
        return <SView col={"xs-12"} colSquare activeOpacity={1}
            style={{
                // backgroundColor: "#666"
            }}
            center
            onPress={() => {
                if (!this.nclick) this.nclick = 1
                else this.nclick++;
                new SThread(250, "double", true).start(() => {
                    if (this.nclick >= 2) {
                        console.log("Double")
                        this.handleLike()
                    } else {
                        console.log("single")
                    }
                    this.nclick = 0;
                })
            }}>
            <SImage src={Model.publicacion._get_image_download_path(SSocket.api, this.props.data.key)} style={{
                resizeMode: "contain"
            }} />
            <LikeAnimation ref={ref => this.likeanim = ref} />
        </SView>
    }
    handlePressHeart = () => {
        if (this.props.data.mylike) {
            Model.publicacion_like.Action.dislike({
                key_usuario: Model.usuario.Action.getKey(),
                key_publicacion: this.props.data.key,
            })
        } else {
            this.handleLike()
        }
    }
    renderActions() {
        const size = 28;

        return <SView col={"xs-12"} row height={size} center>
            <SView width={size} height onPress={this.handlePressHeart.bind(this)}>
                {this.props.data.mylike ? <SIcon name={'Heart'} height={24} fill={STheme.color.danger} /> : <SIcon name={'Heart'} height={24} stroke={STheme.color.text} />}
            </SView>
            <SView width={size / 2} />
            <SView width={size} height onPress={() => {
                SNavigation.navigate("/publicacion/comments", { pk: this.props.data.key })
            }}>
                <SIcon name={'Comment'} height={24} fill={STheme.color.text} />
            </SView>
            <SView flex />
            {/* <SView width={size/2} />
            <SView width={size} height>
                <SIcon name={'Heart'} fill={STheme.color.text} />
            </SView>
            <SView flex />
            <SView width={size} height>
                <SIcon name={'Comment'} fill={STheme.color.text} />
            </SView> */}
        </SView>
    }
    renderTitle() {
        return <SView col={"xs-12"}>
            <SText>{this.props.data.descripcion}</SText>
        </SView>
    }
    renderLikes() {
        return <SView col={"xs-12"} onPress={() => {
            SNavigation.navigate("/publicacion/likes", { pk: this.props.data.key })
        }}>
            <SText bold>{(this.props?.data?.likes ?? 0) + " Me gusta"}</SText>
        </SView>
    }
    renderComments() {
        return <SView col={"xs-12"}>
            <SText bold color={STheme.color.lightGray}>{"Ver 1 comentario"}</SText>
        </SView>
    }
    render() {
        return (<SView col={"xs-12"} >
            {/* <SText>{JSON.stringify(this.props.data)}</SText> */}
            {this.renderAuthor()}
            <SHr h={8} />
            {this.renderImage()}
            <SHr h={16} />
            {this.renderActions()}
            <SHr h={16} />
            {this.renderLikes()}
            <SHr />
            {this.renderTitle()}
            <SHr />
            {/* {this.renderComments()} */}
            {/* <SHr /> */}
        </SView >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);