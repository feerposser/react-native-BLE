import React from "react"
import { View, StyleSheet, Dimensions, Image, TouchableOpacity, Text, Modal, Alert, TextInput, Pressable } from "react-native"
import * as firebase from "firebase"
import "firebase/firestore"

import { orange, pink } from "./Colors"
import ScanText from "./ScanText"

export default class Home extends React.Component {

    constructor(props) {
        super(props)

        this.firebaseConfiguration()

        this.state = {
            modalVisibility: false,
            dogName: "",
            dogEddystoneUID: "edd1ebeac04e5defa017",
            dogsList: []
        }
    }

    componentDidMount() {
        this.loadDogs()
    }

    loadDogs() {
        var db = firebase.database()
        db.ref("/animals/dogs").on("value", querySnapShot => {
            let data = []
            querySnapShot.forEach((child) => {
                data.push({
                    dogName: child.val().dogName,
                    dogEddystoneUID: child.val().dogEddystoneUID
                })
            })
            this.setState({ dogsList: data })
            console.log(":->", this.state.dogsList)
        })
    }

    firebaseConfiguration() {
        if (!firebase.apps.length) {
            var firebaseConfig = {
                apiKey: "AIzaSyD5BZxtytDS6mD2mvQfdLxpH4EWkArHlXw",
                authDomain: "finp-59b18.firebaseapp.com",
                databaseURL: "https://finp-59b18-default-rtdb.firebaseio.com",
                projectId: "finp-59b18",
                storageBucket: "finp-59b18.appspot.com",
                messagingSenderId: "705246181991",
                appId: "1:705246181991:web:1a414c04a7c46f375a32c2",
                measurementId: "G-XSR0GMS7Z1"
            }
            firebase.initializeApp(firebaseConfig)
        }
    }

    registerDog() {
        let db = firebase.database()
        console.log("-->", this.state.dogName)
        db.ref("/animals/dogs").push(
            { dogName: this.state.dogName, dogEddystoneUID: this.state.dogEddystoneUID })
            .then(() => {
                console.log("deu certo")
                this.setModalVisibility(false)
            })
            .catch(() => console.log("deu merda"))
    }

    setModalVisibility = (visibility) => {
        this.setState({ modalVisibility: visibility })
    }

    renderDog = () => {
        const { dogsList } = this.state

        const dogVisualization = dogsList.map(dog => {
            return (
                <View style={styles.topContent}>
                    <Image
                        style={styles.imagemDog}
                        source={require("../img/lost-dog.png")}
                    />
                    {/* <ScanText name={dog.dogName} /> */}
                    <Pressable onPress={() => { this.props.navigation.navigate("ScanScreem") }}>
                        <Text style={styles.scanText}>Escanear: {dog.dogName}</Text>
                    </Pressable >
                </View>
            )
        })

        return (
            <View>
                { dogVisualization }
            </View>
        )
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
                        <View style={[styles.header, { backgroundColor: orange }]}>
                            <Text style={styles.addDogText}>Adicionar Doguinho</Text>
                        </View>

                        <View>
                            <TextInput
                                placeholder="Nome"
                                placeholderTextColor={pink}
                                // onChangeText={value => this.onChangeHandler("dogName", value)}
                                onChangeText={value => this.setState({ dogName: value })}
                                value={this.state.dogName}
                                style={styles.inputDogName}
                            />
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: orange, top: 230 }]}
                                onPress={() => this.registerDog()}
                            >
                                <Text style={styles.textButton}>Confirmar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, { top: 250 }]}
                                onPress={() => this.setModalVisibility(false)}
                            >
                                <Text style={styles.textButton}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <View style={styles.header} />

                <this.renderDog />

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
        borderStartWidth: 2,
        borderEndWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: pink,
        borderRadius: 5,
        alignSelf: "center",
        color: pink,
        backgroundColor: "white",
    },
    addDogText: {
        color: "white",
        fontSize: 24,
        textAlign: "center",
        textAlignVertical: "center",
        flex: 1
    },
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
