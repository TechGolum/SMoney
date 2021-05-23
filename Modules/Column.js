import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Column(props)
{
    return(
        <View style = {styles.sview}>
            <View style = {{height : 3, width : '100%'}}/>

            <View style = {[styles.svalue, { backgroundColor : props.color, flex : props.height}]}/>
            
            <View style = {{height : 3, width : '100%'}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    sview : {
        width : '28%',
        height : '80%',
        borderWidth : 0,
        borderRadius : 25,
        alignItems : 'center',
        justifyContent : 'flex-end',
        shadowOffset:{  width: 0,  height: 0 },
        shadowColor: 'grey',
        shadowOpacity: 0.2,
        shadowRadius : 10,
        backgroundColor : 'white'
    },
    svalue : {
        width : '85%',
        height : '50%',
        borderRadius : 23,
        flex : 1,
    }
})