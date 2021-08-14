import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TextInput,TouchableOpacity } from 'react-native';
import OkButton from './OkButton'

export default function NewBalance(props)
{
    const [text, setText] = useState(' ')

    function ChangeBalanceButton(prop)
    {
        return(
            <View onTouchStart = {() => {props.changeBalance(prop.num);}} style = {[styles.balancebutton, {backgroundColor : parseInt(prop.num) > 0 ? '#ff4e33' : '#3af'}]}>
                <Text style = {{fontSize : 20, color : 'white'}}>{prop.text}</Text>
            </View>
        )
    }
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
            props.setModalVisible(!props.modalVisible);
        }}>
            <View style = {styles.sview}>
                <Text style = {styles.header}>Your balance</Text>

                <Text style = {{fontSize : 80, marginTop : 100, marginBottom : 100}}>{props.balance}</Text>

                <View style = {styles.buttonsrow}>
                    <ChangeBalanceButton text = '-10' num = '-10'/>
                    <ChangeBalanceButton text = '-1' num = '-1'/>
                    <ChangeBalanceButton text = '+1' num = '1'/>
                    <ChangeBalanceButton text = '+10' num = '10'/>
                </View>

                <View style = {styles.buttonsrow}>
                    <ChangeBalanceButton text = '-1K' num = '-1000'/>
                    <ChangeBalanceButton text = '-100' num = '-100'/>
                    <ChangeBalanceButton text = '+100' num = '100'/>
                    <ChangeBalanceButton text = '+1K' num = '1000'/>
                </View>

                <OkButton 
                    style = {{marginTop : 30, alignSelf : 'center',marginBottom : 10}} 
                    onPress = {() => {props.setModalVisible(false)}}
                    />

                <Text style = {styles.cancel} onTouchEnd = {() => {props.setModalVisible(false)}}>Cancel</Text>
            </View>
        </Modal>
    )
}



const styles = StyleSheet.create({
    sview : {
        backgroundColor : 'white',
        height : '100%',
        width : '100%',
        alignItems : 'center'
    },
    header : {
        fontSize : 35,
        marginTop : 20,
        fontWeight : 'bold'
    },
    balancebutton : {
        height : 50,
        width : 50,
        borderRadius : 10,
        alignItems : 'center',
        justifyContent : 'center'
    },
    buttonsrow : {
        justifyContent : 'space-around',
        flexDirection : 'row',
        width : '80%',
        marginTop : 20
    },
    input : {
        width : 250,
        height : 50,
        backgroundColor:'rgb(235,235,235)',
        borderRadius : 10,
        fontSize : 20
    },
    stext : {
        fontSize : 25,
        fontWeight: '500',
        marginBottom: 20,
        marginTop  : 30
    },
    cancel: {
        fontSize : 15,
        color : 'grey',
        marginTop : 15,
        alignSelf : 'center'
    }
})