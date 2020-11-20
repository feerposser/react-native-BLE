import React from "react"
import { View, StyleSheet, Text, Pressable, DeviceEventEmitter } from "react-native"

import { orange, pink } from "./Colors"
import Beacons from "react-native-beacons-manager"

export default class ScanScreem extends React.Component {

    async componentDidMount() {
        Beacons.detectEddystoneUID();

        try {
            await Beacons.startRangingBeaconsInRegion('REGION1')
            console.log(`Beacons ranging started succesfully!`)
        } catch (err) {
            console.log(`Beacons ranging not started, error: ${error}`)
        }

        DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
            console.log("achou:", data.beacons)
        })
    }

    render() {
        return (
            <View>
                <View style={styles.header}>
                    <Text style={styles.rssiText}>-80</Text>
                </View>
                <View>
                    <Pressable>
                        <Text style={[styles.button, styles.infoButton]}>Escanear: {"teste"}</Text>
                    </Pressable>
                    <Pressable>
                        <Text style={[styles.button, styles.cancelButton]}>Cancelar</Text>
                    </Pressable>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: "75%",
        backgroundColor: orange,
        borderRadius: 5
    },
    button: {
        backgroundColor: pink,
        alignSelf: "center",
        color: "white",
        width: 300,
        height: 80,
        position: "relative",
        textAlign: "center",
        textAlignVertical: "center"
    },
    infoButton: {
        top: -20,
        fontSize: 24,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    cancelButton: {
        fontSize: 48,
        fontWeight: "bold",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    rssiText: {
        position: "relative",
        top: "70%",
        color: pink,
        fontSize: 64,
        alignSelf: "center",
    }
})