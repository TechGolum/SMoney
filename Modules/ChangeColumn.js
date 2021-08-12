import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TextInput,TouchableOpacity } from 'react-native';

export default function ChangeColumn(props)
{
    const [sum, setSum] = useState('')
    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
        props.setModalVisible(!props.modalVisible);
        }}>
            <View style = {styles.container}>
                <Text style = {styles.category}>{props.category}</Text>
                <Text style = {styles.spent}>You have spent on {(props.category).toLowerCase()}: {props.spent}</Text>
                <Text style = {styles.spent}>Update:</Text>

                <TextInput style = {styles.input} keyboardType = 'numeric' onChangeText = {setSum}/>

                <TouchableOpacity style = {styles.button} onPress = {() => {props.setCategory(sum); props.setModalVisible(false)}}>
                    <Text style = {{fontSize : 20, color : 'white'}}>OK</Text>
                </TouchableOpacity>

                <Text style = {styles.cancel} onPress = {() => {props.setModalVisible(false)}}>Cancel</Text>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container : {
        width : '100%',
        height : '100%',
        // alignItems : 'center',
        backgroundColor : 'white'
    },
    category : {
        fontSize : 40,
        marginTop : 30,
        margin : 20
    },
    spent : {
        fontSize : 25,
        marginTop : 0,
        marginBottom : 20,
        textAlign : 'center'
    },
    input : {
        width : 250,
        height : 50,
        backgroundColor:'rgb(235,235,235)',
        borderRadius : 10,
        fontSize : 20,
        alignSelf : 'center',
        textAlign : 'center'
    },
    cancel : {
        fontSize : 15,
        color : 'grey',
        marginTop : 15,
        alignSelf : 'center'
    },
    button : {
        backgroundColor : '#2fa1ee',
        width : 250,
        height : 50,
        borderRadius : 10,
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 30,
        alignSelf : 'center'
    },
})