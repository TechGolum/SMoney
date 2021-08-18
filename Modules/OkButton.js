import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal } from 'react-native';

export default function OkButton(props)
{
    return(
        <TouchableOpacity style = {[styles.button, props.style]} onPress = {() => {props.onPress()}}>
            <Text style = {{fontSize : 20, color : 'white', fontFamily: 'sf-medium'}}>OK</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button : {
        backgroundColor : '#2fa1ee',
        width : 250,
        height : 50,
        borderRadius : 10,
        justifyContent : 'center',
        alignItems : 'center',
    }
})