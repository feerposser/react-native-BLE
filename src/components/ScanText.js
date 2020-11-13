import React from "react"
import { Text, StyleSheet, Pressable } from "react-native"
import { orange } from "./Colors"

export default class ScanText extends React.Component {

    constructor(props) {
        super(props)

        const { name } = props
    }

    render() {
        return (
            <Pressable onPress={() => { this.props.naviation.replace("ScanScreem") }}>
                <Text style={styles.scanText}>Escanear: {"nome"}</Text>
            </Pressable >
        )
    }
}

const styles = StyleSheet.create({
    scanText: {
        color: "white",
        fontSize: 24,
        textAlign: "center",
        backgroundColor: orange,
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    }
})
