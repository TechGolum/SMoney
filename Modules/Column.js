import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Column(props)
{
    return(
        <View style = {[styles.sview, {width : props.width}]} onTouchEnd = {() => {props.onTouchEnd()}}>
            <View style = {{height : 3, width : '100%'}}/>

            <Text style = {[styles.text, {fontWeight:'bold'}]}>{props.category}</Text>
            <Text style = {styles.text}>{props.sum}</Text>

            <View style = {[styles.svalue, 
                { 
                    backgroundColor : props.color, 
                    height : parseInt(props.height.replace('%', '')) > 65 ? '65%' :  parseInt(props.height.replace('%', '')) > 5 ? props.height : '5%', 
                    width : parseInt(props.height.replace('%', '')) > 23 ? '85%' : parseInt(props.height.replace('%', '')) > 10 ? '70%' : '60%' 
                    }]}>
            </View>
            
            <View style = {{height : 3, width : '100%'}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    sview : {
        width : 75,
        height : '90%',
        borderWidth : 0,
        borderRadius : 25,
        alignItems : 'center',
        justifyContent : 'flex-end',
        shadowOffset:{  width: 0,  height: 0 },
        shadowColor: 'grey',
        shadowOpacity: 0.2,
        shadowRadius : 10,
        backgroundColor : 'white',
        elevation : 7,
        alignSelf  : 'center',
        marginLeft : 5,
        marginRight: 5,
    },
    svalue : {
        width : '85%',
        height : '50%',
        borderRadius : 23,
    },
    text: {
        
    }
})