import React from "react"
import { View, StyleSheet, Dimensions, Image, TouchableOpacity, Text, Modal, Alert, TextInput } from "react-native"

import { orange, pink } from "./Colors"
import ScanText from "./ScanText"

export default class Home extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            modalVisibility: false,
            nomeDog: ""
        }
    }

    setModalVisibility = (visibility) => {
        this.setState({ modalVisibility: visibility })
    }

    onChangeHandler(field, value) {
        this.setState({ field: value })
    }

    render() {
        return (
            <View>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisibility}
                    onRequestClose={() => { Alert.alert("Modal fechado") }}>
                    <View>
                        <View style={[styles.header, { backgroundColor: orange }]} />
                        <Text style={styles.addDogText}>Adicionar Doguinho</Text>
                        <TextInput
                            placeholder="Nome"
                            onChangeText={value => this.onChangeHandler("nomeDog", value)}
                            style={styles.inputDogName}
                        />
                        <View>
                            <TouchableOpacity>
                                <Text>Adicionar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

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
                <TouchableOpacity
                    onPress={() => this.setModalVisibility(true)} //his.props.navigation.navigate("ScanScreem")
                    style={styles.button}>
                    <Text style={styles.textButton}>{"Add"}</Text>
                </TouchableOpacity>
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
    },
    button: {
        backgroundColor: pink,
        alignSelf: "center",
        width: 300,
        height: 80,
        position: "relative",
        borderRadius: 5,
        top: "100%"
    },
    textButton: {
        flex: 1,
        color: "white",
        fontSize: 30,
        textAlign: "center",
        textAlignVertical: "center",
        justifyContent: "center"
    },
    inputDogName: {
        width: 300,
        height: 50,
        top: 200,
        borderColor: pink,
        borderRadius: 5,
        position: "relative"
    },
    addDogText: {
        position: "relative",
        top: 200
    }
})
