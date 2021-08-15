import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TextInput,TouchableOpacity } from 'react-native';
import OkButton from './OkButton'

export default function ChangeColumn(props)
{
    const [sum, setSum] = useState('')
    const [selectedOption, setSelectedOption] = useState('Set')
    const Option = (prop)=>{return(
        <View onTouchEnd = {() => {setSelectedOption(prop.text)}}
        style = {{
            backgroundColor : prop.text == selectedOption ? 'white' : '#eee',
            width: '33%',
            borderRadius : 20,
            height: '100%',
            justifyContent: 'center',
        }}>
            <Text style = {{fontSize: 20, textAlign: 'center'}}>{prop.text}</Text>
        </View>
    )}
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
                <Text style = {[styles.text, {fontSize: 30}]}>Balance: {props.balance}</Text>
                <Text style = {styles.text}>Spent on {(props.category).toLowerCase()}: {props.spent}</Text>
                <View style = {
                    {
                        justifyContent : 'space-around',
                        flexDirection : 'row',
                        width: 250,
                        alignSelf : 'center',
                        elevation: 4,
                        marginBottom: 20,
                        borderRadius: 20,
                        backgroundColor: '#eee',
                        height: 50,
                        alignItems :'center'
                    }}>
                        <Option text = 'Set'/>
                        <Option text = 'Plus'/>
                        <Option text = 'Minus'/>
                </View>

                <TextInput style = {styles.input} keyboardType = 'numeric' onChangeText = {setSum}/>

                <OkButton 
                    style = {{marginTop : 30, alignSelf : 'center'}}
                    onPress = {() => {
                        if(sum != '' && 
                        (selectedOption == 'Set' && sum <= parseInt(props.balance) + parseInt(props.spent))
                        || (selectedOption == 'Plus' && props.balance >= parseInt(sum))
                        || (selectedOption == 'Minus' && props.spent >= sum)
                        ) 
                        {
                            props.setCategory(sum, selectedOption);        
                            props.setModalVisible(false)
                        }
                        else
                        {
                            if(sum == '')
                            {
                                props.setModalVisible(false)
                            }
                            else
                            {
                                alert('Not enough money')
                            }
                        }
                    }}
                    />

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
        margin : 20,
        fontWeight : 'bold'
    },
    text : {
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
    }
})