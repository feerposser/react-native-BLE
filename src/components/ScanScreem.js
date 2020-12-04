import React from "react"
import {
    View, StyleSheet, Text, Pressable, DeviceEventEmitter,
    PermissionsAndroid
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
            approaching: false,
            scaning: false
        }
    }

    componentDidMount() {
        this.getAccessFineLocation()
        this.getAccessCoarseLocation()

        Eddystone.addListener("onUIDFrame", this.UID) 

        
    }

    startScanning() {
        console.log("escaneando")
        Eddystone.startScanning()
        // this.doTheBlaBlaBla()
    }

    stopScanning() {
        Eddystone.stopScanning()
    }

    addRssisValue(value){
        if (this.state.rssis.length <= 10) {
            this.setState({ rssis: this.state.rssis.push(value) })
        }
        console.log(this.state.rssis)
    }

    UID(beacon) {
        console.log(beacon.id, beacon.rssi)
        console.log(this.state.rssi)
        this.addRssisValue(beacon.rssi)
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

    getRssisAverage() {
        let rssis = this.state.rssis.sort((a, b) => a - b)

        let lowMiddle = Math.floor((rssis.length - 1) / 2)
        let highMiddle = Math.ceil((values.length - 1) / 2)
        let median = (rssis[lowMiddle] + rssis[highMiddle]) / 2

        return median
    }

    clearRssis() {
        this.setState({rssis: []})
    }

    doTheBlaBlaBla(time=5000) {
        setInterval(() => {
            console.log("rodando o setInverval")
            let lastAverageRssi = this.state.averageRssi
            this.setState({averageRssi: this.getRssisAverage()})
            
            // se a mediada de rssis anterior for maior que a atual, então não está se aproximando
            if (lastAverageRssi > this.state.averageRssi) {
                this.setState({approaching: false})
            } else {
                this.setState({approaching: true})
            }
            this.clearRssis()
        }, time);
    }

    getAproaching() {
        if (this.state.approaching) {
            return "aproximando"
        }
        return "não aproximou"
    }

    render() {
        return (
            <View>
                <View style={styles.header}>
                    <Text style={styles.rssiText}>{this.getAproaching()}</Text>
                </View>
                <View>
                    <Pressable
                        onPress={() => this.startScanning() }>
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