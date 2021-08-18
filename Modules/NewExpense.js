import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal } from 'react-native';
import {Icon} from 'react-native-elements'
import OkButton from './OkButton'

let blue = '#2fa1ee'

export default function NewExpense(props)
{

    const [selected, setSelected] = useState('')
    const [sum, setSum] = useState('')

    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          props.setModalVisible(!props.modalVisible);
        }}>
            <View style = {styles.sview}>

                <Text style = {styles.header}>Add new expense</Text>

                <View style = {{width : '100%', alignItems : 'center'}}>
                    
                    <Text style = {styles.stext}>Your balance: {props.balance}</Text>
                    
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

                <View style = {{width : '100%', alignItems : 'center'}}>
                    <Text style = {styles.stext}>How much have you spent?</Text>
                    <TextInput placeholder = "" style = {styles.input} onChangeText = {setSum} keyboardType  = 'numeric'/>
                </View>

                <OkButton style = {{marginTop : 30,alignSelf : 'center'}} 
                    onPress = {() => {
                        if(sum != '' && selected != '' && props.balance - parseInt(sum) >= 0)
                        { 
                            props.setModalVisible(false);
                            props.storeData(selected, sum); 
                            setSelected(''); 
                            setSum('')
                        }
                        else
                        { 
                            if(sum == '')
                            {
                                props.setModalVisible(false)
                            }
                            else
                                alert('Not enough money :(')
                        }
                        }}
                    />

                <Text style = {styles.cancel} onTouchEnd = {() => {props.setModalVisible(false); setSelected(''); setSum(' ')}}>Cancel</Text>

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
            <Text style = {{fontSize : 12, textAlign : 'center', fontFamily: 'sf-medium'}}>{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    sview : {
        backgroundColor : 'white',
        bottom : 0,
        width : '100%',
        height : '100%',
        maxWidth : 400,
        alignItems : 'center',
    },
    header : {
        marginTop : 20,
        marginBottom : 20,
        fontSize : 30,
        // fontWeight : 'bold',
        fontFamily: 'sf-bold'
    },
    stext : {
        fontSize : 20,
        fontWeight: '500',
        marginBottom: 20,
        fontFamily : 'sf-medium'
    },
    cancel : {
        marginTop : 10,
        fontSize : 18,
        color : 'grey',
        fontFamily : 'sf-medium'
    },
    input : {
        width : 250,
        height : 50,
        backgroundColor:'rgb(235,235,235)',
        borderRadius : 10,
        fontSize : 20,
        textAlign : 'center',
        fontFamily: 'sf-medium'
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