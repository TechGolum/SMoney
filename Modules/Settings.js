import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal } from 'react-native';
import OkButton from './OkButton'

export default function Settings(props)
{
    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
        props.setModalVisible(!props.modalVisible);
        }}>
            <View style = {styles.container}>
                <Text style = {styles.header}>Settings</Text>
                <Themes/>
                <OkButton style = {{alignSelf: 'center'}} onPress = {() => {props.setModalVisible(false)}}/>
            </View>
        </Modal>
    )
}

const Themes = (props) => {
    const [selectedTheme, setSelectedTheme] = useState('Auto')
    const Theme = (prop) => {
        return(
            <View onTouchEnd = {() => {setSelectedTheme(prop.text)}}
            style = {{
                height : '100%',
                width : '20%',
                justifyContent:'space-around',
            }}>
                <View style = {{
                    backgroundColor : prop.text == 'Dark' ? '#222' : 'white',
                    elevation : 5,
                    height: '70%',
                    width: '100%',
                    shadowColor:'grey',
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: prop.text == selectedTheme ? '#2fa1ee' : 'transparent'
                }}/>

                <Text style = {{
                    textAlign: 'center',
                    fontSize: 17
                }}>
                    {prop.text}
                </Text>
            </View>
        )
    } 
    return(
        <View style = {{
            height : 120,
            width : '90%',
            justifyContent : 'space-around',
            flexDirection : 'row',
            marginBottom : 20,
            shadowColor: 'grey',
            elevation: 5,
            backgroundColor: 'white',
            borderRadius: 20
        }}>
            <Theme text = 'Auto'/>
            <Theme text = 'Light'/>
            <Theme text = 'Dark'/>
        </View>
    )
}



const styles = StyleSheet.create({
    container : {
        backgroundColor : 'white',
        width: '100%',
        height:  '100%',
        alignItems: 'center'
    },
    header: {
        fontSize : 40,
        marginTop : 30,
        margin : 20,
        fontWeight : 'bold',
        alignSelf:'flex-start'
    }
})