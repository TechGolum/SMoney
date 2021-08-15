import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal } from 'react-native';
import {Icon} from 'react-native-elements'
import OkButton from './OkButton'

export default function SetUp(props)
{
    const [text, setText] = useState('')
    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
        props.setModalVisible(!props.modalVisible);
        }}>
            <View style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'white'
            }}>
                <Text style={{
                    fontSize: 35,
                    margin: 5,
                    marginTop: 30
                }}>Hello! This is SMoney, simple spendings tracker</Text>
                <Text style = {{
                    fontSize: 35,
                    margin: 5,
                    marginTop: 30
                }}>What's your budget?</Text>
                <TextInput
                    style = {{
                        width : 300,
                        height : 60,
                        backgroundColor:'rgb(235,235,235)',
                        borderRadius : 10,
                        fontSize : 20,
                        alignSelf : 'center',
                        textAlign : 'center',
                        marginTop: 20
                    }}
                    onChangeText = {setText}
                    keyboardType = 'numeric'
                />
                <OkButton onPress = {() => {
                    if(text == '')
                        props.setBalance(10000)
                    else
                        props.setBalance(parseInt(text))
                    props.setModalVisible(false)
                    }} 
                    style = {{alignSelf: 'center', marginTop: 20}}/>
            </View>
        </Modal>
    )
}