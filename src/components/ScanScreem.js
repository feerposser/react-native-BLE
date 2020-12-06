import React from "react"
import {
    View, StyleSheet, Text, DeviceEventEmitter,
    PermissionsAndroid, TouchableOpacity
} from "react-native"

import { orange, pink } from "./Colors"
import Eddystone from "@lg2/react-native-eddystone"

export default class ScanScreem extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            rssi: 0,
            rssis: [],
            averageRssi: -1000,
            approachingScreem: "",
            scaning: false
        }
        this.onUID = this.onUID.bind(this)
        this.addRssisValue = this.addRssisValue.bind(this)
        this.doTheBlaBlaBla()
    }

    async componentDidMount() {
        await this.getAccessFineLocation()
        await this.getAccessCoarseLocation()

        Eddystone.addListener("onUIDFrame", this.onUID)
    }

    onUID(beacon) {
        this.addRssisValue(beacon.rssi)
    }

    startScan() {
        console.log("start scanning")
        Eddystone.startScanning()
        this.setState({ scaning: true })
    }

    stopScan() {
        console.log("stop scanning")
        Eddystone.stopScanning()
        this.setState({ scaning: false })
    }

    addRssisValue(rssiValue) {
        this.state.rssis.push(rssiValue)
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
                console.log("OK -> ACCESS_COARSE_LOCATION");
            } else {
                console.log("NOT OK -> ACCESS_COARSE_LOCATION");
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
                console.log("OK -> ACCESS_FINE_LOCATION");
            } else {
                console.log("NOT OK -> ACCESS_FINE_LOCATION");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    getRssisAverage() {
        console.log("lista:", this.state.rssis)
        let rssis = this.state.rssis.sort((a, b) => a - b)

        let lowMiddle = Math.floor((rssis.length - 1) / 2)
        let highMiddle = Math.ceil((rssis.length - 1) / 2)
        let median = (rssis[lowMiddle] + rssis[highMiddle]) / 2

        return median
    }

    clearRssis() {
        this.setState({ rssis: [] })
    }

    doTheBlaBlaBla(time = 5000) {
        setInterval(() => {
            if (this.state.scaning) {
                console.log("rodando o setInverval")
                let lastAverageRssi = this.state.averageRssi
                this.setState({ averageRssi: this.getRssisAverage() })

                // se a mediada de rssis anterior for maior que a atual, então não está se aproximando
                // se a mediana de rssis anterior for menor que a atual, 
                console.log("mediana- última:", lastAverageRssi, "atual:", this.state.averageRssi)
                if (this.state.averageRssi >= lastAverageRssi) {
                    console.log("Aproximou")
                    this.setState({ approachingScreem: "aproximando" })
                } else {
                    console.log("Não aproximou")
                    this.setState({ approachingScreem: "não aproximando" })
                }
                this.clearRssis()
            }
        }, time);
    }

    render() {
        return (
            <View>
                <View style={styles.header}>
                    <Text style={styles.rssiText}>{this.state.approachingScreem}</Text>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => this.startScan()}
                        style={[styles.button, styles.infoButton]}>
                        <Text style={styles.buttonText}>Escanear: {"teste"}</Text>
                    </TouchableOpacity >
                    <TouchableOpacity
                        onPress={() => this.stopScan()}
                        style={[styles.button, styles.cancelButton]}>
                        <Text style={[styles.buttonText, { fontWeight: "bold" }]}>Cancelar</Text>
                    </TouchableOpacity>
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
        width: 300,
        height: 80,
        position: "relative",
    },
    buttonText: {
        flex: 1,
        color: "white",
        fontSize: 30,
        textAlign: "center",
        textAlignVertical: "center",
        justifyContent: "center"
    },
    infoButton: {
        top: -20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cancelButton: {
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