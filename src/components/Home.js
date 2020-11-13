import React from "react"
import { View, StyleSheet, Dimensions, Image, SafeAreaView, Alert } from "react-native"

import { pink } from "./Colors"
import ScanText from "./ScanText"

export default class Home extends React.Component {

    render() {
        return (
            <View>
                <View style={styles.header} />
                <View style={styles.topContent}>
                    <Image
                        style={styles.imagemDog}
                        source={require("../img/lost-dog.png")}
                    />
                    <ScanText
                        name={"Esmeralda"}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        width: Dimensions.get("window").width,
        height: 180,
        backgroundColor: pink,
        top: 0,
        position: "absolute"
    },
    topContent: {
        marginLeft: 47,
        marginRight: 47,
        marginTop: 30
    },
    imagemDog: {
        alignSelf: "center"
    }
})
