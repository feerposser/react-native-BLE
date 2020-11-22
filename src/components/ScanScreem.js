import React from "react"
import {
    View, StyleSheet, Text, Pressable, DeviceEventEmitter,
    PermissionsAndroid
} from "react-native"

import { orange, pink } from "./Colors"
import Eddystone from "@lg2/react-native-eddystone"

export default class ScanScreem extends React.Component {

    componentDidMount() {
        this.getAccessFineLocation()
        this.getAccessCoarseLocation();

        Eddystone.addListener("onUIDFrame", this.UID);


    }

    async getAccessCoarseLocation() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                {
                    title: "ACCESS_COARSE_LOCATION",
                    message: "ACCESS_COARSE_LOCATION",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the ACCESS_COARSE_LOCATION");
            } else {
                console.log("ACCESS_COARSE_LOCATION permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    async getAccessFineLocation() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "ACCESS_FINE_LOCATION",
                    message: "ACCESS_FINE_LOCATION",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the ACCESS_FINE_LOCATION");
            } else {
                console.log("ACCESS_FINE_LOCATION permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    startScanning() {
        Eddystone.startScanning()
    }

    stopScanning() {
        Eddystone.stopScanning()
    }

    UID(beacon) {
        console.log("leu um beacon")
        console.log(beacon)
    }

    render() {
        return (
            <View>
                <View style={styles.header}>
                    <Text style={styles.rssiText}>-80</Text>
                </View>
                <View>
                    <Pressable
                        onPress={() => { this.startScanning() }}>
                        <Text style={[styles.button, styles.infoButton]}>Escanear: {"teste"}</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => { this.stopScanning() }}>
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