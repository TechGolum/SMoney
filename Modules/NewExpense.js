import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput } from 'react-native';
import {Icon} from 'react-native-elements'

let blue = '#2fa1ee'

export default function NewExpense(props)
{

    const [selected, setSelected] = useState('study')
    const [text, setText] = useState(' ')

    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          props.setModalVisible(!props.modalVisible);
        }}>
            <View style = {styles.sview}>

                <Text style = {styles.header}>Add new expence</Text>

                <View>
                    <Text style = {styles.stext}>Choose category:</Text>
                    <View style = {styles.categories}>
                        <Category name = 'school' text = 'Study' onTouchEnd = {() => {setSelected('Study')}} selected = {selected}/>
                        <Category name = 'storefront' text = 'Shop' onTouchEnd = {() => {setSelected('Shop')}} selected = {selected}/>
                        <Category name = 'euro' text = 'Bills' onTouchEnd = {() => {setSelected('Bills')}} selected = {selected}/>
                        <Category name = 'movie' text = 'Fun' onTouchEnd = {() => {setSelected('Fun')}} selected = {selected}/>
                    </View>
                    <View style = {styles.categories}>
                        <Category name = 'fastfood' text = 'Food' onTouchEnd = {() => {setSelected('Food')}} selected = {selected}/>
                        <Category name = 'train' text = 'Transport' onTouchEnd = {() => {setSelected('Transport')}} selected = {selected}/>
                        <Category name = 'spa' text = 'Health' onTouchEnd = {() => {setSelected('Health')}} selected = {selected}/>
                        <Category name = 'celebration' text = 'Gifts' onTouchEnd = {() => {setSelected('Gifts')}} selected = {selected}/>
                    </View>
                </View>

                <View>
                    <Text style = {styles.stext}>How much have you spent?</Text>
                    <TextInput placeholder = "  $$$" style = {styles.input} onChangeText = {setText} value = {' ' + text.replace(' ', '')} keyboardType  = 'numeric'/>
                </View>

                <TouchableOpacity style = {styles.button} onPress = {() => {props.setModalVisible(false)}}>
                    <Text style = {{fontSize : 20, color : 'white'}}>OK</Text>
                </TouchableOpacity>

            </View>
        </Modal>
    )
}

function Category(props)
{
    return(
        <View>
            <View onTouchEnd = {() => {props.onTouchEnd()}} 
            style = {[styles.icon, {backgroundColor : props.selected == props.text ? blue : 'white'}]}>
                <Icon name = {props.name} color = {props.selected == props.text ? 'white' : 'black'}/>
            </View>
            <Text style = {{fontSize : 12, textAlign : 'center'}}>{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    sview : {
        backgroundColor : 'white',
        bottom : 0,
        width : '100%',
        height : '90%',
        marginLeft : 30
    },
    header : {
        marginTop : 50,
        marginBottom : 20,
        fontSize : 30,
        fontWeight : '600'
    },
    stext : {
        fontSize : 20,
        fontWeight: '500',
        marginBottom: 20
    },
    button : {
        backgroundColor : '#2fa1ee',
        width : 250,
        height : 50,
        borderRadius : 10,
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 30
    },
    input : {
        width : 250,
        height : 50,
        backgroundColor:'rgb(235,235,235)',
        borderRadius : 10,
        fontSize : 20
    },
    categories : {
        display : 'flex',
        width: 250,
        flexDirection : 'row',
        justifyContent : 'space-around',
        marginBottom : 20
    },
    icon : {
        borderRadius : 10,
        width : 55,
        height: 55,
        justifyContent : 'center',
    }
})