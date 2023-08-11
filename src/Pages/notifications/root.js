import { FlatList, Linking, Text, View } from 'react-native'
import React, { Component } from 'react'
import SSocket from "servisofts-socket"
import Model from '../../Model'
import { SDate, SHr, SImage, SLoad, SPage, SText, STheme, SView } from 'servisofts-component'
import { StyleSheet } from 'react-native'
import { Container } from '../../Components'
export default class root extends Component {
    state = {
        data: null
    }
    componentDidMount() {
        this.setState({ loading: true })
        SSocket.sendPromise({
            service: "notification",
            component: "notification",
            type: "getAll",
            key_usuario: Model.usuario.Action.getKey(),
        }).then(e => {
            this.setState({ loading: false })
            var arr = Object.values(e.data).sort((a, b) => new SDate(a.fecha_on).getTime() >= new SDate(b.fecha_on).getTime() ? -1 : 1)
            this.setState({ data: arr })
        }).catch(e => {
            this.setState({ loading: false })
        })
    }
    render() {
        return (
            <SPage disableScroll>
                {!this.state.data ? <SLoad /> :
                    <FlatList
                        refreshing={this.state.loading}
                        ItemSeparatorComponent={() => <>
                            <SHr style={{
                                borderBottomWidth: 1,
                                borderColor: STheme.color.white,
                                height:2
                            }} />
                            <SView height={10} />
                        </>
                        }
                        onRefresh={() => {
                            this.componentDidMount();
                        }}
                        data={this.state.data}
                        renderItem={renderItem}
                    />
                }
            </SPage>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        alignItems: "center",
        padding: 8,
    },

})
const renderItem = ({ index, item }) => {
    const { descripcion = "", observacion = "", fecha_on = "", data = {} } = item;
    return <View style={styles.card}>
        <SView style={{
            width: "100%",
            maxWidth: 300,
            overflow: "hidden",
        }} onPress={() => {
            if (item?.data?.deepLink) Linking.openURL(item?.data?.deepLink)
        }}>
            <SView col={"xs-12"} row flex>
                <SView width={40} height={40} style={{
                    borderRadius: 100,
                    overflow: "hidden",
                    backgroundColor: STheme.color.card,
                }}>
                    <SImage src={data?.url_image} />
                </SView>
                <SView width={8} />
                <SView flex height>
                    {/* <SText bold>{descripcion}</SText> */}
                    <SText fontSize={14} >{observacion}</SText>
                    <SText fontSize={10} color={"#999999"}>{new SDate(fecha_on, "yyyy-MM-ddThh:mm:ss").toString("dd de MONTH a las hh:mm")}</SText>

                </SView>

            </SView>
            {/* <SView col={"xs-12"} style={{
                alignItems: "flex-end"
            }}>
                <SText fontSize={10} color={"#999999"}>{new SDate(fecha_on).toString("dd de MONTH del yyyy a las hh:mm")}</SText>
            </SView> */}
        </SView>
    </View>
}