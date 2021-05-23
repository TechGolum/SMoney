import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Column from './Column'

export default function Columns()
{
    // height should be from 0.3 to 1
    return(
        <View style = {styles.sview}>
            <Column color = "#99dfff" height = {0.8}/>
            <Column color = "#ffb699" height = {0.3}/>
            <Column color = "#99ffc2" height = {0.6}/>
        </View>
    )
}

const styles = StyleSheet.create({
    sview : {
        width : 250,
        height : 150,
        backgroundColor : 'white',
        borderRadius : 20,
        justifyContent : 'space-around',
        flexDirection : 'row',
        alignItems : 'center',
        shadowColor : 'grey',
        shadowOpacity: 0.2,
        shadowRadius: 8
        
    }
})